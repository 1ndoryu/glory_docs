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
                        'introduccion/bienvenida'
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
                                'componentes/renderers/data-grid-renderer',
                                'componentes/renderers/pagination-renderer',
                                'componentes/renderers/scheduler-renderer',
                                'componentes/renderers/perfil-renderer',
                                'componentes/renderers/barra-filtros-renderer',
                                'componentes/renderers/header-renderer'
                            ]
                        }
                    ]
                },
                {
                    label: 'Administración',
                    items: [
                        'administracion/sync-manager'
                    ]
                }
            ],
            customCss: [
                './src/styles/custom.css'
            ]
        })
    ]
});
