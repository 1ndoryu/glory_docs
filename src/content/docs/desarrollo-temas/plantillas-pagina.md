---
title: Plantillas de Página
description: Aprende a crear plantillas de página personalizadas para dar diseños únicos a páginas específicas en tu sitio SwordPHP.
---

# Plantillas de Página (Templates)

Por defecto, SwordPHP utiliza el archivo `pagina.php` de tu tema para mostrar todas las páginas estáticas. Sin embargo, a menudo necesitarás un diseño diferente para ciertas páginas, como una página de "Ancho Completo" sin barra lateral, una página de contacto con un mapa, o una página de aterrizaje especial.

SwordPHP te permite crear **Plantillas de Página** personalizadas que los administradores del sitio pueden seleccionar desde el panel de edición de una página.

## Creando una Plantilla de Página

Crear una plantilla es tan sencillo como añadir un comentario especial en la cabecera de un archivo PHP dentro del directorio de tu tema.

1.  **Crea un nuevo archivo PHP** en la raíz de tu tema. Por ejemplo, `plantilla-ancho-completo.php`.
2.  **Añade el comentario `Template Name`** al principio del archivo. Este es el nombre que aparecerá en el desplegable de selección de plantillas en el panel de administración.

```php
<?php
/*
Template Name: Ancho Completo
*/

// El resto de tu código de plantilla va aquí...

// 1. Inicia el loop de SwordPHP.
if (hayEntradas()) :
    while (hayEntradas()) :
        laEntrada();
        $titulo = obtenerElTitulo();
        getHeader();
?>

    <main style="max-width: 1200px; margin: 0 auto;">
        <h1><?php elTitulo(); ?></h1>
        <div>
            <?php elContenido(); ?>
        </div>
        <hr>
        <p>✅ Vista cargada desde la plantilla "Ancho Completo".</p>
    </main>

<?php
    endwhile;
endif;

getFooter();
?>
```


## ¿Cómo Funciona?

Cuando el panel de administración de páginas se carga, el `TemaService` de SwordPHP escanea todos los archivos `.php` en la raíz del directorio del tema activo. Busca archivos que contengan la cabecera `/* Template Name: ... */`.

Si encuentra alguno, los añade a una lista que se presenta en un menú desplegable en la sección "Atributos de la Página" al editar una página.

Cuando un usuario guarda una página con una plantilla seleccionada, SwordPHP almacena el nombre del archivo de la plantilla (ej. `plantilla-ancho-completo.php`) en los metadatos de esa página. Al visitar la URL de esa página, el sistema detecta que tiene una plantilla personalizada asignada y carga ese archivo en lugar del `pagina.php` por defecto.

> **Referencia Técnica:** La detección de plantillas es gestionada por el método `obtenerPlantillasDePagina()` en la clase `swordCore/app/service/TemaService.php`.




