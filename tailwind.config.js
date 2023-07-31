/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {

  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],

  darkMode: 'class',

  theme: {
    extend: {
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

