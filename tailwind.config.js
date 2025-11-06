/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 3s ease-out forwards",
        shrink: "shrink 3s forwards",
        blink: "blink 0.3s ease-out",
        roll_out: "roll_out 1s ease-out forwards",
        shake: "shake 1.5s",
      },
      keyframes: {
        bounce: {
          "5%": { height: "300px", width: "300px" },
          "10%": { height: "300px", width: "280px" },
          "15%": {
            height: "280px",
            width: "320px",
            transform: "translateY(0)",
          },
          "20%": { height: "300px", width: "320px" },
          "25%": { transform: "translateY(-200px)" },
          "30%": { height: "300px", width: "300px" },
          "35%": { height: "300px", width: "280px" },
          "40%": {
            height: "280px",
            width: "320px",
            transform: "translateY(0)",
          },
          "45%": { height: "300px", width: "320px" },
          "50%": { transform: "translateY(-160px)" },
          "55%": { height: "300px", width: "300px" },
          "60%": { height: "300px", width: "280px" },
          "65%": {
            height: "280px",
            width: "320px",
            transform: "translateY(0)",
          },
          "70%": { height: "300px", width: "320px" },
          "75%": { transform: "translateY(-60px)" },
          "80%": { height: "300px", width: "280px" },
          "85%": {
            height: "280px",
            width: "320px",
            transform: "translateY(-20px)",
          },
          "90%": { height: "300px", width: "320px" },
          "100%": { transform: "translateY(0)" },
        },
        shrink: {
          "5%, 25%, 50%, 75%": { transform: "scale(0.1)" },
          "15%, 40%, 65%, 100%": { transform: "scale(1.1)" },
        },
        blink: {
          "0%, 100%": { transform: "scaleY(0.05)" },
          "5%, 95%": { transform: "scaleY(1)" },
        },
        roll_out: {
          "0%": { transform: "translate(103px, 0) rotate(0)" },
          "100%": { transform: "translate(0, 0) rotate(-360deg)" },
        },
        shake: {
          "0%": { transform: "rotateY(0)" },
          "25%": { transform: "rotateY(-15deg)" },
          "50%": { transform: "rotateY(15deg)" },
          "100%": { transform: "rotateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
