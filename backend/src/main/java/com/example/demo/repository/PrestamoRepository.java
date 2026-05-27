package com.example.demo.repository;

import com.example.demo.entity.Prestamo;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio Spring Data con CRUD basico para la tabla prestamos.
public interface PrestamoRepository extends JpaRepository<Prestamo, Long> {
}
