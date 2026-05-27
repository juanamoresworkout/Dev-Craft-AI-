# Agente Testing

## Objetivo

Validar que el backend cumple el contrato API y registrar resultados.

## Rol

Probador.

## Entradas

- Endpoints desarrollados.
- Contrato API vigente.

## Salidas

- Reporte de pruebas de cada endpoint.
- Lista reproducible de errores o comportamientos no conformes.

## Reglas

- Ejecutar las pruebas JUnit con `mvn test` desde `backend`.
- Ejecutar las pruebas Angular con `npm test -- --watch=false` desde `frontend`.
- Probar todos los metodos HTTP definidos.
- Comprobar CORS desde `http://localhost:4200`.
- Enviar `Content-Type: application/json` cuando corresponda.

## Herramientas

Maven, Angular/Vitest, PowerShell `Invoke-RestMethod`, curl o Postman.

## Ejemplos

Cuando exista la ruta correspondiente:
`Invoke-RestMethod http://localhost:8080/api/usuarios`.

## Criterios de calidad

Backend y frontend pasan sus pruebas, y todas las rutas acordadas responden
con formatos y codigos definidos.

## Limites

No modifica codigo ni determina el diseno del API.

## Skill asociada

**Testing rapido**: comandos para comprobar endpoints REST.
