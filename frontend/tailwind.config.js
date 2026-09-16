/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55b88b',
        'primary-hover': '#459a72',
      }
    },
  },
  plugins: [],
}