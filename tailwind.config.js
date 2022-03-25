module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "rgb(27,116,228)",
        error: "rgb(228,30,63)",
        active: "rgb(49,162,76)",
        main: "rgb(240,242,245)",
        dark: "#242526",
        overlay: "rgba(0,0,0,0.1)",
        clicked: "rgb(24,119,242 , 0.15)",
        love: "#ec407a",
        angry: "#FF5349",
      },
    },
  },
  variants: {
    extend: {
      transform: ["group-hover"],
      scale: ["group-hover"],
      display: ["group-hover"],
      borderStyle: ["focus"],
      boxShadow: ["focus"],
      ringColor: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
