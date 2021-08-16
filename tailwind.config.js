const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: ['src/**/*'],
    safelist: ['dark'],
    darkMode: 'class',
    theme: {
        fontFamily: {
            display: 'Montserrat, sans-serif',
            body: 'Noto Sans, sans-serif',
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            gray: colors.trueGray,
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
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}
