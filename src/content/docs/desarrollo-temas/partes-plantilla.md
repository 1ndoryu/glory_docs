---
title: Partes de Plantilla (Header y Footer)
description: Utiliza getHeader() y getFooter() para modularizar tu tema y entiende la importancia de los hooks sw_head() y sw_footer().
---

# Partes de Plantilla: Header y Footer

Para evitar la repetición de código y mantener tus plantillas limpias y organizadas, SwordPHP utiliza un sistema de partes de plantilla, siendo `header.php` y `footer.php` las más importantes.

Estas funciones te permiten tener un único archivo para la cabecera y el pie de página de tu sitio, y luego incluirlos fácilmente en todas tus plantillas (`pagina.php`, `plantilla-ancho-completo.php`, etc.).

## `getHeader()` y `getFooter()`

Estas dos funciones son las encargadas de buscar e incluir los archivos correspondientes del tema.

* **`getHeader()`**: Busca el archivo `header.php` dentro de la carpeta `layouts` de tu tema y lo incluye.
* **`getFooter()`**: Busca el archivo `footer.php` dentro de la carpeta `layouts` de tu tema y lo incluye.

**Uso en una plantilla:**
```php
<?php
// Carga /layouts/header.php
getHeader(); 

?>

<h1>Mi Página</h1>

<?php

// Carga /layouts/footer.php
getFooter(); 
?>
````

## Los Hooks Esenciales: `sw_head()` y `sw_footer()`

Dentro de tus archivos `header.php` y `footer.php`, es **absolutamente crucial** que incluyas dos hooks específicos. Sin ellos, el núcleo del CMS y los plugins no podrán añadir sus estilos, scripts y meta etiquetas, y tu sitio no funcionará correctamente.

### `sw_head()`

Este hook, análogo al `wp_head()` de WordPress, debe colocarse justo antes de la etiqueta de cierre `</head>` en tu archivo `header.php`.

**Función:**

  * Imprime todas las hojas de estilo (`<link rel="stylesheet">`) encoladas por el tema o los plugins.
  * Permite a los plugins añadir meta etiquetas, scripts de seguimiento, y otro contenido necesario en la cabecera del documento.

**Ejemplo de `layouts/header.php`:**

```php
<?php // /swordContent/themes/default-theme-two/layouts/header.php ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title><?php echo htmlspecialchars($titulo ?? 'SwordPHP'); ?></title>
    
    <?php
    // ¡Llamada crucial! No la olvides.
    sw_head(); 
    ?>
</head>
<body>
    <header>
        </header>
```

### `sw_footer()`

Este hook, análogo al `wp_footer()` de WordPress, debe colocarse justo antes de la etiqueta de cierre `</body>` en tu archivo `footer.php`.

**Función:**

  * Imprime todos los archivos JavaScript (`<script src="...">`) encolados por el tema o los plugins. Esto mejora el rendimiento, ya que los scripts se cargan al final.
  * Imprime cualquier variable de PHP pasada a JavaScript (`wp_localize_script`).
  * Permite a los plugins añadir HTML o scripts al final de la página (ej. banners, modales, etc.).

**Ejemplo de `layouts/footer.php`:**

```php
    <footer>
        </footer>

    <?php
    // ¡Llamada crucial! No la olvides.
    sw_footer(); 
    
    // También es un buen lugar para hooks personalizados
    hacerAccion('pieDePagina');
    ?>
</body>
</html>
```

> **Referencia Técnica:** Estas funciones se definen en `swordCore/app/helpers/view.php` y `swordCore/app/helpers/theming.php`. El directorio recomendado para estas partes de plantilla es `/layouts/`.

```
