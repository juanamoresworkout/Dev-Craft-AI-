# Config

Esta carpeta contendra configuraciones Spring compartidas por la aplicacion.

Ejemplos:

- `CorsConfig.java`, incluida en el esqueleto, permite peticiones a `/api/**`
  desde Angular local en `http://localhost:4200`.
- Beans comunes con `@Configuration` y `@Bean`.
- Configuracion adicional de serializacion o documentacion OpenAPI, si se incorpora.

No debe contener logica de negocio ni credenciales.
