---
title: 'Hooks: Acciones y Filtros'
description: Domina los hooks, el sistema de Acciones y Filtros que hace a SwordPHP tan extensible y modular.
---

# Hooks: Acciones y Filtros

El sistema de "Hooks" (ganchos) es la base de la extensibilidad en SwordPHP. Permite que tu plugin interactúe con el núcleo del sistema y con otros plugins, ejecutando tu código en puntos específicos o modificando datos sobre la marcha.

Los hooks se dividen en dos tipos: **Acciones** y **Filtros**.

## Acciones (Actions)

Las Acciones te permiten **ejecutar una función** en un punto específico del ciclo de vida de SwordPHP. Son ideales para añadir nuevo contenido, procesar formularios, encolar scripts, etc. No se espera que devuelvan ningún valor.

### `addAction(nombre, callback, prioridad, args)`

Registra tu función (`callback`) para que se ejecute cuando se dispare una acción específica (`nombre`).

-   `$nombre` (string): El nombre de la acción a la que te quieres "enganchar".
-   `$callback` (callable): El nombre de la función de tu plugin que se debe ejecutar.
-   `$prioridad` (int, opcional): Un número para determinar el orden de ejecución. Un número menor significa que se ejecutará antes. Por defecto es `10`.
-   `$args` (int, opcional): El número de argumentos que tu función de callback acepta. Por defecto es `1`.

### `doAction(nombre, ...$args)`

Esta función es usada por el núcleo de SwordPHP (o por otros plugins) para **disparar** una acción y ejecutar todos los callbacks registrados para ella.

**Ejemplo:** Añadir contenido al pie de página del sitio.

```php
// En tu plugin:
addAction('sw_footer', 'miPlugin_mostrarMensaje');

function miPlugin_mostrarMensaje() {
    echo "<p>Este sitio funciona gracias a mi plugin!</p>";
}

// En el layout del tema (footer.php), el núcleo llama a:
doAction('sw_footer');
// Esto ejecutará la función 'miPlugin_mostrarMensaje'.
```

## Filtros (Filters)

Los Filtros te permiten **modificar datos** que están siendo procesados. Una función de filtro siempre debe **devolver un valor** (el valor modificado, o el original si no se cambia nada). Son perfectos para cambiar el texto de un título, añadir clases a un elemento, etc.

### `addFilter(nombre, callback, prioridad, args)`

Registra tu función (`callback`) para filtrar un valor específico (`nombre`). Los parámetros son idénticos a los de `addAction`.

### `applyFilters(nombre, $valor, ...$args)`

Esta función es usada por el núcleo para **aplicar** todos los filtros registrados a un valor. Toma un valor inicial, lo pasa a través de todas las funciones de callback y devuelve el resultado final.

**Ejemplo:** Añadir un prefijo al título de una página.

```php
// En tu plugin:
addFilter('theTitle', 'miPlugin_prefijoAlTitulo', 10, 2);

function miPlugin_prefijoAlTitulo($tituloActual, $pagina) {
    // $pagina es un argumento extra que el hook 'theTitle' proporciona.
    // Siempre debemos devolver un valor.
    return "[Plugin] " . $tituloActual;
}

// En el núcleo de SwordPHP, al usar theTitle():
$titulo = "Mi Gran Página";
$tituloModificado = applyFilters('theTitle', $titulo, $paginaObject);
echo $tituloModificado; // Imprimirá: "[Plugin] Mi Gran Página"
```

> **Referencia Técnica:** El sistema de Hooks es gestionado por `HookService` y las funciones globales se encuentran en `swordCore/app/helpers/hooks.php`.

