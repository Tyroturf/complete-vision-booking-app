/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#17c3bd',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backdropBlur: ['hover', 'focus'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
}

