# Formacion Spring - esqueleto de trabajo

Este repositorio queda preparado para crear una nueva practica sin conservar el
dominio de ejemplo anterior. El backend arranca como aplicacion Spring Boot,
pero no expone endpoints ni contiene entidades hasta que se defina un nuevo
contrato.

## Estructura

```text
backend/
  pom.xml
  src/main/java/com/example/demo/
    DemoApplication.java
    config/ controller/ dto/ entity/ repository/ service/
  src/main/resources/
    application.properties
    data.sql
frontend/
  package.json
  proxy.conf.json
  src/app/
    core/services/ models/ features/
docs/
  agents/
  index.prompts
  prompts/
AGENTS.md
gestor_agentes.py
```

`backend` utiliza Spring Boot 2.7.18 y Java 8, con dependencias preparadas para
REST, validacion, JPA, H2, MySQL y pruebas. H2 se configura en memoria para
desarrollo y `CorsConfig` permite llamadas Angular locales a `/api/**`.
`frontend` es una aplicacion Angular 21 standalone con rutas, cliente HTTP y
proxy de desarrollo: las llamadas a `/api/...` se envian al backend local.

Cada carpeta reservada incluye un `README.md` indicando el codigo que debe
contener cuando se implemente una practica.

## Agentes

Las instrucciones de trabajo estan en `docs/agents`. El indice de alias se
consulta con:

```powershell
python gestor_agentes.py "@indice"
```

Alias operativos disponibles:

```powershell
python gestor_agentes.py "@testing"
python gestor_agentes.py "@deploy"
python gestor_agentes.py "@backend"
```

`@testing` ejecuta las pruebas de backend y del frontend Angular.
`@deploy` construye el backend y solo ejecuta `npm run build` si existe un frontend
Angular completo con `frontend/package.json`.

`AGENTS.md` explica a Codex como interpretar esos alias cuando otra persona
clone la plantilla y abra el repositorio en su propio entorno.

Prompts para entregar a un compañero:

- `docs/prompts/USO_AGENTES_DESDE_CERO.prompt.md`: guia interactiva para usar
  `@...` desde el chat de Codex.
- `docs/prompts/INSTALAR_ENTORNO_COMPANERO.prompt.md`: preparacion y
  verificacion del entorno de desarrollo.
- `docs/prompts/CREAR_PROYECTO_FULLSTACK.prompt.md`: secuencia completa para
  construir una nueva aplicacion Angular + Spring mediante agentes.

### Uso Rapido Desde Codex

En el chat de Codex escribe el agente junto con la tarea que quieres crear:

```text
@api-contract Quiero una aplicacion de tareas. Define endpoints y JSON.
```

Cuando apruebes el contrato, puedes continuar por fases:

```text
@database @backend Implementa el contrato con H2 y pruebas.
@front-connector Crea la interfaz Angular que consuma la API.
@testing @documentation @deploy Comprueba, documenta y construye el proyecto.
```

En terminal, `gestor_agentes.py` permite consultar instrucciones o ejecutar
comprobaciones ya preparadas; no crea por si solo las funcionalidades:

```powershell
python gestor_agentes.py "@indice"
python gestor_agentes.py "@testing"
python gestor_agentes.py "@deploy"
```

## Alcance Actual

Esta plantilla prepara el entorno y ordena el trabajo mediante agentes, pero
no genera automaticamente una aplicacion completa a partir de un enunciado.

Actualmente esta listo:

- Backend Spring Boot arrancable y comprobable con Maven.
- Frontend Angular standalone arrancable y compilable con npm.
- Capas documentadas para implementar API, persistencia y servicios.
- Agentes para contrato, backend, base de datos, frontend, testing, despliegue,
  depuracion, documentacion y seguridad.
- Gestor de alias para consultar agentes, probar, empaquetar y arrancar backend.

Para convertir la plantilla en una aplicacion concreta falta:

- Definir un contrato de ejemplo o el contrato de cada nueva practica.
- Implementar el codigo concreto que requiera ese contrato.
- Ampliar el gestor si se quiere que cree scaffolding en vez de limitarse a
  mostrar instrucciones y lanzar comandos.

## Arranque manual

```powershell
cd backend
mvn clean package
mvn spring-boot:run
```

En otra terminal:

```powershell
cd frontend
npm install
npm start
```

## Que Compartir En GitHub

Se deben subir `backend/`, `frontend/` (incluido `package-lock.json`),
`docs/`, `AGENTS.md`, `gestor_agentes.py`, `.gitignore` y este `README.md`.

No se deben subir resultados generados ni configuracion personal:

```text
backend/target/
frontend/node_modules/
frontend/dist/
frontend/.angular/
.vscode/
.github/modernize/
```

`node_modules` no se comparte: cada companero lo recrea desde
`frontend/package-lock.json` ejecutando `npm install` en `frontend/`.

Antes de implementar una nueva practica se debe escribir el contrato API,
definir sus entidades y reemplazar el comentario de `data.sql` por los datos
que correspondan.

## Orden De Trabajo Para Una Practica

1. Consultar los agentes con `python gestor_agentes.py "@indice"`.
2. Escribir el contrato REST siguiendo `@api-contract`.
3. Disenar entidades y datos iniciales siguiendo `@database`.
4. Implementar backend siguiendo `@backend`.
5. Completar Angular y conectarlo siguiendo `@front-connector`.
6. Ejecutar `python gestor_agentes.py "@testing"`.
7. Documentar y construir con `@documentation` y `@deploy`.
