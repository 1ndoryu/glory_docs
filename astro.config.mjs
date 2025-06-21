// documentacion/astro.config.mjs
// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'SwordPHP',
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/1ndoryu/SwordPHP'}],
            sidebar: [
                {
                    label: 'Introducción',
                    items: [
                        {label: 'Bienvenida a SwordPHP', slug: 'introduccion/bienvenida'},
                        {label: 'Conceptos Fundamentales', slug: 'introduccion/conceptos-fundamentales'},
                        {label: 'Instalación', slug: 'introduccion/instalacion'}
                    ]
                },
                {
                    label: 'Desarrollo de Temas',
                    items: [
                        {label: 'Estructura de un Tema', slug: 'desarrollo-temas/estructura-tema'},
                        {label: 'El Loop de SwordPHP', slug: 'desarrollo-temas/el-loop'},
                        {label: 'Plantillas de Página', slug: 'desarrollo-temas/plantillas-pagina'},
                        {label: 'Partes de Plantilla', slug: 'desarrollo-temas/partes-plantilla'},
                        {label: 'Manejo de Assets', slug: 'desarrollo-temas/manejo-assets'},
                        {label: 'Sincronización Declarativa', slug: 'desarrollo-temas/sincronizacion-declarativa'}
                    ]
                },
                {
                    label: 'Desarrollo de Plugins',
                    items: [
                        {label: 'Estructura de un Plugin', slug: 'desarrollo-plugins/estructura-plugin'},
                        {label: 'Hooks: Acciones y Filtros', slug: 'desarrollo-plugins/hooks'},
                        {label: 'Páginas de Administración', slug: 'desarrollo-plugins/paginas-admin'},
                        {label: 'Opciones de Plugin', slug: 'desarrollo-plugins/opciones'},
                        {label: 'Shortcodes', slug: 'desarrollo-plugins/shortcodes'}
                    ]
                },
                {
                    label: 'Guías Adicionales',
                    items: [{label: 'Equivalencias con WordPress', slug: 'guias/equivalencias-wordpress'}]
                }
            ],
            customCss: [
                // Relative path to your custom CSS file
                './src/styles/custom.css'
            ]
        })
    ]
});
