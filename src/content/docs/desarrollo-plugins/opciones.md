---
title: Opciones de Plugin
description: Aprende a guardar, leer y eliminar ajustes de tu plugin en la base de datos de forma segura y estandarizada.
---

# Guardar y Leer Opciones de Plugin

La mayoría de los plugins necesitan guardar ajustes o datos en la base de datos. SwordPHP proporciona una API de Opciones sencilla y segura para este propósito, que funciona de manera similar a la API de Opciones de WordPress.

Este sistema evita que tengas que escribir consultas SQL directas y previene colisiones de nombres entre diferentes plugins.

## Funciones Principales

Las funciones de opciones para plugins añaden automáticamente un prefijo a la clave que guardas en la base de datos, usando el slug de tu plugin. Por ejemplo, si tu plugin con slug `mi-plugin` guarda una opción llamada `color_fondo`, en la base de datos se almacenará como `plugin_mi-plugin_color_fondo`.

### `updateOptionPlugin(slug, nombre, valor)`

Guarda o actualiza el valor de una opción en la base de datos.

-   `$slugPlugin` (string): El slug de tu plugin (el nombre de su carpeta).
-   `$nombreOpcion` (string): El nombre de la opción que quieres guardar.
-   `$valor` (mixed): El valor a guardar. Puede ser un string, número, array u objeto (será serializado automáticamente).

### `getOptionPlugin(slug, nombre, porDefecto)`

Recupera el valor de una opción de la base de datos.

-   `$slugPlugin` (string): El slug de tu plugin.
-   `$nombreOpcion` (string): El nombre de la opción que quieres leer.
-   `$valorPorDefecto` (mixed, opcional): El valor que se devolverá si la opción no existe en la base de datos. Por defecto es `null`.

## Renderizar Formularios de Ajustes

Para estandarizar la apariencia de las páginas de ajustes, SwordPHP incluye un potente helper que renderiza un formulario completo con sus campos.

### `renderFormPluginPanel(args)`

Esta función recibe un array con la configuración del formulario y devuelve todo el HTML necesario.

**Ejemplo de uso en la función de callback de tu página de ajustes:**

```php
function miPlugin_renderizarPagina()
{
    $slugPlugin = 'plugin-ejemplo';
    $mensajeExito = '';

    // Si el formulario ha sido enviado, guardamos el dato.
    if (request()->method() === 'POST') {
        $valorTexto = request()->post('texto_banner', '');
        updateOptionPlugin($slugPlugin, 'texto_banner', $valorTexto);
        $mensajeExito = 'Ajustes guardados correctamente.';
    }

    // Obtenemos el valor actual para mostrarlo en el campo.
    $valorActual = getOptionPlugin($slugPlugin, 'texto_banner', 'Valor por defecto');

    // Definimos los campos para el formulario.
    $campos = [
        [
            'tipo' => 'text',
            'name' => 'texto_banner',
            'label' => 'Texto del Banner',
            'value' => $valorActual,
            'placeholder' => 'Introduce un texto...',
            'descripcion' => 'Este texto se mostrará en el banner del pie de página.'
        ],
        // ... puedes añadir más campos (checkbox, select, textarea, etc.)
    ];

    // Renderizamos el formulario completo usando el helper.
    return renderFormPluginPanel([
        'campos' => $campos,
        'mensajeExito' => $mensajeExito,
        'descripcionFormulario' => 'Desde aquí puedes configurar las opciones del plugin de ejemplo.',
        'textoBoton' => 'Guardar Todos los Ajustes'
    ]);
}
```

Este helper se encarga de añadir el contenedor, el mensaje de éxito, la etiqueta `<form>`, el campo CSRF para seguridad, y el botón de envío.

> **Referencia Técnica:** Las funciones de opciones de plugin están en `swordCore/app/helpers/plugin.php`. El renderizador de formularios está en `swordCore/app/helpers/formPlugin.php`.

