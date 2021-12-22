const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#00D09C',
        hoverColor:'#A2FFE8',
        darkPrimary:'#008161',
        lightPrimary:'#e2fff8',
        lightGray:'#F8F9FD'
      }
    },
  },
  variants: {},
  plugins: []
};
