module.exports = {
  darkMode: 'class', // Enable dark mode class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBackground: "#FBFDFC", // Background color for light mode
        darkBackground: "#242424", // Background color for dark mode
        lightSideBackground: "#EEF6EF", // Background color for sidebar light mode
        darkSideBackground: "#2C2C2C", // Background color for sidebar dark mode
        darkInputBackground:"#2F3630"
      },
    },
  },
  plugins: [],
};
