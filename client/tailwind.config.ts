/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inputBorder: "rgba(177, 175, 175, 1)",
        lightWhite: "rgba(113, 112, 112, 1)",
        lightViolet: "rgba(160, 140, 177, 1)",
        darkViolet: "rgba(92, 33, 139, 1)",
        violet: "rgba(102, 38, 113, 1)",
      },
    },
  },
  plugins: [],
};
