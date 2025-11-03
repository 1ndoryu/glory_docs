// documentacion/astro.config.mjs
// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Glory',
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/1ndoryu/Glory'}],
            sidebar: [
                {
                    label: 'Introducción',
                    items: [
                        'introduccion/bienvenida',
                        'introduccion/instalacion',
                        'introduccion/primeros-pasos',
                        'introduccion/como-crear-paginas',
                        'introduccion/como-usar-componentes',
                        'introduccion/como-crear-componentes'
                    ]
                },
                {
                    label: 'Core',
                    items: [
                        'core/glory-features',
                        'core/glory-ajax',
                        'core/features/glory-realtime',
                        'core/features/available-features'
                    ]
                },
                {
                    label: 'Managers',
                    items: [
                        'managers/asset-manager',
                        'managers/opcion-manager',
                        'managers/page-manager',
                        'managers/default-content-manager',
                        'managers/post-type-manager',
                        'managers/admin-page-manager',
                        'managers/menu-manager'
                    ]
                },
                {
                    label: 'AJAX y Formularios',
                    items: [
                        'ajax-formularios/form-handler',
                        'ajax-formularios/form-builder'
                    ]
                },
                {
                    label: 'Componentes',
                    items: [
                        {
                            label: 'UI',
                            items: [
                                'componentes/ui/badge-list',
                                'componentes/ui/modales',
                                'componentes/ui/theme-toggle'
                            ]
                        },
                        {
                            label: 'Renderers',
                            items: [
                                'componentes/renderers/content-render',
                                'componentes/renderers/term-render',
                                'componentes/renderers/busqueda-renderer',
                                'componentes/renderers/logo-renderer',
                                'componentes/renderers/barra-filtros-renderer',
                                'componentes/renderers/scheduler-renderer',
                                'componentes/renderers/perfil-renderer',
                                'componentes/renderers/data-grid-renderer',
                                'componentes/renderers/pagination-renderer'
                            ]
                        }
                    ]
                },
                {
                    label: 'Utilidades',
                    items: [
                        'utilidades/assets-utility',
                        'utilidades/email-utility',
                        'utilidades/post-utility',
                        'utilidades/user-utility',
                        'utilidades/schedule-manager',
                        'utilidades/image-utility',
                        'utilidades/template-registry'
                    ]
                },
                {
                    label: 'Servicios',
                    items: [
                        'servicios/event-bus',
                        'servicios/glory-logger',
                        'servicios/query-profiler',
                        'servicios/performance-profiler',
                        'servicios/token-manager',
                        'servicios/manejador-git',
                        'servicios/gestor-css-critico',
                        'servicios/local-critical-css',
                        'servicios/analytics-engine',
                        'servicios/busqueda-service',
                        'servicios/license-manager',
                        'servicios/servidor-chat'
                    ]
                },
                {
                    label: 'Administración',
                    items: [
                        'administracion/sync-manager',
                        'administracion/taxonomy-meta-manager',
                        'administracion/seo-metabox',
                        'administracion/page-content-mode-metabox'
                    ]
                },
                {
                    label: 'Desarrollo',
                    items: [
                        'desarrollo/eventos-hooks',
                        'desarrollo/extensibilidad',
                        'desarrollo/mejores-practicas'
                    ]
                }
            ],
            customCss: [
                './src/styles/custom.css'
            ]
        })
    ]
});
