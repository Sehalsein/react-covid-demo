const colors = require('tailwindcss/colors')

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                background: {
                    dark: '#161625',
                    light: '#ffffff',
                    'dark-alternate': '#1e1e30',
                },
                red: {
                    ...colors.red,
                    alpha: 'rgba(255, 7, 58, 0.125)',
                },
                blue: {
                    ...colors.blue,
                    alpha: 'rgba(0, 123, 255, 0.125)',
                },
                green: {
                    ...colors.green,
                    alpha: 'rgba(40, 167, 69, 0.125)',
                },
                gray: {
                    ...colors.gray,
                    alpha: 'rgba(108, 117, 125, 0.125)',
                },
                amber: {
                    ...colors.amber,
                    alpha: 'rgba(253,126,20,.12549019607843137)',
                },
                purple: {
                    ...colors.purple,
                    alpha: 'rgba(64,0,128,.3137254901960784)',
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
