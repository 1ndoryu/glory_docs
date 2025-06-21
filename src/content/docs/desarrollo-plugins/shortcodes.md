---
title: Shortcodes
description: Aprende a crear shortcodes para permitir a los usuarios insertar contenido dinámico o complejo dentro de sus páginas y entradas.
---

# API de Shortcodes

La API de Shortcodes permite registrar "etiquetas" especiales que los usuarios pueden insertar en el editor de contenido (por ejemplo, `[mi_shortcode]`) y que tu plugin reemplazará por HTML dinámico cuando la página se muestre en el frontend.

## Registrar un Shortcode

Para crear un nuevo shortcode, se utiliza la función `addShortcode`.

### `addShortcode(tag, callback)`

-   `$tag` (string): La etiqueta del shortcode que el usuario escribirá entre corchetes. Por ejemplo, para `[saludo]`, el tag es `'saludo'`.
-   `$callback` (callable): La función de tu plugin que se ejecutará y cuyo valor devuelto reemplazará al shortcode.

La función de callback recibe hasta tres parámetros:

-   `$atributos` (array): Un array asociativo con los atributos pasados al shortcode.
-   `$contenido` (string|null): El contenido que se encuentra entre la etiqueta de apertura y cierre de un shortcode (si lo tiene).
-   `$tag` (string): El tag del shortcode que se está procesando.

## Tipos de Shortcodes

### 1. Shortcode Simple

Es el tipo más básico, no tiene atributos ni contenido.

```php
// Registro
addShortcode('saludo', 'miPlugin_callbackSaludo');

// Callback
function miPlugin_callbackSaludo($atributos, $contenido = null)
{
    return "<strong>¡Hola desde el shortcode de ejemplo!</strong>";
}

// Uso por el usuario: [saludo]
```

### 2\. Shortcode con Atributos

Permite al usuario personalizar la salida del shortcode.

```php
// Registro
addShortcode('saludo_personalizado', 'miPlugin_callbackSaludoPersonalizado');

// Callback
function miPlugin_callbackSaludoPersonalizado($atributos, $contenido = null)
{
    // Establecemos un valor por defecto para el atributo 'nombre'.
    $nombre = $atributos['nombre'] ?? 'Mundo';
    return "¡Hola, " . htmlspecialchars($nombre) . "!";
}

// Uso por el usuario: [saludo_personalizado nombre="Gemini"]
```

### 3\. Shortcode con Contenido (Enclosing)

Este tipo de shortcode tiene una etiqueta de apertura y una de cierre, y procesa el texto que se encuentra entre ellas.

```php
// Registro
addShortcode('caja', 'miPlugin_callbackCaja');

// Callback
function miPlugin_callbackCaja($atributos, $contenido = null)
{
    if (is_null($contenido)) {
        return '';
    }

    // Permitimos personalizar el color del borde.
    $colorBorde = $atributos['borde'] ?? '#ccc';
    $estilos = "border: 1px solid {$colorBorde}; padding: 15px; background-color: #f9f9f9;";

    // Opcional: Procesar shortcodes anidados dentro del contenido.
    $contenidoProcesado = procesarShortcodes($contenido);

    return "<div style='{$estilos}'>{$contenidoProcesado}</div>";
}

// Uso por el usuario: [caja borde="blue"]Este es el contenido a envolver.[/caja]
```

El sistema de SwordPHP se encarga automáticamente de buscar y reemplazar estos shortcodes en el contenido de las páginas a través del filtro `theContent`.

> **Referencia Técnica:** La API de Shortcodes se define en `swordCore/app/helpers/shortcode.php` y es gestionada por `ShortcodeService`.


