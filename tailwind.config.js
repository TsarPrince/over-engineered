/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": '#0074DA',
        "primary-light": "#4C8AFF"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
