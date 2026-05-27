# Frontend Angular

Aplicacion Angular 21 standalone incluida en la plantilla full stack. Arranca
sin dominio concreto: la pagina inicial solo explica el flujo para construir
una nueva practica.

## Requisitos

- Node.js 24.x compatible con Angular 21.
- npm 11.x.
- Angular CLI 21.x.

## Desarrollo

Instalar dependencias una vez:

```powershell
npm install
```

Arrancar el frontend:

```powershell
npm start
```

El comando utiliza `proxy.conf.json`: cualquier llamada Angular a `/api/...`
se redirige al backend local en `http://localhost:8080`.

En otra terminal, arrancar Spring Boot desde la raiz del repositorio:

```powershell
cd backend
mvn spring-boot:run
```

## Estructura Inicial

```text
src/app/
  core/services/  servicios HttpClient compartidos
  models/         interfaces del contrato API
  features/       pantallas y componentes por funcionalidad
```

Los directorios contienen documentacion y se completan cuando se defina el
contrato de la aplicacion.

## Verificacion

```powershell
npm test -- --watch=false
npm run build
```
