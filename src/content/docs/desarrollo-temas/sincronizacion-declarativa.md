---
title: Sincronización Declarativa de Contenido
description: Aprende a definir páginas y contenido directamente en el código de tu tema, permitiendo que SwordPHP los cree y gestione automáticamente.
---

# Sincronización Declarativa de Contenido

La Sincronización Declarativa de Contenido es una potente característica de SwordPHP que permite a los desarrolladores definir páginas, entradas y otros tipos de contenido directamente en el código de un tema o plugin. El sistema se encarga de crear, actualizar y eliminar este contenido en la base de datos para que coincida con las definiciones, garantizando una consistencia automática.

Esta funcionalidad es ideal para:

-   Crear páginas esenciales que todo sitio necesita, como "Política de Privacidad", "Términos de Servicio" o "Contacto".
-   Asegurar que un tema o plugin tenga las páginas necesarias para funcionar correctamente desde su activación.
-   Mantener un estado por defecto para cierto contenido, permitiendo a los usuarios restaurarlo en cualquier momento.

## ¿Cómo Funciona?

El proceso se basa en dos componentes principales: los **helpers de definición** y el **motor de sincronización**.

### 1. Helpers de Definición

Para definir el contenido, utilizas funciones auxiliares (helpers) en el archivo `functions.php` de tu tema o en el archivo principal de tu plugin.

La función principal para esto es `swDefinirPagina()`.

```php
<?php
// /swordContent/themes/themeDefault/functions.php

/**
 * Define una página que el sistema debe crear y mantener.
 *
 * El sistema se asegurará de que una página con el slug 'politica-de-privacidad'
 * siempre exista en la base de datos.
 */
swDefinirPagina('definicion-pagina-privacidad', [
    'titulo'    => 'Política de Privacidad',
    'slug'      => 'politica-de-privacidad', // La URL será /politica-de-privacidad
    'contenido' => '<h2>1. Introducción</h2><p>Este contenido fue generado desde el código del tema y puede ser restaurado en cualquier momento.</p>',
    'plantilla' => 'plantillaAnchoCompleto.php' // Opcional: asigna una plantilla de página.
]);
```

#### Argumentos de `swDefinirPagina(slugDefinicion, argumentos)`

-   `$slugDefinicion` (string): Un identificador único y permanente para esta _definición_. No es la URL. Piensa en él como un ID de referencia interno.
-   `$argumentos` (array): Un array con los datos de la página:
    -   `titulo` (string, obligatorio): El título de la página.
    -   `slug` (string, opcional): La URL amigable. Si se omite, se generará a partir del título.
    -   `contenido` (string, opcional): El contenido HTML de la página.
    -   `plantilla` (string, opcional): El nombre del archivo de una [plantilla de página](https://www.google.com/search?q=/desarrollo-temas/plantillas-pagina) personalizada (ej. `mi-plantilla.php`).
    -   `estado` (string, opcional): `'publicado'` o `'borrador'`. Por defecto es `'publicado'`.

### 2\. El Motor de Sincronización

El `ManagedContentService` es el servicio del núcleo que se encarga de todo el trabajo pesado. Su lógica se activa automáticamente cada vez que se carga el panel de administración a través del hook `swInitAdmin`.

El proceso de sincronización sigue estos pasos:

1.  **Recopilación:** Reúne todas las definiciones de contenido registradas mediante los helpers como `swDefinirPagina`.
2.  **Consulta:** Busca en la base de datos todas las páginas que fueron creadas por este sistema (identificadas por un metadato interno `_managed_source_slug`).
3.  **Reconciliación:**
    -   **Crear:** Si una página está definida en el código pero no existe en la base de datos, la crea.
    -   **Borrar:** Si una página existe en la base de datos como "gestionada" pero ya no está definida en el código, la elimina.

Este ciclo asegura que el estado de la base de datos siempre refleje las definiciones del código.

## Restaurar Contenido a su Estado por Defecto

Una de las mayores ventajas de este sistema es la capacidad de revertir los cambios. Si un administrador modifica el contenido de una página gestionada y más tarde desea volver al contenido original definido en el código, puede hacerlo con un solo clic.

En la pantalla de edición de una página que es gestionada por el sistema, aparecerá un botón "Restaurar por Defecto".

Al hacer clic, el sistema:

1.  Busca la definición original de esa página en el `ManagedContentService`.
2.  Sobrescribe el título, contenido y plantilla de la página en la base de datos con los valores de la definición.
3.  Guarda los cambios, restaurando la página a su estado original.

> **Referencia Técnica:** La lógica de restauración se encuentra en el método `restaurar()` del `PaginaController`, la sincronización en `ManagedContentService`, y los helpers en `swordCore/app/helpers/managedContent.php`.

