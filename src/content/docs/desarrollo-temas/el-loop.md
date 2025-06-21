---
title: El Loop de SwordPHP
description: Domina el "Loop", la mecánica principal de SwordPHP para consultar y mostrar contenido dinámico en tus temas.
---

# El Loop de SwordPHP

El "Loop" (o bucle) es el corazón de la visualización de contenido en SwordPHP. Es el mecanismo estándar que utiliza el sistema para procesar y mostrar cada una de las entradas (páginas, artículos, etc.) solicitadas en una URL específica. Si has trabajado con WordPress, el concepto te resultará muy familiar.

El Loop se encarga de preparar los datos globales de cada entrada, permitiéndote usar funciones simples como `theTitle()` o `theContent()` para imprimir la información correspondiente sin necesidad de pasar variables manualmente.

## Cómo Funciona el Loop

El Loop estándar se construye con una estructura `if/while` y se apoya en tres funciones clave:

1.  **`havePost()`**: Comprueba si la consulta actual ha devuelto alguna entrada. Devuelve `true` si hay entradas, `false` si no.
2.  **`thePost()`**: Itera sobre el conjunto de resultados y prepara la siguiente entrada para ser mostrada, configurando los datos globales necesarios.
3.  **Funciones de Plantilla**: Dentro del `while`, puedes usar una serie de funciones (conocidas como *template tags*) para mostrar los datos de la entrada actual.

## Ejemplo Básico

Este es el esqueleto de un Loop de SwordPHP, tal como lo encontrarías en un archivo de plantilla como `pagina.php`:

```php
<?php
// /swordContent/themes/themeDefault/pagina.php

// 1. Carga la cabecera del tema
getHeader();

// 2. Comprueba si hay entradas que mostrar
if (havePost()) :
    // 3. Si hay, itera sobre cada una de ellas
    while (havePost()) :
        // 4. Prepara los datos de la entrada actual
        thePost(); 
?>

    <article>
        <h1><a href="<?php getPermalink(); ?>"><?php theTitle(); ?></a></h1>
        <div>
            <?php theContent(); ?>
        </div>
    </article>

<?php
    endwhile; // Fin del bucle while
else :
    // Opcional: Muestra un mensaje si no se encontraron entradas
?>
    <p>Lo sentimos, no se encontró contenido.</p>
<?php
endif; // Fin de la comprobación if

// 6. Carga el pie de página
getFooter();
?>
````

## Funciones de Plantilla Principales

Dentro del Loop, tienes acceso a un conjunto de helpers que te facilitan la vida. Estas son las más comunes:

  * `theTitle()`: Muestra el título de la entrada actual.
  * `theContent()`: Muestra el contenido principal de la entrada.
  * `getPermalink()`: Muestra la URL completa de la entrada actual.
  * `getTitle()`: Devuelve el título como una cadena de texto en lugar de imprimirlo.
  * `getContent()`: Devuelve el contenido como una cadena de texto.
  * `getPermalink()`: Devuelve la URL como una cadena de texto.
  * `postId()`: Muestra el ID de la entrada actual.
  * `getPostId()`: Devuelve el ID de la entrada actual.

> **Referencia Técnica:** La lógica del Loop y sus funciones auxiliares se encuentran en `swordCore/app/helpers/theming.php` y son gestionadas por la clase `swordCore/app/service/SwordQuery.php`.


