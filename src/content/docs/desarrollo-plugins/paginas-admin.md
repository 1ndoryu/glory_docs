---
title: Páginas de Administración
description: Aprende cómo añadir elementos al menú del panel y crear tus propias páginas de ajustes para tu plugin.
---

# Páginas de Administración

Una de las funcionalidades más comunes de un plugin es añadir su propia página de ajustes o de gestión dentro del panel de administración de SwordPHP. El proceso se divide en dos pasos principales:

1.  Añadir un enlace al menú lateral del panel.
2.  Registrar la página y la función que renderizará su contenido.

## 1. Añadir un Enlace al Menú

Para añadir un nuevo elemento al menú lateral del panel, usamos el filtro `menuLateralAdmin`. Este filtro nos pasa un array con todos los elementos del menú existentes, y nuestra función debe devolver ese mismo array con nuestro nuevo elemento añadido.

```php
<?php
// En tu plugin

addFilter('menuLateralAdmin', 'miPlugin_agregarMenuAdmin');

function miPlugin_agregarMenuAdmin($menuItems)
{
    // Añadimos nuestro enlace al array.
    // La clave ('plugin_ejemplo_settings') debe ser única.
    $menuItems['plugin_ejemplo_settings'] = [
        // La URL debe apuntar a /panel/ajustes/{slug-de-tu-pagina}
        'url' => '/panel/ajustes/plugin-ejemplo',
        'text' => 'Ajustes del Plugin',
    ];

    // Es crucial devolver el array modificado.
    return $menuItems;
}
```

## 2\. Registrar la Página de Ajustes

Una vez que tenemos el enlace, debemos registrar la página para que SwordPHP sepa qué contenido mostrar cuando un usuario visite esa URL. Para esto, usamos la función `addPageAdmin`.

Esta función debe ser llamada directamente en el archivo principal de tu plugin, no dentro de un hook.

```php
<?php
// En tu plugin, fuera de cualquier otra función

addPageAdmin(
    'plugin-ejemplo', // 1. El slug debe coincidir con el de la URL.
    [
        'page_title' => 'Ajustes del Plugin Ejemplo', // 2. El título que se mostrará en la página.
        'callback'   => 'miPlugin_renderizarPagina',  // 3. La función que generará el HTML.
    ]
);
```

## 3\. Crear la Función de Callback

El último paso es crear la función que especificamos como `callback`. Esta función es la responsable de generar y **devolver** todo el HTML de tu página de ajustes.

```php
<?php

/**
 * Función que se encarga de renderizar el HTML de la página de ajustes.
 *
 * @return string El HTML de la página.
 */
function miPlugin_renderizarPagina()
{
    // Aquí iría toda la lógica de tu página:
    // - Comprobar si se ha enviado un formulario.
    // - Guardar o leer opciones.
    // - Generar el HTML.

    $html = '<h1>Configuración de Mi Plugin</h1>';
    $html .= '<p>Desde aquí puedes configurar las opciones.</p>';
    $html .= '<form method="POST">';
    // ... campos del formulario ...
    $html .= '<button type="submit">Guardar Cambios</button>';
    $html .= '</form>';

    return $html;
}
```

Cuando un usuario visite `/panel/ajustes/plugin-ejemplo`, SwordPHP ejecutará `miPlugin_renderizarPagina` y mostrará el HTML devuelto dentro del layout del panel de administración.

> **Referencia Técnica:** Las funciones para crear páginas de plugin son `addPageAdmin` (definida en `swordCore/app/helpers/plugin.php`) y son gestionadas por `PluginPageService` y `PluginPageController`.

