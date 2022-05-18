module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'gallery': '200px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}