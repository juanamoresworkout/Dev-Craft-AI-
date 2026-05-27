# Prompt: Aprender A Usar Esta Plantilla Con Agentes

Copia y pega todo el bloque siguiente en el chat de Codex después de clonar y
abrir este repositorio en VS Code.

```text
Estoy empezando desde cero y no tengo experiencia usando los agentes de este
repositorio.

Lee primero `AGENTS.md`, `README.md` y `docs/index.prompts`. No implementes
codigo todavía.

Tu tarea es guiarme paso a paso, con instrucciones simples, para usar los
agentes escribiendo alias `@...` directamente en este chat.

Necesito que:

1. Me expliques en lenguaje sencillo qué es esta plantilla y qué partes tiene:
   backend Spring Boot, frontend Angular, documentación y gestor de agentes.
2. Me aclares la diferencia entre:
   - escribir `@api-contract`, `@backend` o `@testing` en el chat para pedirte
     trabajo;
   - ejecutar `python gestor_agentes.py "@indice"` o `"@testing"` en terminal.
3. Me indiques el orden recomendado para construir una aplicación nueva:
   `@api-contract`, `@database`, `@backend`, `@front-connector`,
   `@testing`, `@documentation`, `@deploy`.
4. Me preguntes qué aplicación sencilla quiero crear, por ejemplo tareas,
   alumnos, productos o libros.
5. Cuando responda, me ayudes primero a redactar mi primera petición para
   `@api-contract`; no pases a backend sin que yo apruebe el contrato.
6. En cada fase, indícame:
   - qué alias debo escribir;
   - qué archivos se crearán o modificarán;
   - qué comando permite comprobar el resultado;
   - qué debo mirar para saber si está correcto.
7. Si la aplicación requiere interfaz, utiliza el proyecto Angular ya incluido
   en `frontend/`, con servicios bajo `core/services`, modelos bajo `models` y
   pantallas bajo `features`.
8. No inventes requisitos, seguridad, entidades ni pantallas que yo no haya
   pedido. Pregunta cuando falte una decisión importante.

Empieza mostrando solamente:
- qué tengo ya preparado;
- qué no está todavía creado;
- la lista breve de alias;
- una pregunta para elegir mi primera aplicación de prueba.
```

## Ejemplos De Peticiones Posteriores

Una vez guiado por Codex, el usuario podrá escribir peticiones como:

```text
@api-contract Quiero una aplicación de tareas con titulo, descripcion,
fecha limite y completada. Define el contrato REST y guardalo en docs/CONTRACT.md.
```

```text
@database @backend Implementa el contrato aprobado usando H2, servicios,
repositorios y datos iniciales. Ejecuta las pruebas al terminar.
```

```text
@front-connector Usa el Angular ya incluido y crea una interfaz
simple para listar y editar tareas consumiendo el contrato aprobado.
```
