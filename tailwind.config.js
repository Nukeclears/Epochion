const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['src/**/*.{svelte,js,html}'],
    safelist: ['dark'],
    darkMode: 'class',
    theme: {
        extend: {
        },
        fontFamily: {
            display: 'Montserrat, sans-serif',
            body: 'Noto Sans, sans-serif',
        },

        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.coolGray,
            red: colors.red,
            amber: colors.amber,
            rose: colors.rose,
            blue: colors.blue,
            cyan: colors.cyan,
            yellow: colors.amber,
            pink: colors.pink,
            orange: colors.orange,
            white: colors.white,
            black: colors.black,
        },
    },
    variants: {
        extend: {
        },
    },
    plugins: [
        require('daisyui'),
    ],
}
