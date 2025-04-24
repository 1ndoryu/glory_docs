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
                        // Añade aquí cada archivo de la carpeta 'basico' en el orden deseado.
                        // El 'label' es lo que se muestra, el 'slug' es la ruta sin extensión.
                        { label: '01 - PageManager', slug: 'basico/01-pagemanager' },
                        { label: '02 - ScriptManager', slug: 'basico/02-scriptmanager' },
                        // ... continúa con todos tus archivos ...
                        { label: '03 - Ajax Navigation', slug: 'basico/03-ajaxpage.md' },

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