# Controller

Esta carpeta contendra los controladores REST que publican los endpoints
definidos en el contrato API.

Ejemplos:

- `UsuarioController.java` para rutas `/api/usuarios`.
- `ProductoController.java` para rutas `/api/productos`.

Los controladores validan entradas y delegan el trabajo a servicios. No deben
acceder directamente a la base de datos.
