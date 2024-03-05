/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#000000",
        "main-200": "#121212",
        "main-LeftHover": "#FFF",
        "main-player": "#181818",
      },
      colors: {
        "main-body": "#374151",
        "main-Left": "#A0A0A0",
        "main-LeftHover": "#FFF",
        "main-player": "#181818",
        "t-player": "#f2f2f2",
      },
      keyframes: {
        "slide-right": {
          "0%": {
            "-webkit-transform": "translateX(-500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left2": {
          "0%": {
            "-webkit-transform": "translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
      },
      animation: {
        "slider-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slider-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slider-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      },
    },
  },
  plugins: [],
};
