package com.example.demo.service;

import com.example.demo.dto.PrestarRequest;
import com.example.demo.entity.Libro;
import com.example.demo.entity.Prestamo;
import com.example.demo.repository.LibroRepository;
import com.example.demo.repository.PrestamoRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PrestamoService {

    private static final String ACTIVO = "ACTIVO";
    private static final String DEVUELTO = "DEVUELTO";

    private final PrestamoRepository prestamoRepository;
    private final LibroRepository libroRepository;

    public PrestamoService(PrestamoRepository prestamoRepository, LibroRepository libroRepository) {
        this.prestamoRepository = prestamoRepository;
        this.libroRepository = libroRepository;
    }

    public List<Prestamo> listar() {
        return prestamoRepository.findAll();
    }

    public Prestamo buscarPorId(Long id) {
        return prestamoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Prestamo no encontrado"));
    }

    @Transactional
    public Prestamo prestar(PrestarRequest request) {
        Prestamo prestamo = new Prestamo();
        prestamo.setNombreLector(request.getNombreLector());
        prestamo.setFechaPrestamo(LocalDate.now());
        prestamo.setEstado(ACTIVO);
        Prestamo guardado = prestamoRepository.save(prestamo);

        List<Libro> libros = new ArrayList<Libro>();
        for (Long libroId : request.getLibroIds()) {
            Libro libro = buscarLibroDisponible(libroId);
            libro.setStock(libro.getStock() - 1);
            libro.setPrestamo(guardado);
            libros.add(libroRepository.save(libro));
        }
        guardado.setLibros(libros);
        return guardado;
    }

    @Transactional
    public Prestamo devolver(Long id) {
        Prestamo prestamo = buscarPorId(id);
        if (!ACTIVO.equals(prestamo.getEstado())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El prestamo ya esta devuelto");
        }
        for (Libro libro : prestamo.getLibros()) {
            libro.setStock(libro.getStock() + 1);
            libroRepository.save(libro);
        }
        prestamo.setEstado(DEVUELTO);
        prestamo.setFechaDevolucion(LocalDate.now());
        return prestamoRepository.save(prestamo);
    }

    public void eliminar(Long id) {
        Prestamo prestamo = buscarPorId(id);
        if (ACTIVO.equals(prestamo.getEstado())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar un prestamo activo");
        }
        for (Libro libro : prestamo.getLibros()) {
            libro.setPrestamo(null);
            libroRepository.save(libro);
        }
        prestamoRepository.delete(prestamo);
    }

    private Libro buscarLibroDisponible(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
        if (libro.getStock() <= 0) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El libro no tiene stock disponible");
        }
        if (libro.getPrestamo() != null && ACTIVO.equals(libro.getPrestamo().getEstado())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El libro ya esta prestado");
        }
        return libro;
    }
}
