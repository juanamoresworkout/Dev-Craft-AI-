# Gestion de Biblioteca - Spring Boot + Angular
 
Aplicacion full stack para gestionar el catalogo y los prestamos de una
biblioteca. El proyecto combina una API REST desarrollada con Spring Boot y una
interfaz web en Angular, con una base de datos H2 en memoria preparada para
desarrollo y pruebas.
 
El objetivo del proyecto es ofrecer una base clara para una practica educativa:
se pueden registrar libros, consultar su disponibilidad, crear prestamos,
devolver ejemplares y mantener un flujo sencillo entre frontend, backend y
persistencia.
 
## Funcionalidades
 
- Listado de libros con titulo, autor, ISBN, stock y prestamo asociado.
- Alta, edicion, consulta y eliminacion de libros.
- Registro de prestamos a nombre de un lector.
- Asociacion de libros a un prestamo.
- Devolucion de prestamos y recuperacion de stock.
- Datos iniciales cargados en H2 para probar la aplicacion desde el primer
  arranque.
- Frontend Angular conectado a la API mediante proxy de desarrollo.
 
## Tecnologias
 
### Backend
 
- Java 8
- Spring Boot 2.7.18
- Spring Web
- Spring Data JPA
- Bean Validation
- H2 Database
- MySQL Connector preparado como dependencia runtime
- Maven
 
### Frontend
 
- Angular 21 standalone
- TypeScript
- Angular Router
- HttpClient
- Formularios reactivos
- Vite/dev server mediante Angular CLI
 
## Estructura Del Proyecto
 
```text
backend/
  pom.xml
  src/main/java/com/example/demo/
    config/       Configuracion CORS
    controller/   Endpoints REST
    dto/          Objetos de entrada y salida de la API
    entity/       Entidades JPA
    repository/   Repositorios Spring Data
    service/      Logica de negocio
  src/main/resources/
    application.properties
    schema.sql
    data.sql
 
frontend/
  package.json
  proxy.conf.json
  src/app/
    core/services/ Servicios HTTP
    features/      Pantallas de libros
    models/        Modelos TypeScript
 
docs/
  agents/
  prompts/
```
 
## API REST
 
La API se sirve por defecto en `http://localhost:8080`.
 
### Libros
 
| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/libros` | Lista todos los libros |
| GET | `/api/libros/{id}` | Obtiene un libro por id |
| POST | `/api/libros` | Crea un nuevo libro |
| PUT | `/api/libros/{id}` | Actualiza un libro |
| DELETE | `/api/libros/{id}` | Elimina un libro |
 
### Prestamos
 
| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| GET | `/api/prestamos` | Lista todos los prestamos |
| GET | `/api/prestamos/{id}` | Obtiene un prestamo por id |
| POST | `/api/prestamos` | Crea un prestamo |
| PUT | `/api/prestamos/{id}/devolver` | Marca un prestamo como devuelto |
| DELETE | `/api/prestamos/{id}` | Elimina un prestamo |
 
## Ejecucion Local
 
### 1. Arrancar El Backend
 
Desde la carpeta `backend`:
 
```powershell
mvn spring-boot:run
```
 
Si Maven no esta en el PATH, en este entorno se puede usar:
 
```powershell
C:\fpdual\java\maven\bin\mvn.cmd spring-boot:run
```
 
El backend quedara disponible en:
 
```text
http://localhost:8080
```
 
La consola H2 esta disponible en:
 
```text
http://localhost:8080/h2-console
```
 
Datos de conexion H2:
 
```text
JDBC URL: jdbc:h2:mem:demo
User: sa
Password:
```
 
### 2. Arrancar El Frontend
 
Desde la carpeta `frontend`:
 
```powershell
npm install
npm start
```
 
Angular quedara disponible en:
 
```text
http://localhost:4200
```
 
El proxy de desarrollo redirige las llamadas `/api/...` hacia
`http://localhost:8080`.
 
## Pruebas Y Construccion
 
Backend:
 
```powershell
cd backend
mvn test
mvn clean package
```
 
Frontend:
 
```powershell
cd frontend
npm run build
```
 
## Estado Del Proyecto
 
Implementado:
 
- Backend REST con capas `controller`, `service`, `repository`, `entity` y
  `dto`.
- Persistencia JPA con H2 en memoria.
- Datos iniciales para libros y prestamos.
- Frontend Angular con rutas para catalogo, detalle y formulario de libros.
- Proxy de desarrollo entre Angular y Spring Boot.
- Pruebas de backend para repositorios, servicios y carga de contexto.
 
Pendiente o ampliable:
 
- Pantallas completas para la gestion visual de prestamos.
- Validaciones y mensajes de error mas detallados en frontend.
- Perfil de produccion con base de datos externa.
- Autenticacion y roles.
 
## Notas Para GitHub
 
Este repositorio esta preparado para compartirse sin archivos generados. No se
deben subir:
 
```text
backend/target/
frontend/node_modules/
frontend/dist/
frontend/.angular/
.vscode/
```
 
Cada desarrollador puede reconstruir las dependencias con `mvn` y `npm install`
desde las carpetas correspondientes.
