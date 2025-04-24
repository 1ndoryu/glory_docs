---
title: PageManager - Gestionar Páginas desde Código
description: Aprende a crear y gestionar páginas de WordPress programáticamente con PageManager.
---

El componente `PageManager` te permite definir las páginas esenciales de tu sitio directamente en el código. Esto es útil para asegurar que páginas clave (como 'Inicio', 'Contacto', 'Política de Privacidad') existan siempre, tengan la plantilla correcta y se puedan gestionar de forma centralizada, sin necesidad de crearlas manualmente en el panel de administración de WordPress.

## Cómo Usar

### 1. Definir Páginas

Usa el método estático `PageManager::define()` para declarar cada página que quieres gestionar.

```php
<?php
// En functions.php de tu tema o en tu plugin principal

use App\Glory\PageManager; // Asegúrate de usar el namespace correcto

// Página de Inicio (slug 'home' es especial)
PageManager::define('home', 'Página Principal', 'template-home.php');

// Página de Contacto (Título y plantilla autogenerados si son null)
PageManager::define('contacto'); 
// -> Título será 'Contacto'
// -> Plantilla será 'TemplateContacto.php'

// Página "Acerca de" con título y plantilla específicos
PageManager::define('acerca-de', 'Sobre Nosotros', 'template-about.php');
```

**Parámetros de define():**

- `$slug` (string, obligatorio): El slug de la URL para la página (ej. contacto).
- `$title` (string, opcional): El título de la página. Si es null, se genera a partir del slug (ej. contacto -> Contacto).
- `$template` (string, opcional): El nombre del archivo de plantilla (ej. template-contact.php). Si es null, se genera a partir del slug (ej. contacto -> TemplateContacto.php).

### 2. Registrar el Gestor

Después de definir todas tus páginas, necesitas registrar el PageManager para que se ejecute y procese tus definiciones. Esto se hace típicamente una vez.

```php
<?php
// Después de todas las llamadas a PageManager::define()

use App\Glory\PageManager;

PageManager::register();
```

Coloca las llamadas a `define()` y `register()` en un lugar que se ejecute pronto en la carga de WordPress, como el archivo `functions.php` de tu tema o el archivo principal de tu plugin.

**Funcionamiento**

- **Creación/Actualización**: Cuando `PageManager::register()` se ejecuta (en el hook `init`), revisa cada página definida:
  - Si una página con ese slug no existe, la crea con el título y plantilla especificados.
  - Si la página existe, se asegura de que tenga asignada la plantilla correcta. Nota: No actualiza el título ni el contenido de páginas existentes para evitar sobrescribir cambios manuales.
  - Marca la página con un meta campo `_page_manager_managed` para identificarla.

- **Página de Inicio**: Si defines una página con el slug `home`, PageManager la configurará automáticamente como la página de inicio estática de WordPress en Ajustes > Lectura.

- **Limpieza Automática**: PageManager también comprueba si existen páginas en la base de datos marcadas como gestionadas (`_page_manager_managed`) pero que ya no están definidas en tu código. Si encuentra alguna, la eliminará permanentemente para mantener sincronizado el código con la base de datos. ¡Ten cuidado al eliminar definiciones!

**Consideraciones**

- **Nombres de Plantilla**: Asegúrate de que los nombres de archivo de plantilla (ej. `TemplateContacto.php`) existan en tu tema.
- **Eliminación**: ¡Importante! Si eliminas una llamada a `PageManager::define()` para una página que ya fue creada, PageManager eliminará esa página de WordPress la próxima vez que se cargue.
- **Conflictos de Slug**: Asegúrate de que los slugs definidos no entren en conflicto con otras páginas o tipos de contenido existentes que no quieras que gestione esta clase.
  
