# Instrucciones Para Codex

Este repositorio es una plantilla educativa para desarrollar aplicaciones con
Spring Boot y Angular. La plantilla parte sin dominio funcional: no inventes
entidades, rutas o pantallas antes de que el usuario describa el ejercicio.

## Alias De Agentes

Cuando el usuario escriba un alias que empiece por `@`, consulta primero
`docs/index.prompts` y carga el archivo de `docs/agents/` asociado.

Alias disponibles:

- `@api-contract`: definir el contrato REST antes de implementar.
- `@database`: definir entidades JPA y datos de prueba.
- `@backend`: implementar el backend Spring Boot.
- `@front-connector`: conectar el Angular incluido con la API.
- `@testing`: crear y ejecutar pruebas.
- `@debug`: diagnosticar y corregir fallos.
- `@documentation`: documentar uso y ejecucion.
- `@deploy`: construir los artefactos.
- `@security-auth`: incorporar seguridad solo si se solicita.

Si el usuario escribe varios alias, lee todos los agentes indicados y coordina
su orden. Para una aplicacion nueva, el orden recomendado es:
`@api-contract`, `@database`, `@backend`, `@front-connector`, `@testing`,
`@documentation` y `@deploy`.

## Reglas Del Proyecto

- Lee el contrato API existente antes de implementar cambios relacionados.
- Si no existe contrato para una aplicacion nueva, proponlo o crealo primero
  siguiendo `@api-contract`.
- Mantener el backend en `backend/`, basado en Spring Boot 2.7.18 y Java 8.
- Mantener la separacion `controller`, `service`, `repository`, `entity`,
  `dto` y `config`.
- `CorsConfig` ya permite llamadas a `/api/**` desde
  `http://localhost:4200`.
- `frontend/` es una aplicacion Angular 21 standalone ya generada, con
  `HttpClient`, routing y proxy de desarrollo `/api` hacia el backend local.
- No implementar autenticacion salvo peticion expresa.
- No incluir `target/`, `node_modules/`, `dist/`, `.vscode/` ni
  `.github/modernize/` en una plantilla publicada.

## Verificacion

- Para backend: ejecutar `mvn test` y, antes de entregar o desplegar,
  `mvn clean package` desde `backend/`.
- Para frontend: ejecutar `npm install` la primera vez y `npm run build` desde
  `frontend/`. Si el npm global del equipo esta dañado, diagnosticarlo antes
  de cambiar el proyecto; `corepack npm ...` puede servir como comprobacion.
- Indicar siempre que partes se han implementado, que se ha verificado y que
  queda pendiente.

## Gestor De Alias En Terminal

`gestor_agentes.py` permite consultar los agentes o ejecutar acciones basicas:

```powershell
python gestor_agentes.py "@indice"
python gestor_agentes.py "@testing"
python gestor_agentes.py "@deploy"
python gestor_agentes.py "@backend"
```

El gestor no genera codigo de negocio. La creacion de funcionalidades se pide
a Codex en el chat usando un alias y requisitos concretos.
