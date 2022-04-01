function withOpacityValue(variable) {
    return ({opacityValue}) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`
        }
        return `rgb(var(${variable}) / ${opacityValue})`
    }
}

module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#ffffff',
                black: '#000000',
            },
            fontFamily: {
                brand: ['Rajdhani'],
                navigation: ['Oswald'],
                primary: ['Merriweather'],
                secondary: ['Lato'],
                lesson: ['Sumana'],
                typing: ['Roboto Serif'],
                keyboard: ['Montserrat']
            },
            textColor: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            backgroundColor: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            ringColor: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            borderColor: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            boxShadowColor: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            gradientColorStops: {
                transparent: 'var(--color-primary-transparent)',
                50: withOpacityValue('--color-primary-50'),
                100: withOpacityValue('--color-primary-100'),
                200: withOpacityValue('--color-primary-200'),
                300: withOpacityValue('--color-primary-300'),
                400: withOpacityValue('--color-primary-400'),
                500: withOpacityValue('--color-primary-500'),
                600: withOpacityValue('--color-primary-600'),
                700: withOpacityValue('--color-primary-700'),
                800: withOpacityValue('--color-primary-800'),
                900: withOpacityValue('--color-primary-900'),
            },
            gridTemplateColumns: {
                '50': 'repeat(50, minmax(0, 1fr))',
                'kfirst': 'repeat(13, minmax(0,1fr)) 1.5fr',
                'ksecond': '1.5fr repeat(12, minmax(0,1fr)) 1fr',
                'kthird': '1.75fr repeat(11,minmax(0,1fr)) 1.75fr',
                'kfourth': '2.25fr repeat(10, minmax(0,1fr)) 2.25fr',
                'kfifth': '1.5fr 1.5fr 8.5fr 1.5fr 1.5fr',
            },
            keyframes: {
                blink_cursor: {
                    '50%': {
                        borderBottomColor: "rgba(203 213 225 / 0.4)"
                    }
                },
                blink_border: {
                    '50%': {
                        borderColor: "rgba(203 213 225 / 0.4)"
                    }
                },
                shakeY: {
                    'from, to': {transform: 'translate3d(0,0,0)'},
                    '10%,30%,50%,70%,90%': {transform: 'translate3d(0, -4px, 0)'},
                    '20%,40%,60%,80%': {transform: 'translate3d(0, 4px, 0)'}
                },
                shakeX: {
                    'from, to': {transform: 'translate3d(0,0,0)'},
                    '10%,30%,50%,70%,90%': {transform: 'translate3d(-4px, 0, 0)'},
                    '20%,40%,60%,80%': {transform: 'translate3d(4px, 0, 0)'}
                },
                blink_bg: {
                    '50%': {
                        backgroundColor: "rgba(255 255 255 / 0.9)"
                    }
                },
                key_fadein: {
                    '0%': {opacity: 0.6},
                    '50%': {
                        opacity: 0.8
                    },
                    '100%': {
                        opacity: 1
                    },
                },
                hand_fadein: {
                    '0%': {opacity: 0.5},
                    '100%': {
                        opacity: 0.6
                    },
                },
            },
            animation: {
                blink_cursor: "blink_cursor 0.8s infinite",
                blink_border: "blink_border 1.5s infinite",
                shakeY: "shakeY 1s 1",
                shakeX: "shakeX 1s 1",
                blink_bg: "blink_bg 0.7s infinite",
                key_fadein: "key_fadein 0.5s linear forwards",
                hand_fadein: "hand_fadein 0.8s linear forwards",
            },
            screens: {
                // xs: {max: '575px'}, // Mobile (iPhone 3 - iPhone XS Max).
                // sm: {min: '576px', max: '897px'}, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
                // md: {min: '898px', max: '1199px'}, // Tablet (matches max: iPad Pro @ 1112px).
                // lg: {min: '1200px'}, // Desktop smallest.
                // xl: {min: '1159px'}, // Desktop wide.
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },

    },
    variants: {},
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
    ],
}
