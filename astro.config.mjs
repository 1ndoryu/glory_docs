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
                        {label: 'Instalación', slug: 'empezar/instalacion'}, // <-- Cambiado a minúsculas
                        {label: 'Test', slug: 'empezar/test'} // Added new item
                    ]
                },
                {
                    label: 'Reference',
                    autogenerate: {directory: 'reference'}
                }
            ],
            customCss: [
                // Relative path to your custom CSS file
                './src/styles/custom.css'
            ]
        })
    ]
});
