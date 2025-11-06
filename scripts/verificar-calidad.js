#!/usr/bin/env node

/**
 * Script de verificación de calidad para documentación Glory
 * Uso: node scripts/verificar-calidad.js
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuración
const DOCS_DIR = path.join(__dirname, '..', 'src', 'content', 'docs');
const CONFIG_FILE = path.join(__dirname, '..', 'astro.config.mjs');

// Colores para output
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(color, message) {
    console.log(`${color}${message}${colors.reset}`);
}

// Verificar frontmatter
async function verificarFrontmatter() {
    log(colors.blue, '\n🔍 Verificando frontmatter...');

    const archivos = await glob('**/*.mdx', { cwd: DOCS_DIR });
    let errores = 0;

    for (const archivo of archivos) {
        const rutaCompleta = path.join(DOCS_DIR, archivo);
        const contenido = fs.readFileSync(rutaCompleta, 'utf8');
        const lineas = contenido.split('\n');

        // Verificar que empiece con ---
        if (!lineas[0].startsWith('---')) {
            log(colors.red, `❌ ${archivo}: No tiene frontmatter`);
            errores++;
            continue;
        }

        // Encontrar el cierre del frontmatter
        const finFrontmatter = lineas.findIndex((linea, index) => index > 0 && linea.startsWith('---'));

        if (finFrontmatter === -1) {
            log(colors.red, `❌ ${archivo}: Frontmatter no cerrado`);
            errores++;
            continue;
        }

        // Extraer frontmatter
        const frontmatter = lineas.slice(1, finFrontmatter).join('\n');

        // Verificar campos requeridos
        const tieneTitle = frontmatter.includes('title:');
        const tieneDescription = frontmatter.includes('description:');

        if (!tieneTitle) {
            log(colors.red, `❌ ${archivo}: Falta campo 'title'`);
            errores++;
        }

        if (!tieneDescription) {
            log(colors.red, `❌ ${archivo}: Falta campo 'description'`);
            errores++;
        }
    }

    if (errores === 0) {
        log(colors.green, '✅ Frontmatter: Todos los archivos correctos');
    }

    return errores;
}

// Verificar enlaces internos
async function verificarEnlaces() {
    log(colors.blue, '\n🔗 Verificando enlaces internos...');

    const archivos = await glob('**/*.mdx', { cwd: DOCS_DIR });
    const archivosExistentes = new Set(archivos.map(a => a.replace('.mdx', '')));
    let errores = 0;

    for (const archivo of archivos) {
        const rutaCompleta = path.join(DOCS_DIR, archivo);
        const contenido = fs.readFileSync(rutaCompleta, 'utf8');

        // Buscar enlaces internos (formato: href="seccion/archivo")
        const regexEnlaces = /href="([^"]+)"/g;
        let match;

        while ((match = regexEnlaces.exec(contenido)) !== null) {
            const enlace = match[1];

            // Saltar enlaces externos
            if (enlace.startsWith('http') || enlace.startsWith('//') || enlace.startsWith('mailto:')) {
                continue;
            }

            // Verificar si el archivo existe
            const rutaEnlace = enlace.replace(/^\//, ''); // Quitar / inicial si existe

            if (!archivosExistentes.has(rutaEnlace)) {
                log(colors.red, `❌ ${archivo}: Enlace roto '${enlace}'`);
                errores++;
            }
        }
    }

    if (errores === 0) {
        log(colors.green, '✅ Enlaces: Todos los enlaces internos funcionan');
    }

    return errores;
}

// Verificar configuración de Astro
async function verificarConfiguracion() {
    log(colors.blue, '\n⚙️ Verificando configuración de Astro...');

    try {
        const configContent = fs.readFileSync(CONFIG_FILE, 'utf8');
        const archivos = await glob('**/*.mdx', { cwd: DOCS_DIR });
        const archivosEnConfig = new Set();

        // Extraer rutas de sidebar
        const sidebarRegex = /'([^']+\.mdx)'/g;
        let match;

        while ((match = sidebarRegex.exec(configContent)) !== null) {
            archivosEnConfig.add(match[1]);
        }

        // Verificar que todos los archivos MDX estén en la config
        let errores = 0;
        for (const archivo of archivos) {
            if (!archivosEnConfig.has(archivo)) {
                log(colors.yellow, `⚠️ ${archivo}: No está en astro.config.mjs`);
                errores++;
            }
        }

        if (errores === 0) {
            log(colors.green, '✅ Configuración: Todos los archivos están registrados');
        }

        return errores;
    } catch (error) {
        log(colors.red, `❌ Error leyendo configuración: ${error.message}`);
        return 1;
    }
}

// Estadísticas básicas
async function generarEstadisticas() {
    log(colors.blue, '\n📊 Generando estadísticas...');

    const archivos = await glob('**/*.mdx', { cwd: DOCS_DIR });
    let totalLineas = 0;
    let totalArchivos = archivos.length;

    for (const archivo of archivos) {
        const rutaCompleta = path.join(DOCS_DIR, archivo);
        const contenido = fs.readFileSync(rutaCompleta, 'utf8');
        const lineas = contenido.split('\n').length;
        totalLineas += lineas;
    }

    log(colors.cyan, `📁 Total de archivos: ${totalArchivos}`);
    log(colors.cyan, `📝 Total de líneas: ${totalLineas}`);
    log(colors.cyan, `📏 Promedio por archivo: ${Math.round(totalLineas / totalArchivos)} líneas`);

    // Archivos más largos
    const archivosConLineas = await Promise.all(
        archivos.map(async (archivo) => {
            const rutaCompleta = path.join(DOCS_DIR, archivo);
            const contenido = fs.readFileSync(rutaCompleta, 'utf8');
            return {
                archivo,
                lineas: contenido.split('\n').length
            };
        })
    );

    archivosConLineas.sort((a, b) => b.lineas - a.lineas);
    log(colors.cyan, '\n📈 Archivos más largos:');
    archivosConLineas.slice(0, 5).forEach(({ archivo, lineas }) => {
        log(colors.cyan, `  ${archivo}: ${lineas} líneas`);
    });
}

// Función principal
async function main() {
    log(colors.magenta, '🚀 Iniciando verificación de calidad de documentación Glory');

    try {
        let totalErrores = 0;

        totalErrores += await verificarFrontmatter();
        totalErrores += await verificarEnlaces();
        totalErrores += await verificarConfiguracion();

        await generarEstadisticas();

        log(colors.blue, `\n🏁 Verificación completada`);

        if (totalErrores === 0) {
            log(colors.green, '✅ ¡Todo está perfecto!');
            process.exit(0);
        } else {
            log(colors.red, `❌ Se encontraron ${totalErrores} errores`);
            process.exit(1);
        }

    } catch (error) {
        log(colors.red, `💥 Error fatal: ${error.message}`);
        process.exit(1);
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    main();
}

module.exports = { verificarFrontmatter, verificarEnlaces, verificarConfiguracion, generarEstadisticas };





