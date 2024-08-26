/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ll: "380px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1400px",
    },

    extend: {
      colors: {
        primaryColor: "#415569",
        secondaryColor: "#63A6C4",
        grayColor: "#394553",
        lightGrayColor: "#677787",
        whiteColor: "#FFFF",
        blackColor: "#000",
      },

      borderRadius: {
        round: "6px",
      },
    },

    fontFamily: {
      josefin: ["Josefin Sans", "sans-serif"],
    },
  },
  plugins: [],
};
