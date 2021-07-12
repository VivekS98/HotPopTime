module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        modak: ["Modak", "cursive"],
        default: ["Merriweather Sans", "sans - serif"],
      },
      backgroundColor: {
        default: "#130F2D",
      },
      textColor: {
        opposite: "#130F2D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
