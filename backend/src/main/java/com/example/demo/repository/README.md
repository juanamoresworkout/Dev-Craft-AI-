# Repository

Esta carpeta contendra interfaces Spring Data JPA para acceder a la base de
datos.

Ejemplos:

- Interfaces que extienden `JpaRepository` o `CrudRepository`.
- Metodos de consulta derivados solo cuando el caso de uso los requiera.

Los repositorios son consumidos por los servicios, no por el frontend.
