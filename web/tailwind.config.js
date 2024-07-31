/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}'
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#d08c4d',
        'brand-xs': '#d08c4d1a',  // 10% opacity
        'brand-sm': '#d08c4d33',  // 20% opacity
        'brand-md': '#d08c4d4d',  // 30% opacity
        'brand-lg': '#d08c4d66',  // 40% opacity
        'brand-xl': '#d08c4d80',  // 50% opacity
        'brand-2xl': '#d08c4d99', // 60% opacity
        'brand-3xl': '#d08c4db3', // 70% opacity
        'brand-4xl': '#d08c4dcc', // 80% opacity
        'brand-5xl': '#d08c4de6', // 90% opacity
        'brand-full': '#d08c4dff', // 100% opacity
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
