---
title: Manejo de Assets (CSS y JS)
description: Aprende el método correcto para registrar y encolar hojas de estilo y scripts en tu tema de SwordPHP usando las funciones helper.
---

# Manejo de Assets (CSS y JS)

Para que tu tema tenga estilos y funcionalidades interactivas, necesitas cargar archivos CSS y JavaScript. SwordPHP proporciona un sistema de "encolado" para gestionar estos assets de manera eficiente y organizada.

En lugar de enlazar directamente tus archivos en `header.php` o `footer.php`, debes registrarlos a través de funciones específicas. Esto permite que el núcleo y los plugins tengan control sobre qué se carga y dónde, evitando conflictos y optimizando el rendimiento.

El lugar correcto para registrar los assets de tu tema es el archivo `functions.php`.

## Funciones Clave

### `encolarEstilo(id, ruta)`

Registra una hoja de estilos para que se incluya en la sección `<head>` de la página.

-   **`$identificador` (string):** Un nombre único para tu hoja de estilos. Por ejemplo: `'mi-tema-principal'`.
-   **`$ruta` (string):** La URL completa hacia el archivo `.css`.

### `encolarScript(id, ruta)`

Registra un archivo JavaScript para que se incluya justo antes del cierre de la etiqueta `</body>`.

-   **`$identificador` (string):** Un nombre único para tu script. Por ejemplo: `'mi-tema-interacciones'`.
-   **`$ruta` (string):** La URL completa hacia el archivo `.js`.

### `rutaTema(rutaAdicional)`

Esta es una función de ayuda (helper) esencial que genera la URL correcta a un archivo dentro del directorio de tu tema activo.

-   **`$rutaAdicional` (string):** La ruta al archivo _dentro_ de tu tema (ej. `'assets/css/estilos.css'`).

## Ejemplo Práctico

Este es un ejemplo completo de cómo encolar una hoja de estilos y un script desde el `functions.php` de tu tema.

**Estructura de archivos del tema:**
```

mi-tema/
├── functions.php
├── style.css
└── assets/
├── css/
│ └── main.css
└── js/
└── main.js

```

**Código en `functions.php`:**

```php
<?php
// /swordContent/themes/mi-tema/functions.php

/**
 * Función para registrar y encolar los assets del tema.
 */
function miTema_encolarAssets() {

    // Encolar la hoja de estilos principal.
    encolarEstilo(
        'mi-tema-estilos-principal',                          // 1. Identificador único
        rutaTema('assets/css/main.css')                       // 2. Ruta generada dinámicamente
    );

    // Encolar el script principal.
    encolarScript(
        'mi-tema-scripts-principal',                          // 1. Identificador único
        rutaTema('assets/js/main.js')                         // 2. Ruta generada dinámicamente
    );

}

/**
 * Enganchamos nuestra función al hook `sw_head`.
 * Aunque `functions.php` se carga en cada petición, usar un hook
 * es una buena práctica para asegurar que se ejecute en el momento adecuado.
 * En este caso simple, llamar a la función directamente también funciona.
 */
agregarAccion('sw_head', 'miTema_encolarAssets');

// Alternativa más simple para temas (sin hooks):
// miTema_encolarAssets();
```

Al seguir este método, te aseguras de que tus assets se carguen de la forma correcta, permitiendo que otros plugins puedan interactuar con ellos si es necesario (por ejemplo, declarando dependencias) y manteniendo tu código limpio y organizado.

> **Referencia Técnica:** Las funciones de encolado se definen en `swordCore/app/helpers/asset.php` y son gestionadas por `swordCore/app/service/AssetService.php`.

