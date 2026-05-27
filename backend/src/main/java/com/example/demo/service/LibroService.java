package com.example.demo.service;

import com.example.demo.dto.LibroRequest;
import com.example.demo.entity.Libro;
import com.example.demo.repository.LibroRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LibroService {

    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    public List<Libro> listar() {
        return libroRepository.findAll();
    }

    public Libro buscarPorId(Long id) {
        // Unifica el error 404 para cualquier endpoint que necesite cargar un libro.
        return libroRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Libro no encontrado"));
    }

    public Libro crear(LibroRequest request) {
        // Crea una entidad limpia a partir del DTO recibido por la API.
        Libro libro = new Libro();
        copiarDatos(request, libro);
        return libroRepository.save(libro);
    }

    public Libro actualizar(Long id, LibroRequest request) {
        // Reutiliza la busqueda con 404 y sobrescribe solo los campos editables.
        Libro libro = buscarPorId(id);
        copiarDatos(request, libro);
        return libroRepository.save(libro);
    }

    public void eliminar(Long id) {
        Libro libro = buscarPorId(id);
        // Evita borrar un libro mientras forma parte de un prestamo activo.
        if (libro.getPrestamo() != null && "ACTIVO".equals(libro.getPrestamo().getEstado())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "No se puede eliminar un libro prestado");
        }
        libroRepository.delete(libro);
    }

    private void copiarDatos(LibroRequest request, Libro libro) {
        // Mantiene en un unico sitio la correspondencia entre DTO y entidad.
        libro.setTitulo(request.getTitulo());
        libro.setAutor(request.getAutor());
        libro.setIsbn(request.getIsbn());
        libro.setStock(request.getStock());
    }
}
