/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      serifM: ["Merriweather", "serif"],
      poopins: ["Poppins", "sans-serif"],
      prata: ["Prata", "serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};
