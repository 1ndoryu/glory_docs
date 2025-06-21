---
title: Conceptos Fundamentales
description: Entiende la arquitectura clave de SwordPHP, la separación entre el núcleo (swordCore) y tu contenido (swordContent), y por qué es vital para la mantenibilidad.
---

# Conceptos Fundamentales: swordCore y swordContent

La decisión más importante en la arquitectura de SwordPHP es la estricta separación del proyecto en dos directorios principales: `swordCore` y `swordContent`. Comprender esta división es el primer paso para desarrollar en la plataforma.

Esta separación te permite actualizar el núcleo de SwordPHP con nuevas versiones sin temor a que tus temas, plugins o archivos subidos sean eliminados o modificados. Tu trabajo está seguro y aislado en `swordContent`.

## Estructura de Directorios

A alto nivel, la estructura de un proyecto SwordPHP se ve así:

```

SwordPHP/
├── swordCore/ # 🧠 El cerebro de la aplicación
└── swordContent/ # 🎨 Tu contenido personalizado

```

## Profundizando en los Directorios

Veamos qué hay dentro de cada uno:

### `swordCore`

Este directorio es el motor de SwordPHP. Sus subdirectorios más importantes son:

- **`/app`**: El corazón de la aplicación. Aquí viven:
    - **`/controller`**: Gestionan las peticiones HTTP y la lógica de las rutas.
    - **`/service`**: Contienen la lógica de negocio (ej. `PluginService`, `TemaService`).
    - **`/helpers`**: Funciones globales (`theTitle()`, `addAction()`, etc.) que facilitan el desarrollo.
    - **`/model`**: Modelos de base de datos Eloquent (ej. `Pagina`, `Usuario`).
    - **`/middleware`**: Lógica que se ejecuta antes o después de una petición (ej. autenticación).
- **`/config`**: Archivos de configuración para el servidor, la base de datos, las rutas, etc.
- **`/public`**: Contiene los assets del panel de administración (CSS, JS).

### `swordContent`

Este es el directorio con el que interactuarás la mayor parte del tiempo como desarrollador.

- **`/themes`**: Aquí instalas tus temas. Cada tema tiene su propio subdirectorio (ej. `/themes/mi-tema-genial/`). SwordPHP busca aquí el `style.css` y el `functions.php` del tema activo.
- **`/plugins`**: Aquí instalas tus plugins. Cada plugin vive en su propio subdirectorio (ej. `/plugins/mi-plugin-asombroso/`).
- **`/media`**: La biblioteca de medios. Cuando subes una imagen o archivo a través del panel, se almacena aquí, generalmente organizado en carpetas por año y mes.

Esta separación deliberada es uno de los pilares de SwordPHP, garantizando que el sistema sea a la vez robusto, seguro y fácil de mantener a largo plazo.