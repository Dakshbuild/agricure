/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2E7D32",
        secondary: "#66BB6A",
        accent: "#FFB300",
        background: "#F8FAF8",
      },
    },
  },
  plugins: [],
}
