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
                        'introduccion/resumen',
                        'introduccion/bienvenida',
                        'introduccion/instalacion',
                        'introduccion/primeros-pasos',
                        'introduccion/como-crear-paginas',
                        'introduccion/como-usar-componentes',
                        'introduccion/como-crear-componentes',
                        'introduccion/como-crear-contenido-por-defecto-y-post-types'
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
                        'ajax-formularios/sistema-formularios',
                        'ajax-formularios/form-builder',
                        'ajax-formularios/form-handler',
                        'ajax-formularios/handlers'
                    ]
                },
                {
                    label: 'Componentes',
                    items: [
                        {
                            label: 'UI',
                            items: [
                                'componentes/ui/alertas',
                                'componentes/ui/previsualizaciones',
                                'componentes/ui/pestanas',
                                'componentes/ui/submenus',
                                'componentes/ui/header-adaptativo',
                                'componentes/ui/nav-ajax',
                                'componentes/ui/badge-list',
                                'componentes/ui/button',
                                'componentes/ui/content-actions',
                                'componentes/ui/crear-fondo',
                                'componentes/ui/date-range',
                                'componentes/ui/form-modal',
                                'componentes/ui/formulario-fluente',
                                'componentes/ui/glory-image',
                                'componentes/ui/masonry-row-major',
                                'componentes/ui/menu',
                                'componentes/ui/menu-walker',
                                'componentes/ui/modales',
                                'componentes/ui/theme-toggle',
                                'componentes/ui/calendario',
                                'componentes/ui/filtros'
                            ]
                        },
                        {
                            label: 'Renderers',
                            items: [
                                'componentes/renderers/autenticacion-renderer',
                                'componentes/renderers/content-render',
                                'componentes/renderers/header-renderer',
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
                        'servicios/analytics-engine',
                        'servicios/busqueda-service',
                        'servicios/default-content-synchronizer',
                        'servicios/event-bus',
                        'servicios/gestor-css-critico',
                        'servicios/glory-logger',
                        'servicios/license-manager',
                        'servicios/local-critical-css',
                        'servicios/manejador-git',
                        'servicios/media-integrity-service',
                        'servicios/performance-profiler',
                        'servicios/post-action-manager',
                        'servicios/post-relation-handler',
                        'servicios/post-sync-handler',
                        'servicios/query-profiler',
                        'servicios/servidor-chat',
                        'servicios/term-sync-handler',
                        'servicios/token-manager'
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
                        'desarrollo/mejores-practicas',
                        'desarrollo/troubleshooting'
                    ]
                }
            ],
            customCss: [
                './src/styles/custom.css'
            ]
        })
    ]
});
