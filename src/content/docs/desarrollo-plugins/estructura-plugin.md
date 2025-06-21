---
title: Estructura de un Plugin
description: Aprende cómo estructurar los archivos de tu plugin y qué información necesitas en la cabecera para que SwordPHP lo reconozca.
---

# Estructura de un Plugin

Los plugins son la forma principal de extender y añadir funcionalidades a SwordPHP sin modificar el código del núcleo. Un plugin puede ser tan simple como un único archivo PHP o tan complejo como una estructura de directorios con sus propios assets y lógica.

## Ubicación y Archivo Principal

El sistema de SwordPHP busca los plugins dentro del directorio `swordContent/plugins/`. Cada plugin debe residir en su propia carpeta. El nombre de esta carpeta actúa como el "slug" del plugin (un identificador único).

Dentro de la carpeta del plugin, debe existir un archivo PHP principal. Por convención, este archivo suele llevar el mismo nombre que el slug, pero con la primera letra en mayúscula. Por ejemplo, para un plugin con el slug `mi-plugin-genial`, el archivo principal sería `swordContent/plugins/mi-plugin-genial/MiPluginGenial.php`.

SwordPHP es flexible y buscará cualquier archivo `.php` en la raíz del directorio del plugin que contenga una cabecera válida.

## La Cabecera del Plugin

Para que SwordPHP reconozca tu archivo como un plugin válido, este debe contener un bloque de comentario PHP al principio, conocido como la "cabecera del plugin". Esta cabecera contiene los metadatos del plugin.

Aquí tienes un ejemplo de una cabecera completa, basada en el `pluginEjemplo`:

```php
<?php

/**
 * Plugin Name: Plugin de Ejemplo
 * Plugin URI: [https://swordphp.com/](https://swordphp.com/)
 * Description: Un plugin de ejemplo para demostrar las capacidades del sistema.
 * Version: 1.1
 * Author: SwordPHP Team
 * Author URI: [https://swordphp.com/](https://swordphp.com/)
 */

// El código de tu plugin empieza aquí...
````

### Campos de la Cabecera

  - **`Plugin Name` (Requerido):** El nombre de tu plugin. Se mostrará en el panel de administración.
  - **`Plugin URI`:** La URL de la página de inicio del plugin.
  - **`Description`:** Una breve descripción de lo que hace el plugin. Se muestra en la lista de plugins.
  - **`Version`:** La versión actual del plugin (ej. `1.0.0`).
  - **`Author`:** El nombre del autor del plugin.
  - **`Author URI`:** La URL del sitio web del autor.

El único campo estrictamente necesario es `Plugin Name`. Sin él, el plugin no aparecerá en la lista de plugins del panel de administración.

> **Referencia Técnica:** El descubrimiento y análisis de los plugins es gestionado por la clase `swordCore/app/service/PluginService.php`.
