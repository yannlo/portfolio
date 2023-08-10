/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {

  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  
  safelist: [
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-12/12"
  ],

  darkMode: 'class',

  theme: {
    extend: {
      gridTemplateColumns: {
        'basic': 'repeat(2, minmax(0, 640px))',
      },
      colors:{
        'red': {
          DEFAULT: "#C30B4E",
          "hover": "#75072F",
          "active": "#D55483",
        },
        'yellow': {
          DEFAULT: "#FFD700",
          "hover": "#FFE766",
          "active": "#B39700",
        }
        ,
        'white': "#F8F8FF",
        'gray': {
          "light":"#DBDBE6",
          DEFAULT:"#B5B5C5",
          "dark":"#3B3B54"
        },
        'black': "#040411",
      },
      fontFamily: {
        'sans': ['Roboto', ...defaultTheme.fontFamily.sans.filter(p => p !== 'Roboto')],
      },
    },
  },
  
  plugins: [],
}

