package com.example.demo.repository;

import com.example.demo.entity.Libro;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio Spring Data con CRUD basico para la tabla libros.
public interface LibroRepository extends JpaRepository<Libro, Long> {
}
