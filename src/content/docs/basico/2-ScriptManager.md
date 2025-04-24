---
title: 2. ScriptManager
description: Aprende a registrar y encolar scripts JavaScript de forma organizada con ScriptManager.
---

`ScriptManager` simplifica la carga de archivos JavaScript (`.js`) en tu tema o plugin de WordPress. Permite definir tus scripts de forma centralizada, controlar sus dependencias, versiones y si deben cargarse en el pie de página, además de facilitar el refresco de caché durante el desarrollo.

## Configuración Global (Opcional)

Antes de definir scripts, puedes establecer configuraciones globales:

```php
<?php
// En functions.php o archivo principal del plugin
use App\Glory\ScriptManager; // Asegúrate del namespace

// Activar modo desarrollo (útil para evitar caché)
ScriptManager::setGlobalDevMode(true); // O false para producción

// Establecer versión global del tema (se usará si no defines una específica)
ScriptManager::setThemeVersion('1.2.3');
```

-   **`setGlobalDevMode(bool $enabled)`:**
    -   `true`: Activa el modo desarrollo global. Añade un parámetro único a la URL de cada script para evitar la caché del navegador. Ideal para desarrollo.
    -   `false`: Desactiva el modo desarrollo global. Usa la versión definida (o la global). Recomendado para producción.
-   **`setThemeVersion(string $version)`:** Define una versión por defecto para los scripts que no especifiquen una propia.

## Cómo Usar

### 1. Definir Scripts Individuales

Usa `ScriptManager::define()` para registrar cada script que necesites.

```php
<?php
use App\Glory\ScriptManager;

// Script principal con dependencias jQuery, versión específica y en el footer
ScriptManager::define(
    'app-main',          // Handle único y nombre base del archivo (sin .js)
    'js/dist/app.js',    // Ruta relativa a la raíz del tema
    ['jquery'],          // Dependencias (handles de otros scripts)
    '1.1.0',             // Versión específica
    true,                // Cargar en el footer (true) o header (false)
    null                 // Modo desarrollo (null = usar global, true = forzar, false = desactivar)
);

// Script simple, usando valores por defecto
ScriptManager::define('utils');
// -> Path: js/utils.js (generado desde el handle)
// -> Deps: [] (sin dependencias)
// -> Version: Global (la establecida con setThemeVersion o '1.0.0')
// -> Footer: true (por defecto)
// -> DevMode: Global (el establecido con setGlobalDevMode)

// Script que siempre debe usar versión fija (ignora modo desarrollo global)
ScriptManager::define('analytics', 'js/tracking.js', [], '1.0.0', true, false);
```

**Parámetros de `define()`:**

-   `$handle` (string, obligatorio): Identificador único en WordPress y nombre base del archivo (sin `.js`) si `$path` es `null`.
-   `$path` (string, opcional): Ruta relativa al archivo `.js` desde la raíz del tema (ej. `js/mi-script.js`). Si es `null`, se asume `js/{$handle}.js`.
-   `$deps` (array, opcional): Array de handles de otros scripts de los que depende. Default: `[]`.
-   `$version` (string, opcional): Versión del script. Si es `null`, usa la versión global definida con `setThemeVersion`.
-   `$in_footer` (bool, opcional): `true` para cargar en el footer, `false` para cargar en el `<head>`. Default: `true`.
-   `$devMode` (bool|null, opcional): Control específico del modo desarrollo para este script:
    -   `true`: Siempre añade el parámetro anti-caché.
    -   `false`: Nunca añade el parámetro anti-caché.
    -   `null`: Usa la configuración global de `setGlobalDevMode`.

### 2. Definir Scripts de una Carpeta (Opcional)

Usa `ScriptManager::defineFolder()` para registrar automáticamente todos los archivos `.js` que se encuentren directamente dentro de una carpeta específica.

```php
<?php
use App\Glory\ScriptManager;

// Registrar todos los scripts en la carpeta 'js/vendor'
ScriptManager::defineFolder(
    'js/vendor',      // Ruta relativa a la carpeta desde la raíz del tema
    ['jquery'],       // Dependencias por defecto para estos scripts
    true,             // Cargar en el footer por defecto
    false,            // Desactivar modo desarrollo para esta carpeta (a menos que un script se defina individualmente)
    'vendor-'         // Prefijo opcional para los handles (ej. 'vendor-slider.js')
);
// Si existe 'js/vendor/slider.js', se registrará con handle 'vendor-slider'
// Si existe 'js/vendor/modal.js', se registrará con handle 'vendor-modal'
```

**Parámetros de `defineFolder()`:**

-   `$folderRelPath` (string, opcional): Ruta relativa a la carpeta. Default: `'js'`.
-   `$defaultDeps` (array, opcional): Dependencias por defecto para los scripts de esta carpeta.
-   `$defaultInFooter` (bool, opcional): Ubicación por defecto (footer/header).
-   `$folderDevMode` (bool|null, opcional): Modo desarrollo por defecto para esta carpeta.
-   `$handlePrefix` (string, opcional): Prefijo a añadir al nombre de archivo para crear el handle.

**Importante:** `defineFolder()` **no** sobrescribirá un script si ya fue definido previamente con `ScriptManager::define()`. El que se define primero tiene prioridad.

### 3. Registrar el Gestor

Después de definir todos tus scripts (con `define` y/o `defineFolder`), necesitas registrar el gestor para que WordPress los ponga en cola.

```php
<?php
// Después de todas las llamadas a ScriptManager::define() y ScriptManager::defineFolder()
use App\Glory\ScriptManager;

ScriptManager::register();
```

Coloca esta llamada (y las definiciones) en un lugar que se ejecute en cada carga de página, como el archivo `functions.php` de tu tema o el archivo principal de tu plugin.

## Funcionamiento Interno

-   **Encolado:** `ScriptManager::register()` añade una acción al hook `wp_enqueue_scripts` (con prioridad 20). Cuando WordPress ejecuta este hook, llama a la función interna `enqueueScripts`.
-   **Procesamiento:** `enqueueScripts` recorre todos los scripts definidos. Para cada uno:
    1.  Determina si debe aplicar el modo desarrollo (según la configuración específica o global).
    2.  Determina la versión del script (específica o global).
    3.  Si el modo desarrollo está activo, añade un parámetro único a la URL (`?ver=...`) para forzar al navegador a descargar la última versión.
    4.  Construye la URL completa al archivo `.js`.
    5.  Verifica que el archivo `.js` existe en la ruta especificada. Si no existe (y el modo desarrollo está activo), muestra un `error_log`.
    6.  Si el archivo existe, llama a `wp_enqueue_script()` con el handle, URL, dependencias, versión final y ubicación (footer/head).

## Consideraciones

-   **Orden de Llamada:** Asegúrate de llamar a `ScriptManager::register()` *después* de haber definido todos tus scripts con `define()` o `defineFolder()`.
-   **Modo Desarrollo:** Activa `setGlobalDevMode(true)` mientras desarrollas para evitar problemas de caché con tus archivos JS. Desactívalo en producción para aprovechar la caché del navegador.
-   **Rutas de Archivo:** Las rutas (`$path` en `define`, `$folderRelPath` en `defineFolder`) son relativas a la carpeta raíz de tu **tema padre** (`get_template_directory()`).
-   **Conflictos de Handle:** Elige handles únicos. Evita usar handles comunes de WordPress (como `jquery`, `wp-util`) o de otros plugins si no es tu intención reemplazarlos o interactuar con ellos explícitamente mediante las dependencias. Usar prefijos (`vendor-`, `plugin-`) puede ayudar.
