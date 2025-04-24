---
title: Navegación AJAX - Carga Rápida de Páginas
description: Mejora la velocidad y la experiencia de usuario cargando contenido de páginas sin recargas completas, con opciones de configuración.
---

La Navegación AJAX intercepta los clics en enlaces internos de tu sitio. En lugar de recargar la página completa, busca el contenido nuevo usando `fetch` y actualiza solo una parte específica de tu página (el área de contenido principal). Esto resulta en transiciones más rápidas y suaves para el usuario.

## Cómo Habilitar y Configurar

Para usar esta funcionalidad, primero debes asegurarte de que el script `ajax-page.js` (ubicado en `TU_TEMA/Glory/js/ajax-page.js` o donde lo hayas puesto) esté encolado correctamente en tu tema o plugin. La configuración se realiza pasando un objeto JavaScript desde PHP usando `wp_localize_script`.

```php
<?php
// /App/Glory/Config/ajaxPageSetup.php

function glory_enqueue_ajax_nav_script() {

    $script_handle = 'glory-ajax-nav';
    $script_rel_path = '/glory/js/ajax-page.js'; // Relative to theme root
    $script_path = get_template_directory() . $script_rel_path;
    $script_url = get_template_directory_uri() . $script_rel_path;

    if (file_exists($script_path)) {
        wp_enqueue_script(
            $script_handle,
            $script_url,
            [], // Dependencias JS (ej. ['jquery'])
            filemtime($script_path), // Versionado automático por fecha de modificación
            true // Cargar en el footer
        );

        // Configuración para pasar al script JS
        $config = [
            'enabled'            => true, // ¡Activa (true) o desactiva (false) globalmente!
            'contentSelector'    => '#content', // Selector CSS del contenedor principal a reemplazar
            'mainScrollSelector' => '#main', // Selector CSS del contenedor que hará scroll a 0 (o 'window')
            'loadingBarSelector' => '#loadingBar', // Selector CSS de la barra de progreso (opcional, puede ser null)
            'cacheEnabled'       => true, // Activar (true) o desactivar (false) el caché de páginas
            // Patrones de URL (expresiones regulares JS) que *ignoran* AJAX
            'ignoreUrlPatterns'  => [
                 '/wp-admin',
                 '/wp-login\\.php', // Escapar puntos en regex
                 '\\.(pdf|zip|rar|jpg|jpeg|png|gif|webp|mp3|mp4|xml|txt|docx|xlsx)$' // Archivos
             ],
            // Parámetros de URL que *desactivan el caché* para esa página (no la navegación AJAX)
            'ignoreUrlParams'    => ['s', 'nocache', 'preview'],
            // Clase CSS para ignorar enlaces específicos o contenedores
            'noAjaxClass'        => 'no-ajax',
        ];

        // Puedes filtrar esta configuración si necesitas modificarla desde otro plugin/tema hijo
        $config = apply_filters('glory_ajax_nav_config', $config);

        wp_localize_script($script_handle, 'gloryAjaxNavConfig', $config);
    } else {
        // Opcional: Log de error si el script no se encuentra
        // error_log('Glory AJAX Nav script not found at: ' . $script_path);
    }
}
add_action('wp_enqueue_scripts', 'glory_enqueue_ajax_nav_script');
?>
```

**Opciones de Configuración (`gloryAjaxNavConfig`):**

*   `enabled` (boolean): `true` para activar la navegación AJAX, `false` para desactivarla completamente. El script no hará nada si es `false`.
*   `contentSelector` (string): Selector CSS del elemento HTML cuyo contenido será reemplazado con el de la nueva página. **Esencial**.
*   `mainScrollSelector` (string): Selector CSS del elemento que debe hacer scroll hasta arriba después de cargar una página. Si el selector no se encuentra o es inválido, intentará hacer scroll en la ventana principal (`window`).
*   `loadingBarSelector` (string|null): Selector CSS para un elemento visual (ej. una `<div>`) que actúa como barra de progreso. Si es `null` o el elemento no se encuentra, no se mostrará indicador de carga.
*   `cacheEnabled` (boolean): `true` para activar un caché simple en memoria (JavaScript) de las páginas visitadas. `false` para desactivarlo (cada navegación hará un `fetch`).
*   `ignoreUrlPatterns` (array): Un array de strings, donde cada string es un patrón de **expresión regular** JavaScript. Si la URL de un enlace coincide con alguno de estos patrones, la navegación AJAX se saltará y el navegador cargará la página normalmente. Útil para `wp-admin`, `wp-login.php`, enlaces a archivos, etc. *Recuerda escapar caracteres especiales de regex como `.` con `\\.`*.
*   `ignoreUrlParams` (array): Un array de strings. Si la URL de una página contiene alguno de estos parámetros (ej. `?s=buscar` o `?nocache=true`), la página **no será guardada en caché**, aunque la navegación AJAX sí funcionará.
*   `noAjaxClass` (string): El nombre de la clase CSS. Si un elemento `<a>` o uno de sus elementos padres tiene esta clase, el enlace será ignorado por la navegación AJAX.

## Cómo Funciona

1.  **Inicialización:** Al cargar la página, si `enabled` es `true` y el `contentSelector` existe, el script se inicializa.
2.  **Configuración:** Lee la configuración `gloryAjaxNavConfig` proporcionada desde PHP.
3.  **Listeners:** Añade listeners para eventos `click` en el `body` y `popstate` (botones atrás/adelante) en `window`.
4.  **Click:** Cuando se hace clic en un enlace (`<a>`):
    *   Verifica si se presionaron teclas modificadoras (Ctrl, Cmd, Shift, Alt). Si es así, ignora el clic (permite abrir en nueva pestaña).
    *   Comprueba si el enlace debe ser ignorado (`skipAjax`) usando las reglas de `ignoreUrlPatterns`, `noAjaxClass`, origen diferente, `target="_blank"`, etc. Si se ignora, el navegador actúa normalmente.
    *   Si no se ignora, previene la acción por defecto del enlace (`e.preventDefault()`).
    *   Llama a la función `load()` con la URL del enlace.
5.  **Carga (`load`):**
    *   Muestra indicadores visuales (opacidad del contenido, barra de progreso si está configurada).
    *   Revisa si la URL está en caché (`pageCache`) y si `cacheEnabled` es `true` y la URL es cacheable (`shouldCache`). Si está en caché, la muestra directamente, actualiza el historial (`history.pushState`), hace scroll y dispara `themePageReady`.
    *   Si no está en caché (o el caché está desactivado), usa `fetch` para obtener el HTML de la nueva URL.
    *   Valida que la respuesta sea HTML.
    *   Extrae el contenido del `contentSelector` del HTML recibido y el nuevo `<title>`.
    *   Reemplaza el HTML del `contentSelector` actual y actualiza el `document.title`.
    *   Si `cacheEnabled` es `true` y la página es cacheable, guarda el nuevo contenido en `pageCache`.
    *   Actualiza la URL en la barra del navegador y el historial usando `history.pushState()`.
    *   Hace scroll del `mainScrollSelector` (o la ventana) hacia arriba.
    *   Oculta los indicadores de carga.
    *   **Dispara el evento `themePageReady`**: Crucial para reinicializar otros scripts.
6.  **Navegación Historial (`handlePopState`):** Al usar los botones atrás/adelante del navegador, se dispara `popstate`. El script llama a `load()` con la URL correspondiente del historial (sin añadirla de nuevo al historial). Si la URL del historial es una que debería ser ignorada (según `skipAjax`), fuerza una recarga completa de la página para evitar estados inconsistentes.

## Desactivar AJAX para Enlaces Específicos

Si quieres que un enlace específico *no* use AJAX (por ejemplo, para forzar una recarga completa o si apunta a un archivo no cubierto por `ignoreUrlPatterns`), añade la clase configurada en `noAjaxClass` (por defecto `no-ajax`) al enlace o a un contenedor padre:

```html
<!-- Enlace individual ignorado -->
<a href="/pagina-especial" class="no-ajax">Recarga completa</a>

<!-- Todos los enlaces dentro de este div serán ignorados -->
<div class="menu-footer no-ajax">
    <a href="/terminos">Términos</a>
    <a href="/privacidad">Privacidad</a>
</div>
```

## Importante: Re-Inicialización de Scripts (`themePageReady`)

Cuando el contenido se carga vía AJAX, los scripts que dependen de `DOMContentLoaded` o `jQuery(document).ready()` para inicializar elementos (como sliders, galerías, acordeones, etc.) dentro del área de contenido **no se ejecutan automáticamente** sobre el nuevo contenido.

**Debes asegurarte de que tus otros scripts escuchen el evento `themePageReady`** que este script dispara después de reemplazar el contenido.

```javascript
// En otro archivo JS de tu tema, encolado DESPUÉS de ajax-page.js si depende de él
// o simplemente escuchando el evento globalmente.

function inicializarMisComponentes(container) {
    // container es el elemento que se actualizó (el que tiene config.contentSelector)
    // o document si es la carga inicial.
    console.log('Inicializando componentes dentro de:', container);

    const sliders = container.querySelectorAll('.mi-slider');
    sliders.forEach(slider => {
        // Asegúrate de que no se inicialice dos veces si la librería no lo maneja
        if (!slider.classList.contains('inicializado') && typeof MiSlider !== 'undefined') {
            new MiSlider(slider).init();
            slider.classList.add('inicializado'); // Marcar como inicializado
        }
    });

    // ...inicializar otros componentes (galerías, tooltips, etc.)...
}

// 1. Ejecutar en la carga inicial de la página
document.addEventListener('DOMContentLoaded', () => {
    inicializarMisComponentes(document.querySelector('#content') || document); // Usa el selector de contenido
});

// 2. Ejecutar después de cada carga AJAX exitosa
document.addEventListener('themePageReady', (event) => {
    // event.detail.contentElement contiene el elemento cuyo contenido fue reemplazado
    inicializarMisComponentes(event.detail.contentElement);
});
```

**Consideraciones Adicionales:**

*   **Dependencias JS:** Asegúrate de que todas las librerías JS necesarias estén cargadas globalmente (no solo dentro del contenido que se reemplaza).
*   **Estilos CSS:** Los estilos CSS generalmente no son un problema, ya que se cargan en el `<head>`.
*   **Selectores:** El correcto funcionamiento depende críticamente de que los selectores CSS definidos en la configuración (`contentSelector`, `mainScrollSelector`, `loadingBarSelector`) existan y sean únicos en tu HTML.
*   **Compatibilidad:** Scripts de terceros (especialmente los más antiguos o complejos) pueden no ser compatibles con la carga dinámica de contenido y podrían requerir adaptaciones o ser excluidos de la navegación AJAX.

