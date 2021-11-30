const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      teal: colors.teal,
      blue: colors.sky,
      red: colors.rose,
      pink: colors.fuchsia,
      white: colors.white,
      gray: colors.gray,
      red: colors.red
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};