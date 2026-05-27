package com.example.demo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.example.demo.dto.PrestarRequest;
import com.example.demo.entity.Libro;
import com.example.demo.entity.Prestamo;
import com.example.demo.repository.LibroRepository;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

// Usa repositorios reales sobre H2 para comprobar que el servicio cambia los datos correctamente.
@DataJpaTest
// DataJpaTest no crea servicios por defecto; se incorpora solo el servicio que queremos probar.
@Import(PrestamoService.class)
class PrestamoServiceTest {

    // El servicio contiene las reglas de alquilar y devolver libros.
    @Autowired
    private PrestamoService prestamoService;

    // El repositorio permite preparar libros y comprobar su stock despues de cada operacion.
    @Autowired
    private LibroRepository libroRepository;

    @Test
    void prestarCreaPrestamoActivoYReduceElStock() {
        // Se prepara un libro con dos unidades para que el alquiler sea posible.
        Libro libro = libroRepository.saveAndFlush(
                nuevoLibro("Refactoring", "Martin Fowler", "9780134757599", 2));

        // Esta llamada equivale a la accion Alquilar que realiza el frontend.
        Prestamo prestamo = prestamoService.prestar(
                solicitud("Maria Perez", libro.getId()));

        Libro actualizado = libroRepository.findById(libro.getId()).get();
        // Un prestamo correcto queda ACTIVO, conserva al lector y consume una unidad.
        assertThat(prestamo.getId()).isNotNull();
        assertThat(prestamo.getEstado()).isEqualTo("ACTIVO");
        assertThat(prestamo.getNombreLector()).isEqualTo("Maria Perez");
        assertThat(actualizado.getStock()).isEqualTo(1);
        assertThat(actualizado.getPrestamo().getId()).isEqualTo(prestamo.getId());
    }

    @Test
    void devolverMarcaPrestamoComoDevueltoYRecuperaElStock() {
        // Primero se crea un libro y se alquila para disponer de un prestamo activo.
        Libro libro = libroRepository.saveAndFlush(
                nuevoLibro("Effective Java", "Joshua Bloch", "9780134685991", 1));
        Prestamo prestamo = prestamoService.prestar(
                solicitud("Luis Perez", libro.getId()));

        // La devolucion debe cerrar el prestamo y devolver la unidad al catalogo.
        Prestamo devuelto = prestamoService.devolver(prestamo.getId());

        Libro actualizado = libroRepository.findById(libro.getId()).get();
        assertThat(devuelto.getEstado()).isEqualTo("DEVUELTO");
        assertThat(devuelto.getFechaDevolucion()).isNotNull();
        assertThat(actualizado.getStock()).isEqualTo(1);
    }

    @Test
    void prestarRechazaUnLibroSinStock() {
        // Un libro sin unidades disponibles representa el caso de error del negocio.
        Libro libro = libroRepository.saveAndFlush(
                nuevoLibro("Java Concurrency in Practice", "Brian Goetz", "9780321349606", 0));

        // assertThrows verifica que el servicio rechaza el alquiler en lugar de guardarlo.
        ResponseStatusException error = assertThrows(
                ResponseStatusException.class,
                () -> prestamoService.prestar(solicitud("Lector Sin Stock", libro.getId())));

        // El conflicto informa al frontend de que el libro existe, pero no puede prestarse.
        assertThat(error.getStatus()).isEqualTo(HttpStatus.CONFLICT);
        assertThat(error.getReason()).isEqualTo("El libro no tiene stock disponible");
    }

    private PrestarRequest solicitud(String nombreLector, Long libroId) {
        // El DTO imita el JSON que enviaria la pantalla cuando alguien pulsa Alquilar.
        PrestarRequest request = new PrestarRequest();
        request.setNombreLector(nombreLector);
        request.setLibroIds(Arrays.asList(libroId));
        return request;
    }

    private Libro nuevoLibro(String titulo, String autor, String isbn, Integer stock) {
        // Metodo auxiliar para que cada prueba destaque la regla que esta comprobando.
        Libro libro = new Libro();
        libro.setTitulo(titulo);
        libro.setAutor(autor);
        libro.setIsbn(isbn);
        libro.setStock(stock);
        return libro;
    }
}
