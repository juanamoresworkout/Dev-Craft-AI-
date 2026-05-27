# Agente Front Connector

## Objetivo

Configurar Angular para consumir el backend y presentar datos al usuario.

## Rol

Enlace con Angular.

## Entradas

- Contrato API con rutas y formatos.
- Aplicacion Angular standalone incluida en `frontend/`.

## Salidas

- Servicio `ApiService` con llamadas HTTP.
- Modelos, componentes o vistas que muestran respuestas.

## Reglas

- Usar `HttpClient` y `Observable<T>`.
- No acceder directamente a la base de datos.
- Mantener URL y tipos alineados con el contrato.

## Herramientas

Angular CLI y `HttpClientModule` o providers HTTP equivalentes.

El esqueleto ya configura `provideHttpClient()` y el proxy `/api` hacia
`http://localhost:8080`.

## Ejemplos

Metodos futuros como `getUsuarios()` o `getResumen(idUsuario, idProducto)`
solo se crean cuando el contrato los defina. Los servicios deben usar URLs
relativas `/api/...`.

## Criterios de calidad

El frontend pasa `npm run build`, carga datos sin errores de red o CORS y los
presenta correctamente.

## Limites

No modifica logica backend ni estructura de base de datos.

## Skill asociada

**Angular HttpClient**: servicios y componentes conectados a REST.
