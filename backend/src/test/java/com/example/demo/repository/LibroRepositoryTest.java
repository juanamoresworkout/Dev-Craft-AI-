package com.example.demo.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.demo.entity.Libro;
import java.util.Optional;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

// Carga solo la capa JPA y una base H2 de prueba: es mas rapido que arrancar toda la API.
@DataJpaTest
// Permite usar @BeforeAll como metodo de instancia y guardar el libro preparado en un atributo.
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class LibroRepositoryTest {

    // Spring inyecta el repositorio real que se comunica con la base de datos de prueba.
    @Autowired
    private LibroRepository libroRepository;

    private Libro libroPreparado;

    // Este libro se inserta una sola vez y sirve como dato comun para comprobar lecturas.
    @BeforeAll
    void insertarLibroBase() {
        Libro libro = nuevoLibro("Clean Code", "Robert C. Martin", "9780132350884", 3);
        // saveAndFlush obliga a ejecutar el INSERT antes de comenzar las comprobaciones.
        libroPreparado = libroRepository.saveAndFlush(libro);
    }

    @Test
    void guardaElLibroInsertadoEnBeforeAll() {
        // Se busca por id para verificar que el repositorio realmente lo guardo en H2.
        Optional<Libro> encontrado = libroRepository.findById(libroPreparado.getId());

        // Las aserciones comparan la informacion leida con los valores insertados.
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getTitulo()).isEqualTo("Clean Code");
        assertThat(encontrado.get().getAutor()).isEqualTo("Robert C. Martin");
        assertThat(encontrado.get().getStock()).isEqualTo(3);
    }

    @Test
    void creaUnLibroNuevoYLoRecuperaDesdeH2() {
        // Esta insercion simula la creacion de un libro nuevo desde la aplicacion.
        Libro guardado = libroRepository.saveAndFlush(
                nuevoLibro("Domain-Driven Design", "Eric Evans", "9780321125217", 2));

        Optional<Libro> encontrado = libroRepository.findById(guardado.getId());

        // El id demuestra que JPA/H2 genero una clave y la lectura confirma la persistencia.
        assertThat(guardado.getId()).isNotNull();
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getIsbn()).isEqualTo("9780321125217");
        assertThat(encontrado.get().getStock()).isEqualTo(2);
    }

    private Libro nuevoLibro(String titulo, String autor, String isbn, Integer stock) {
        // Metodo auxiliar para preparar libros sin repetir la asignacion de cada campo.
        Libro libro = new Libro();
        libro.setTitulo(titulo);
        libro.setAutor(autor);
        libro.setIsbn(isbn);
        libro.setStock(stock);
        return libro;
    }
}
