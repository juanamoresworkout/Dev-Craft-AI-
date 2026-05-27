# Prompt: Crear Una Aplicacion Full Stack Con Agentes

Copia y pega este bloque en el chat de Codex dentro de una copia nueva de la
plantilla. Sustituye los textos entre corchetes por tu ejercicio.

```text
Quiero desarrollar una aplicacion completa usando esta plantilla Angular +
Spring Boot y sus agentes.

Lee primero `AGENTS.md`, `README.md`, `docs/index.prompts` y los agentes que
sean necesarios. La plantilla ya incluye:
- Backend Spring Boot 2.7.18 con Java 8, Maven, JPA, Validation, H2, MySQL y
  CORS para Angular en `/api/**`.
- Frontend Angular 21 standalone con rutas, `HttpClient`, proxy `/api` hacia
  `http://localhost:8080` y carpetas `core/services`, `models` y `features`.

Aplicacion que quiero crear:
[Describe aqui la idea: tareas, alumnos, productos, biblioteca, etc.]

Datos principales:
[Indica las entidades y campos. Ejemplo: Tarea con titulo, descripcion,
fechaLimite y completada.]

Operaciones necesarias:
[Indica que debe poder hacer el usuario. Ejemplo: listar, crear, editar,
marcar completada y borrar.]

Reglas importantes:
[Indica validaciones o limites. Si no hay, escribe: ninguna adicional.]

Forma de trabajo obligatoria:

1. Actua primero como `@api-contract`.
   - Crea o actualiza `docs/CONTRACT.md`.
   - Define endpoints, JSON de entrada/salida, validaciones y errores.
   - No implementes codigo todavia.
   - Muestrame el contrato y espera mi aprobacion.

2. Cuando yo apruebe el contrato, actua como `@database @backend`.
   - Crea entidades JPA, repositorios, servicios, DTO y controladores.
   - Mantiene las rutas exactamente como aparecen en el contrato.
   - Prepara datos realistas en `backend/src/main/resources/data.sql`.
   - Crea pruebas del backend correspondientes.
   - Ejecuta `mvn test` y `mvn clean package` desde `backend`.

3. Cuando el backend pase pruebas, actua como `@front-connector`.
   - Crea modelos TypeScript a partir del contrato.
   - Crea servicios HttpClient usando URLs relativas `/api/...`.
   - Crea componentes dentro de `frontend/src/app/features`.
   - Mantiene una interfaz sencilla y usable para las operaciones pedidas.
   - Ejecuta `npm run build` desde `frontend`.

4. Actua como `@testing`.
   - Comprueba el contrato frente al codigo implementado.
   - Ejecuta pruebas backend y frontend disponibles.
   - Corrige errores que impidan que funcione el ejercicio, sin introducir
     funciones no pedidas.

5. Actua como `@documentation @deploy`.
   - Documenta como arrancar backend y frontend.
   - Documenta endpoints y ejemplos.
   - Verifica las construcciones finales.

Reglas generales:
- No implementes autenticacion salvo que la pida expresamente.
- No cambies versiones principales sin explicarme el motivo.
- No inventes campos, rutas o pantallas fuera de lo descrito y aprobado.
- Antes de cada fase, explica brevemente que vas a crear.
- Al finalizar cada fase, separa: archivos creados/modificados, comprobaciones
  ejecutadas y pendientes.

Empieza solamente por la fase `@api-contract`.
```

## Uso

Este prompt no sustituye la aprobación del alumno: está diseñado para que
Codex avance por fases, evitando generar backend y frontend antes de acordar
qué debe hacer la aplicación.
