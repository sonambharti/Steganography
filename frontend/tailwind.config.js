/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  // theme: {
  //   extend: {},
  // },
  // plugins: [],

  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      color: {
        myGreen: "#1aac83",
      },
      boxShadow: {
        aboutOuter:
          "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        aboutInner:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;",
      },
    },
  },
}

