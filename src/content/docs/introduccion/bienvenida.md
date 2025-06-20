---
title: Bienvenida a SwordPHP
description: Descubre la filosofía y los principios de SwordPHP, una alternativa moderna a WordPress enfocada en el rendimiento, el minimalismo y la modularidad.
---

# ¡Bienvenido a la Documentación de SwordPHP!

SwordPHP es un Sistema de Gestión de Contenidos (CMS) diseñado desde cero con una filosofía clara: ofrecer una alternativa a WordPress que sea **minimalista, modular, increíblemente rápida** y que siga las mejores prácticas de desarrollo para ser fácilmente mantenible y escalable.

Si vienes del mundo de WordPress, muchos conceptos te resultarán familiares. SwordPHP busca conservar la esencia que hace grande a WordPress: la capacidad de extender y personalizar todo mediante temas y plugins, y una curva de aprendizaje suave para los desarrolladores.

## La Filosofía de SwordPHP

Nuestro objetivo es combinar la simplicidad y la potencia de WordPress con las ventajas de las arquitecturas modernas de PHP.

### 1. Rendimiento como Prioridad

Construido sobre [Webman](https://www.workerman.net/webman), un framework de alto rendimiento, SwordPHP mantiene la aplicación en memoria. Esto reduce drásticamente la latencia y el tiempo de respuesta en cada petición, ofreciendo una experiencia de usuario y de desarrollo notablemente más rápida.

### 2. Minimalismo y Modularidad

El núcleo de SwordPHP (`swordCore`) es intencionadamente ligero. Las funcionalidades se añaden a través de un robusto sistema de hooks (acciones y filtros) y plugins. Esta arquitectura modular te permite construir sitios complejos sin cargar con funcionalidades que no necesitas, manteniendo todo limpio y optimizado.

### 3. Simplicidad para Desarrolladores

Queremos que los desarrolladores de temas y plugins puedan enfocarse en crear, no en descifrar una arquitectura compleja. Al igual que en WordPress, puedes añadir tu lógica en un archivo `functions.php` y utilizar funciones globales y helpers intuitivos, sin la necesidad de lidiar con `use /App` o espacios de nombres complicados en el día a día.

### 4. Separación Clara de Entornos

SwordPHP impone una estricta separación entre el núcleo del sistema (`swordCore`) y el contenido del usuario (`swordContent`). Tus temas, plugins y archivos multimedia viven en su propio directorio, desacoplados del framework. Esto no solo organiza mejor el proyecto, sino que también facilita enormemente las actualizaciones del núcleo sin riesgo de romper tu trabajo.

## ¿Para Quién es Esta Documentación?

Esta documentación está dirigida a desarrolladores que deseen crear temas y plugins para la plataforma SwordPHP. Te guiaremos a través de la estructura del proyecto, las funciones disponibles, y las mejores prácticas para extender el CMS y construir experiencias web rápidas y a medida.

A continuación, exploraremos los conceptos fundamentales de la arquitectura de SwordPHP.
