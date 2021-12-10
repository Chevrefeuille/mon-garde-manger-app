const {
  mean
} = require('lodash');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};