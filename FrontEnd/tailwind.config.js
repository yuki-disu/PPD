/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        title: ["Inter", "sans-serif"], // Corrected key to lowercase
      },
      colors: {
        greencol: "#7ABC87",
        textblack: "#3A3939",

        bggray: "#E9E9E9",
        bggreen: "#BDDEBB",
        bggreen2: "#DDF0DB",
        textgray: "#696A6F",
        purplecol: "#8B7ABC",
        bluecol: "#7AB4BC",
        redcol: "#BE3227",
        secblack: "#5A5A5A",
        bgred: "#ffcccc",
      },
    },
  },
  plugins: [],
};
