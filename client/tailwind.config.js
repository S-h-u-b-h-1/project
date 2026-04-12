/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AF8855",
        primaryDark: "#212223",
        secondary: "#2A2C2D",
        background: "#171717",
        text: "#F8F5F2",
        pearl: "#F8F5F2",
        charcoal: "#212223",
        blush: "#FAF3F7",
        poudre: "#F9EFED",
        coral: "#E55D42"
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif']
      }
    },
  },
  plugins: [],
}
