const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: false, // 🚫 Disable dark mode completely
  theme: {
    extend: {
      colors: {
        white: colors.white,
        black: colors.black,
        // You can still keep these color extensions
      },
    },
  },
  plugins: [],
};
