---
title: Estructura de un Tema
description: Aprende sobre los archivos y directorios esenciales que componen un tema de SwordPHP, desde style.css y functions.php hasta las partes de la plantilla.
---

# Estructura de un Tema

Un tema en SwordPHP es un conjunto de archivos que definen la apariencia y el diseño de tu sitio web. Todos los temas residen en el directorio `swordContent/themes/`, y cada tema debe tener su propia carpeta.

Un tema puede ser muy simple o muy complejo, pero hay un conjunto de archivos esenciales que forman la base de cualquier tema de SwordPHP.

```

swordContent/
└── themes/
└── mi-tema/
├── style.css             \# Obligatorio. Define el tema.
├── functions.php         \# El "cerebro" del tema.
├── pagina.php            \# La plantilla por defecto para páginas.
└── layouts/
├── header.php        \# La cabecera del sitio.
└── footer.php        \# El pie de página del sitio.

```

---

## 1. `style.css`

Este es el archivo **más importante** de tu tema. Su sola presencia, con una cabecera de metadatos formateada correctamente, es lo que hace que SwordPHP reconozca el directorio como un tema válido y lo muestre en el panel de administración.

La cabecera es un comentario CSS al principio del archivo que proporciona información sobre el tema.

```css
/*
Theme Name: Mi Tema Asombroso
Theme URI: [https://mi-sitio.com/mi-tema-asombroso](https://mi-sitio.com/mi-tema-asombroso)
Description: Un tema de ejemplo para demostrar la estructura básica en SwordPHP.
Author: Tu Nombre
Author URI: [https://mi-sitio.com](https://mi-sitio.com)
Version: 1.0
*/

/* El resto de tu CSS va aquí... */
```

## 2\. `functions.php`

Este es el cerebro de tu tema. Se carga automáticamente en cada petición del frontend. Es el lugar ideal para:

-   Encolar los archivos de estilos (CSS) y scripts (JS) de tu tema.
-   Añadir funciones personalizadas para tu tema.
-   Registrar hooks (acciones y filtros) para modificar el comportamiento de SwordPHP.

**Ejemplo de `functions.php`:**

```php
<?php
// /swordContent/themes/default-theme-two/functions.php

/**
 * Encola los assets (estilos y scripts) para el tema.
 */
function encolarAssets() {
    // Encola la hoja de estilos principal del tema.
    encolarEstilo(
        'sword-theme-default-style', 
        // La función helper `rutaTema()` genera la URL correcta al archivo.
        rutaTema('assets/css/style.css')
    );
}

// La función se ejecuta directamente cuando se incluye functions.php
encolarAssets();
```

## 3\. `pagina.php`

Esta es la plantilla por defecto para renderizar una página. Cuando un visitante accede a una URL, SwordPHP busca la plantilla más específica para mostrar el contenido. Si no encuentra una plantilla más específica (como una personalizada), usará `pagina.php` como fallback.

Este archivo es el responsable de implementar "El Loop" para mostrar el título y el contenido.

```php
<?php
// /swordContent/themes/default-theme-two/pagina.php

// 1. Carga la cabecera del tema
getHeader();

// 2. Inicia el Loop de SwordPHP
if (hayEntradas()) :
    while (hayEntradas()) :
        laEntrada(); // Prepara los datos de la entrada actual
?>

    <h1><?php elTitulo(); ?></h1>
    <div>
        <?php elContenido(); ?>
    </div>

<?php
    endwhile;
endif;

// 3. Carga el pie de página del tema
getFooter();
?>
```

## 4\. El Directorio `layouts`

Este directorio no es estrictamente obligatorio, pero es una convención muy recomendada para almacenar partes de plantillas reutilizables. Las funciones `getHeader()` y `getFooter()` buscarán los archivos `header.php` y `footer.php` aquí.

### `layouts/header.php`

Contiene todo el HTML desde el `<!DOCTYPE html>` hasta el inicio del contenido principal. Es crucial que este archivo contenga la llamada a `sw_head()`.

-   **`sw_head()`**: Esta función, análoga al `wp_head()` de WordPress, es un hook esencial. Permite al núcleo y a los plugins inyectar los CSS encolados, meta etiquetas y otros elementos necesarios en la sección `<head>` de tu sitio. **Tu tema no funcionará correctamente sin esta llamada.**

<!-- end list -->

```php
<?php // /swordContent/themes/default-theme-two/layouts/header.php ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($titulo ?? 'SwordPHP'); ?></title>
    <?php
    sw_head(); // ¡Llamada crucial!
    ?>
</head>
<body>
```

### `layouts/footer.php`

Contiene el cierre de las etiquetas HTML y, de forma muy importante, la llamada a `sw_footer()`.

-   **`sw_footer()`**: Análogo al `wp_footer()` de WordPress, este hook permite inyectar los scripts de JavaScript encolados justo antes de la etiqueta de cierre `</body>`. Es vital para el funcionamiento de los plugins y los scripts de tu tema.

<!-- end list -->

```php
<?php // /swordContent/themes/default-theme-two/layouts/footer.php ?>

<?php
sw_footer(); // ¡Llamada crucial!
hacerAccion('pieDePagina'); // Hook adicional para contenido en el footer.
?>
</body>
</html>
```

Con estos archivos, tienes una base sólida y funcional para empezar a construir cualquier tipo de sitio web con SwordPHP.

