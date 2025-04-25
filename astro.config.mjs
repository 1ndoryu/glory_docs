// astro.config.mjs (o .js)
// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Glory',
            social: [{icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight'}],
            sidebar: [
                {
                    label: 'Empezar',
                    items: [
                        // Asegúrate que el slug coincida con tu ruta de archivo: src/content/docs/empezar/instalacion.md
                        {label: 'Instalación', slug: 'empezar/instalacion'},
                    ]
                },
                {
                    label: 'Basico',
                    // Reemplaza 'autogenerate' con una lista manual 'items'
                    items: [
                        { label: 'PageManager', slug: 'basico/pagemanager' },
                        { label: 'ScriptManager', slug: 'basico/scriptmanager' },
                        { label: 'Ajax Navigation', slug: 'basico/ajaxpage' },

                    ]
                }
                // Puedes seguir usando autogenerate para otras secciones si no necesitas un orden específico
                // {
                //     label: 'Avanzado',
                //     autogenerate: { directory: 'avanzado' }
                // }
            ],
            customCss: [
                // Relative path to your custom CSS file
                './src/styles/custom.css'
            ]
        })
    ]
});