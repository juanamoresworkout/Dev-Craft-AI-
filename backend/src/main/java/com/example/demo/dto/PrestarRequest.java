package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

// Datos minimos para registrar un prestamo desde la interfaz.
public class PrestarRequest {

    @NotBlank
    private String nombreLector;

    @NotNull
    @NotEmpty
    private List<Long> libroIds = new ArrayList<Long>();

    public String getNombreLector() {
        return nombreLector;
    }

    public void setNombreLector(String nombreLector) {
        this.nombreLector = nombreLector;
    }

    public List<Long> getLibroIds() {
        return libroIds;
    }

    public void setLibroIds(List<Long> libroIds) {
        this.libroIds = libroIds;
    }
}
