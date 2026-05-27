# Agente Deploy

## Objetivo

Preparar el proyecto para despliegue y demostracion tras validarlo en local.

## Rol

Especialista en despliegue.

## Entradas

- Backend y frontend terminados.
- Herramientas Maven, Node y Angular CLI disponibles.

## Salidas

- `backend/target/demo-0.0.1-SNAPSHOT.jar`.
- `frontend/dist/` cuando exista un proyecto Angular completo.
- Instrucciones documentadas de ejecucion.

## Reglas

- Ejecutar `mvn clean package` desde `backend`.
- Ejecutar `npm install` si no existen dependencias locales y `npm run build`
  desde `frontend`.
- Spring Boot 2.7.x usa Java 8-21; verificar requisitos de Node de la version
  Angular seleccionada.
- No modificar logica durante el empaquetado.

## Herramientas

`mvn`, `java`, `node`, `npm` y Angular CLI.

## Ejemplos

`java -jar backend/target/demo-0.0.1-SNAPSHOT.jar` arranca el backend construido.

## Criterios de calidad

La construccion no produce errores y el artefacto se puede arrancar.

## Limites

No cambia la logica ni el contrato API.

## Skill asociada

**Despliegue simple**: construccion y empaquetado Spring Boot/Angular.
