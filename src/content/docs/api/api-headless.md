---
title: API Headless
description: Documentación de la API Headless
---

# Documentación de la API Headless - SwordPHP

## Introducción

Bienvenido a la documentación de la API RESTful de SwordPHP. Esta API te permite interactuar con tu contenido, usuarios y configuraciones de forma programática, convirtiendo a SwordPHP en un CMS completamente headless.

-   **URL Base:** `https://127.0.0.1:8787/api/v1`
-   **Formato de Datos:** Todas las peticiones y respuestas utilizan el formato `JSON`.
-   **Codificación:** Se recomienda enviar `Content-Type: application/json` en las cabeceras de las peticiones `POST` y `PUT`.

---

## Autenticación

La mayoría de los endpoints de la API están protegidos y requieren autenticación para asegurar la integridad de tus datos. Utilizamos un sistema de **Bearer Tokens** asociados a cada usuario.

### Cómo Obtener tu Token

1.  Inicia sesión en tu panel de administración (`https://127.0.0.1:8787/panel`).
2.  Navega a la sección **Usuarios**.
3.  Edita el usuario para el cual deseas generar un token.
4.  En la sección **Acceso por API**, haz clic en el botón **`Generar / Regenerar Token`**.
5.  Copia el token generado.

### Cómo Usar tu Token

Debes incluir tu token en la cabecera `Authorization` de cada petición a un endpoint protegido.

**Formato de la Cabecera:**

```
Authorization: Bearer <TU_TOKEN_DE_API>
```

---

## Recurso: Contenido (`/content`)

Endpoints para gestionar páginas, entradas y cualquier otro tipo de contenido personalizado.

### 1\. Listar Contenido

-   `GET /content`
-   **Descripción:** Recupera una lista paginada de contenidos. Por defecto, solo devuelve contenido con estado `publicado`.
-   **Autenticación:** Pública.

#### Parámetros de Consulta (Query Params)

| Parámetro  | Descripción                                        | Opcional | Por Defecto |
| :--------- | :------------------------------------------------- | :------- | :---------- |
| `type`     | El `slug` del tipo de contenido a listar.          | Sí       | `pagina`    |
| `per_page` | Número de ítems por página.                        | Sí       | `10`        |
| `page`     | El número de la página que se desea obtener.       | Sí       | `1`         |
| `status`   | Filtra por estado (`publicado`, `borrador`, etc.). | Sí       | `publicado` |

#### Ejemplo con `curl`

```bash
# Obtener la segunda página de "entradas" (asumiendo que el tipo 'post' existe), 5 por página
curl "https://127.0.0.1:8787/api/v1/content?type=post&per_page=5&page=2"
```

#### Respuesta Exitosa (200 OK)

```json
{
    "data": {
        "items": [
            {
                "id": 15,
                "titulo": "Mi Quinta Entrada",
                "subtitulo": null,
                "contenido": "Contenido de la entrada...",
                "slug": "mi-quinta-entrada",
                "idautor": 1,
                "estado": "publicado",
                "tipocontenido": "post",
                "metadata": {
                    "_imagen_destacada_id": 12
                },
                "created_at": "2025-06-21T15:30:00.000000Z",
                "updated_at": "2025-06-21T15:30:00.000000Z"
            }
        ],
        "pagination": {
            "total_items": 25,
            "total_pages": 5,
            "current_page": 2,
            "per_page": 5
        }
    }
}
```

### 2\. Obtener un Contenido Específico

-   `GET /content/{id}`
-   **Descripción:** Recupera una única pieza de contenido por su ID. Solo devolverá el recurso si su estado es `publicado`.
-   **Autenticación:** Pública.

#### Ejemplo con `curl`

```bash
curl "https://127.0.0.1:8787/api/v1/content/15"
```

---

### 3\. Crear Contenido

-   `POST /content`
-   **Descripción:** Crea una nueva pieza de contenido.
-   **Autenticación:** Requerida (Bearer Token).

#### Cuerpo de la Petición (JSON)

```json
{
    "titulo": "Nuevo Post desde la API",
    "contenido": "Este es un post increíble creado programáticamente.",
    "tipocontenido": "post",
    "estado": "borrador",
    "metadata": {
        "custom_field": "valor personalizado"
    }
}
```

#### Ejemplo con `curl`

```bash
curl -X POST "https://127.0.0.1:8787/api/v1/content" \
-H "Authorization: Bearer <TU_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"titulo": "Nuevo Post...", "contenido": "...", "tipocontenido": "post", "estado": "borrador"}'
```

#### Respuesta Exitosa (201 Created)

## Devuelve el objeto del contenido recién creado.

### 4\. Actualizar Contenido

-   `PUT /content/{id}`
-   **Descripción:** Actualiza una pieza de contenido existente. Puedes enviar solo los campos que deseas cambiar.
-   **Autenticación:** Requerida (Bearer Token).

#### Ejemplo con `curl`

```bash
curl -X PUT "https://127.0.0.1:8787/api/v1/content/25" \
-H "Authorization: Bearer <TU_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"estado": "publicado", "subtitulo": "Un subtítulo nuevo"}'
```

#### Respuesta Exitosa (200 OK)

## Devuelve el objeto completo del contenido actualizado.

### 5\. Eliminar Contenido

-   `DELETE /content/{id}`
-   **Descripción:** Elimina permanentemente una pieza de contenido.
-   **Autenticación:** Requerida (Bearer Token).

#### Ejemplo con `curl`

```bash
curl -X DELETE "https://127.0.0.1:8787/api/v1/content/25" \
-H "Authorization: Bearer <TU_TOKEN>"
```

#### Respuesta Exitosa (204 No Content)

La respuesta no tiene cuerpo. Un código de estado `204` indica que la eliminación fue exitosa.

---

## Recurso: Usuarios (`/users`)

Endpoints para gestionar usuarios. **Todos los endpoints de este recurso requieren autenticación.**

### 1\. Listar Usuarios

-   `GET /users`
-   **Ejemplo `curl`:** `curl "https://127.0.0.1:8787/api/v1/users" -H "Authorization: Bearer <TU_TOKEN>"`
-   **Respuesta:** Devuelve un objeto paginado con la lista de usuarios. Los campos `clave` y `api_token` son excluidos automáticamente.

### 2\. Obtener un Usuario Específico

-   `GET /users/{id}`
-   **Ejemplo `curl`:** `curl "https://127.0.0.1:8787/api/v1/users/1" -H "Authorization: Bearer <TU_TOKEN>"`

### 3\. Crear un Usuario

-   `POST /users`
-   **Cuerpo de la Petición (JSON):**
    ```json
    {
        "nombreusuario": "nuevo.usuario",
        "correoelectronico": "nuevo@ejemplo.com",
        "clave": "UnaContraseñaFuerte123!",
        "nombremostrado": "Nuevo Usuario",
        "rol": "suscriptor"
    }
    ```
-   **Ejemplo `curl`:** `curl -X POST "https://..." -H "..." -d '{...}'`

### 4\. Actualizar un Usuario

-   `PUT /users/{id}`
-   **Cuerpo de la Petición (JSON):** Envía solo los campos a modificar. Para cambiar la contraseña, envía el campo `clave`.
-   **Ejemplo `curl`:** `curl -X PUT "https://.../users/3" -H "..." -d '{"nombremostrado": "Nombre Actualizado"}'`

### 5\. Eliminar un Usuario

-   `DELETE /users/{id}`
-   **Ejemplo `curl`:** `curl -X DELETE "https://.../users/3" -H "..."`
-   **Respuesta Exitosa:** `204 No Content`.

---

## Recurso: Opciones (`/options`)

Endpoints para gestionar las configuraciones del sitio. **Todos los endpoints de este recurso requieren autenticación.**

### 1\. Obtener una Opción

-   `GET /options/{key}`
-   **Descripción:** Obtiene el valor de una opción por su clave. La clave puede contener puntos (ej. `mi.opcion.anidada`).
-   **Ejemplo `curl`:**
    ```bash
    # Obtener la opción 'titulo_sitio'
    curl "https://127.0.0.1:8787/api/v1/options/titulo_sitio" -H "Authorization: Bearer <TU_TOKEN>"
    ```
-   **Respuesta Exitosa (200 OK):**
    ```json
    {
        "data": {
            "key": "titulo_sitio",
            "value": "Mi Increíble Sitio SwordPHP"
        }
    }
    ```

### 2\. Crear o Actualizar una Opción

-   `POST /options`
-   **Descripción:** Establece el valor para una clave. Si la clave no existe, se crea. Si ya existe, su valor se actualiza.
-   **Cuerpo de la Petición (JSON):**
    ```json
    {
        "key": "color_primario",
        "value": "#FF5733"
    }
    ```
-   **Ejemplo `curl`:**
    ```bash
    curl -X POST "https://127.0.0.1:8787/api/v1/options" \
    -H "Authorization: Bearer <TU_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{"key": "color_primario", "value": "#FF5733"}'
    ```
-   **Respuesta Exitosa (200 OK):** Devuelve el par clave/valor guardado.


### Obtener un Token Vía API (Login Programático)

Además de generar tokens manualmente desde el panel, puedes obtener uno de forma programática enviando las credenciales de un usuario a un endpoint público específico. Esto es ideal para flujos de login en aplicaciones externas (ej. una app móvil o un frontend en JavaScript).

-   `POST /auth/token`
-   **Descripción:** Intercambia un nombre de usuario y una contraseña por un token de API.
-   **Autenticación:** Pública (no requiere Bearer Token).
-   **URL:** `https://127.0.0.1:8787/auth/token` (Nota: este endpoint está fuera del prefijo `/api/v1`).

#### Cuerpo de la Petición (Request Body)

| Campo           | Tipo   | Descripción                                | Requerido |
| :-------------- | :----- | :----------------------------------------- | :-------- |
| `nombreusuario` | string | El nombre de usuario o correo electrónico. | Sí        |
| `clave`         | string | La contraseña en texto plano del usuario.  | Sí        |

**Ejemplo de Petición:**

```json
{
    "nombreusuario": "el_usuario",
    "clave": "la_contraseña"
}
```

#### Respuesta Exitosa (200 OK)

Si las credenciales son correctas, la API devolverá el token recién generado y un objeto con la información pública del usuario.

```json
{
    "data": {
        "token": "aqui_el_jwt_o_bearer_token_generado",
        "usuario": {
            "id": 1,
            "nombreusuario": "el_usuario",
            "nombremostrado": "El Usuario",
            "correoelectronico": "usuario@kamples.com",
            "rol": "admin"
        }
    }
}
```

#### Respuestas de Error

-   **`422 Unprocessable Entity`**: Si faltan campos en la petición.
    ```json
    {
        "error": {
            "code": 422,
            "message": "El nombre de usuario y la clave son obligatorios."
        }
    }
    ```
-   **`401 Unauthorized`**: Si las credenciales son incorrectas.
    ```json
    {
        "error": {
            "code": 401,
            "message": "Las credenciales proporcionadas son incorrectas."
        }
    }
    ```

#### Ejemplo completo con `curl`

```bash
curl -X POST "https://127.0.0.1:8787/auth/token" \
-H "Content-Type: application/json" \
-d '{"nombreusuario": "mi_admin", "clave": "mi_clave_segura"}'
```
