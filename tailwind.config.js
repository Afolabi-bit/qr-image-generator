/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/script/*.js", "index.html"],
  theme: {
    fontFamily: {
      'josefin': ['Josefin Sans', 'sans-serif'],
      'manrope': ['Manrope', 'sans-serif']
    },
    colors: {
      red: '#E63946',
      offWhite: '#F1FAEE',
      powderBlue: '#A8DADC',
      grayishBlue: '#aaaaaa',
      prussianBlue: '#1D3557',
      oxfordBlue: '#14213D'
    },
    extend: {
      width: {
        '300': '500px'
      }
    },
  },
  plugins: [],
}
