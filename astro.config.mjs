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
                    text: 'Introducción',
                    items: [
                        { text: 'Bienvenida', link: '/introduccion/bienvenida/' }
                    ]
                },
                {
                    text: 'Managers',
                    items: [
                        { text: 'AssetManager', link: '/managers/asset-manager/' }
                    ]
                }
            ],
            customCss: [
                './src/styles/custom.css'
            ]
        })
    ]
});
