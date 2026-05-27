package com.example.demo.controller;

import com.example.demo.dto.PrestamoResponse;
import com.example.demo.dto.PrestarRequest;
import com.example.demo.entity.Libro;
import com.example.demo.entity.Prestamo;
import com.example.demo.service.PrestamoService;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @GetMapping
    public List<PrestamoResponse> listar() {
        // Devuelve prestamos con sus libros en DTOs, evitando serializar entidades directamente.
        List<PrestamoResponse> respuestas = new ArrayList<PrestamoResponse>();
        for (Prestamo prestamo : prestamoService.listar()) {
            respuestas.add(toResponse(prestamo));
        }
        return respuestas;
    }

    @GetMapping("/{id}")
    public PrestamoResponse buscarPorId(@PathVariable Long id) {
        return toResponse(prestamoService.buscarPorId(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PrestamoResponse prestar(@Valid @RequestBody PrestarRequest request) {
        return toResponse(prestamoService.prestar(request));
    }

    @PutMapping("/{id}/devolver")
    public PrestamoResponse devolver(@PathVariable Long id) {
        return toResponse(prestamoService.devolver(id));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) {
        prestamoService.eliminar(id);
    }

    private PrestamoResponse toResponse(Prestamo prestamo) {
        // Compone la respuesta completa del prestamo, incluyendo el resumen de cada libro asociado.
        PrestamoResponse response = new PrestamoResponse();
        response.setId(prestamo.getId());
        response.setNombreLector(prestamo.getNombreLector());
        response.setFechaPrestamo(prestamo.getFechaPrestamo());
        response.setFechaDevolucion(prestamo.getFechaDevolucion());
        response.setEstado(prestamo.getEstado());
        for (Libro libro : prestamo.getLibros()) {
            response.getLibros().add(LibroController.toResponse(libro));
        }
        return response;
    }
}
