package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        // Punto de entrada que arranca Spring Boot y registra controladores, servicios y repositorios.
        SpringApplication.run(DemoApplication.class, args);
    }
}
