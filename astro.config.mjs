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
                        '/introduccion/bienvenida/'
                    ]
                },
                {
                    label: 'Managers',
                    items: [
                        '/managers/asset-manager/'
                    ]
                }
            ],
            customCss: [
                './src/styles/custom.css'
            ]
        })
    ]
});
