# Prompt: Preparar El Entorno De Un Companero

Este prompt está pensado para un compañero con Windows 11 que ha clonado el
repositorio y lo ha abierto en Codex. Codex debe comprobar antes de instalar:
las instalaciones cambian el equipo y pueden requerir confirmación del usuario.

## Requisito Previo Manual

Antes de usar el prompt, el compañero necesita tener instalado VS Code y acceso
a Codex en VS Code o en su herramienta habitual, además de haber clonado o
descargado esta plantilla. Codex no puede instalarse a sí mismo desde una
sesión que todavía no está disponible.

Copia y pega el bloque siguiente en el chat de Codex del compañero.

```text
Acabo de clonar esta plantilla y necesito preparar mi ordenador Windows para
trabajar con ella de la misma forma que el autor.

Lee `AGENTS.md`, `README.md`, `backend/pom.xml` y
`docs/prompts/INSTALAR_ENTORNO_COMPANERO.prompt.md`.

Objetivo:
Configurar y verificar un entorno compatible con esta plantilla, explicándome
cada paso como a una persona principiante. No modifiques la funcionalidad de
la aplicación: el proyecto Angular ya está creado dentro de `frontend/`.

Entorno de referencia de la plantilla:
- Sistema: Windows 11 x64.
- VS Code instalado.
- Git: 2.54.0.windows.1 o compatible.
- Python: 3.13.13 o compatible para ejecutar `gestor_agentes.py`.
- JDK: Eclipse Temurin Java 8, referencia `1.8.0_402`.
- Maven: 3.9.6, configurado para utilizar Java 8.
- Node.js: 24.16.0.
- npm: 11.13.0.
- Backend: Spring Boot 2.7.18 definido por Maven.
- Frontend: Angular 21 standalone ya incluido; su CLI está declarado en
  `frontend/package.json` y se instala localmente con `npm install`.

Sigue este procedimiento:

1. Comprueba desde la terminal las herramientas existentes con:
   `git --version`, `python --version`, `java -version`, `mvn -v`,
   `node --version` y `npm --version`.
2. Presenta una tabla indicando qué ya existe, qué falta y qué versión no es
   compatible.
3. Antes de instalar herramientas o modificar variables de entorno, pídeme
   autorización clara.
4. Para herramientas faltantes, utiliza instaladores oficiales o `winget`
   cuando esté disponible. Instala solo lo necesario:
   - Git para control de versiones.
   - Python para el gestor de agentes.
   - Temurin JDK 8 y Maven para `backend`.
   - Node.js 24 con npm para trabajar con el frontend.
   - No instales Angular CLI globalmente salvo que yo lo solicite; el proyecto
     usa el Angular CLI local mediante `npm start`, `npm test` y
     `npm run build`.
5. Si hay más de un Java instalado, configura `JAVA_HOME` y el `PATH` para que
   `mvn -v` muestre Java 8 al construir este backend.
6. Tras cada instalación, abre o solicita abrir una terminal nueva y vuelve a
   ejecutar los comandos de verificación.
7. Verifica el repositorio:
   - Ejecuta `python gestor_agentes.py "@indice"` desde la raíz.
   - Ejecuta `mvn clean package` desde `backend`.
   - Ejecuta `npm install`, `npm test -- --watch=false` y `npm run build`
     desde `frontend`.
   - Ejecuta `python gestor_agentes.py "@testing"` y
     `python gestor_agentes.py "@deploy"` desde la raíz.
8. Si `npm install` falla por un problema interno de la instalación global de
   npm, diagnostica primero Node/NVM. Como comprobación no destructiva, puedes
   proponer `corepack npm install` si Corepack está disponible.
9. Si cualquier instalación falla, detente, muestra el error exacto y propone
   la corrección mínima.

Termina con un resumen de:
- versiones instaladas;
- comprobaciones que han pasado;
- lo que sigue pendiente para comenzar la primera aplicación.
```

## Nota Importante

Codex no puede garantizar una instalación idéntica en todos los ordenadores:
pueden cambiar permisos, rutas, versiones disponibles o políticas de la
empresa. Este prompt busca un entorno compatible y verificable con la
plantilla, no copiar configuraciones personales o credenciales.
