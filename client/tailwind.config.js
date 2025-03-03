/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#10b981", // green-500
        secondary: "#3b82f6", // blue-500
      },
    },
  },
  plugins: [],
}

