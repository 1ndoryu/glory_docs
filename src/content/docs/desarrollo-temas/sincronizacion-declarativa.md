---
title: Sincronización Declarativa de Contenido
description: Define en tu tema todas las páginas y contenidos necesarios para que funcione "out-of-the-box", replicando la experiencia de un demo.
---

# Sincronización Declarativa de Contenido

La Sincronización Declarativa de Contenido es una característica fundamental para los **desarrolladores de temas**. Su objetivo principal es permitir que un tema instale y configure automáticamente todas las páginas y contenidos que necesita para replicar su diseño o "demo" por defecto, asegurando que el usuario final tenga una experiencia completa desde el momento de la activación.

Olvida la necesidad de que los usuarios creen manualmente páginas como "Inicio", "Sobre Nosotros", "Servicios" o "Contacto". Con este sistema, puedes declarar todo ese contenido en el código de tu tema, y SwordPHP se encargará de que exista en la base de datos.

## ¿Cómo Funciona?

El sistema se basa en dos componentes: los **helpers de definición**, que usas en tu código, y el **motor de sincronización**, que se ejecuta en el panel de administración.

### 1. Helpers de Definición

Para definir el contenido, utilizas funciones auxiliares (helpers) directamente en el archivo `functions.php` de tu tema.

#### `swDefinirPagina`

Esta es la función más común, un atajo para crear entradas del tipo de contenido 'página'.

```php
<?php
// /swordContent/themes/mi-tema/functions.php

// Define la página de "Inicio", la establece como la página principal del sitio
// y le asigna una plantilla personalizada.
swDefinirPagina('def-pagina-inicio', [
    'titulo'    => 'Bienvenido a Nuestro Sitio Web',
    'slug'      => 'inicio',
    'contenido' => '<h1>Construyendo el futuro</h1><p>Este es el contenido de nuestra página principal...</p>',
    'plantilla' => 'plantillaAnchoCompleto.php', // Asigna la plantilla.
    'es_inicio' => true, // ¡NUEVO! Establece esta página como la página de inicio por defecto.
]);

// Define la página "Sobre Nosotros"
swDefinirPagina('def-pagina-nosotros', [
    'titulo'    => 'Sobre Nosotros',
    'slug'      => 'sobre-nosotros',
    'contenido' => '<p>Conoce la historia y el equipo detrás de nuestra empresa.</p>',
]);
````

  - **`$slugDefinicion` (string):** Un identificador único y permanente para esta *definición*. No es la URL. Piensa en él como un ID de referencia interno que no debe cambiar.
  - **`$argumentos` (array):** Un array con los datos:
      - `titulo` (string, obligatorio): El título.
      - `slug` (string, opcional): La URL amigable. Si se omite, se genera a partir del título.
      - `contenido` (string, opcional): El contenido HTML.
      - `plantilla` (string, opcional): El nombre del archivo de una [plantilla de página](https://www.google.com/search?q=/desarrollo-temas/plantillas-pagina) personalizada.
      - `estado` (string, opcional): `'publicado'` o `'borrador'`. Por defecto es `'publicado'`.
      - `es_inicio` (bool, opcional): Si se establece en `true`, el sistema intentará configurar esta página como la página de inicio del sitio. Esto solo ocurrirá si no hay una página de inicio ya configurada o si la página de inicio configurada previamente fue eliminada (por ejemplo, al quitar su definición del código). Esto asegura que el tema pueda establecer un valor por defecto sin sobreescribir la elección manual de un usuario. Por defecto es `false`.

#### `swDefinirContenido`: Para Tipos de Contenido Personalizado

Si tu tema registra [Tipos de Contenido Personalizado](https://www.google.com/search?q=/desarrollo-plugins/tipos-de-contenido) (por ejemplo, 'proyectos', 'miembros-equipo', 'servicios'), usarás esta función más genérica para poblarlos.

`swDefinirPagina` es, de hecho, un simple atajo de `swDefinirContenido('pagina', ...)`.

```php
<?php
// /swordContent/themes/mi-tema/functions.php

// Asumiendo que previamente has registrado un tipo de contenido 'proyecto'
// definePostType('proyecto', [...]);

// Ahora, definimos una entrada para ese tipo de contenido.
swDefinirContenido('proyecto', 'def-proyecto-alpha', [
    'titulo'    => 'Proyecto Alpha: Rediseño Corporativo',
    'slug'      => 'proyecto-alpha',
    'contenido' => '<p>Descripción detallada del primer proyecto destacado de nuestro portafolio.</p>',
]);

swDefinirContenido('proyecto', 'def-proyecto-beta', [
    'titulo'    => 'Proyecto Beta: Aplicación Móvil',
    'slug'      => 'proyecto-beta',
    'contenido' => '<p>Desarrollo de una innovadora aplicación para el sector financiero.</p>',
]);
```

Los parámetros son casi idénticos a los de `swDefinirPagina`, con una adición clave:

  - **`$tipo` (string):** El slug del tipo de contenido al que pertenece esta entrada (ej. `'proyecto'`).
  - **`$slugDefinicion` (string):** El identificador único para la definición.
  - **`$argumentos` (array):** El array con los datos (`titulo`, `slug`, `contenido`, etc.).

### 2\. El Motor de Sincronización

El `ManagedContentService` es el servicio del núcleo que se encarga de todo. Su lógica se activa automáticamente cada vez que se carga el panel de administración a través del hook `swInitAdmin`.

El proceso de sincronización sigue estos pasos:

1.  **Recopilación:** Reúne todas las definiciones registradas con `swDefinirPagina` y `swDefinirContenido`.
2.  **Consulta:** Busca en la base de datos todas las entradas que fueron creadas por este sistema (identificadas por un metadato interno `_managed_source_slug`).
3.  **Reconciliación:**
      - **Crear:** Si un contenido está definido en el código pero no existe en la BD, lo crea.
      - **Borrar:** Si un contenido existe en la BD como "gestionado" pero ya no está definido en el código, lo elimina.
4.  **Ajuste de Página de Inicio:** Después de reconciliar, comprueba si debe asignar una página de inicio por defecto según las definiciones.

Este ciclo asegura que el estado de la base de datos siempre refleje las definiciones del código de tu tema.

## Restaurar Contenido a su Estado por Defecto

Si un administrador modifica una página gestionada y quiere volver al contenido original del tema, puede hacerlo con un solo clic. En la pantalla de edición de una página gestionada, aparecerá un botón **"Restaurar por Defecto"**.

Al hacer clic, el sistema:

1.  Busca la definición original de esa página en el `ManagedContentService`.
2.  Sobrescribe el título, contenido y plantilla en la base de datos con los valores de la definición.
3.  Guarda los cambios, restaurando la página al estado exacto que diseñaste en tu tema.

> **Referencia Técnica:** La lógica de restauración se encuentra en el `PaginaController`, la sincronización en `ManagedContentService`, y los helpers en `swordCore/app/helpers/managedContent.php`.


