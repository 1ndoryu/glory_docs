---
title: Instalación
description: Una guía paso a paso para instalar SwordPHP en tu entorno de desarrollo local.
---

# Instalación de SwordPHP

Esta guía te llevará a través de los pasos necesarios para poner en funcionamiento una copia de SwordPHP en tu máquina local para desarrollo y pruebas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:

-   **PHP 8.0 o superior:** Con las extensiones comunes (pdo_pgsql, mbstring, etc.).
-   **Composer:** El gestor de dependencias para PHP.
-   **Git:** Para clonar el repositorio del proyecto.
-   **PostgreSQL:** SwordPHP utiliza PostgreSQL como su motor de base de datos.

## Pasos de Instalación

### 1. Clonar el Repositorio

Abre tu terminal, navega al directorio donde deseas instalar el proyecto y ejecuta el siguiente comando:

```bash
git clone https://github.com/1ndoryu/SwordPHP.git
```


Esto creará una carpeta llamada `SwordPHP` con todos los archivos del proyecto.

### 2\. Instalar Dependencias

Navega al directorio del núcleo del framework para instalar sus dependencias con Composer.

```bash
cd SwordPHP/swordCore
composer install
```

### 3\. Preparar la Base de Datos

SwordPHP necesita una base de datos para funcionar.

1.  Abre tu herramienta de gestión de PostgreSQL (como pgAdmin o DBeaver).
2.  Crea una nueva base de datos vacía (por ejemplo, `swordphp`).
3.  Asegúrate de tener a mano las credenciales de conexión: host, puerto, nombre de la base de datos, usuario y contraseña. Las necesitarás en el instalador web.

### 4\. Iniciar el Servidor

SwordPHP utiliza el servidor de alto rendimiento integrado en Webman. Para iniciarlo, ejecuta el siguiente comando desde el directorio `swordCore`:

```bash
php start.php start
```

Si todo va bien, verás un mensaje indicando que el servidor se ha iniciado. Por defecto, estará disponible en `http://127.0.0.1:8787`.

_Nota para usuarios de Windows: También puedes usar el script `windows.php` para iniciar el servidor._

### 5\. Usar el Instalador Web

Ahora que el servidor está en funcionamiento, abre tu navegador web y visita `http://127.0.0.1:8787`.

Serás redirigido automáticamente al instalador web de SwordPHP. Rellena el formulario con la siguiente información:

-   **Datos de la Base de Datos:** Las credenciales que preparaste en el paso 3.
-   **Información del Sitio:** El título y la descripción para tu nuevo sitio.
-   **Cuenta de Administrador:** El nombre de usuario, correo electrónico y contraseña para tu primera cuenta de administrador.

Haz clic en "Instalar SwordPHP". El instalador verificará la conexión, creará las tablas en la base de datos y guardará tu configuración. Si todo es correcto, serás redirigido a la pantalla de login del panel de administración.

¡Felicidades, has instalado SwordPHP\!

## Solución de Problemas Comunes

-   **Error de Conexión a la Base de Datos:** Verifica que las credenciales en el instalador sean correctas y que tu servidor de PostgreSQL esté en funcionamiento y accesible.
-   **Problemas de Permisos:** Si encuentras errores de escritura de archivos, asegúrate de que el servidor web tenga permisos para escribir en el directorio `swordCore/runtime`.


