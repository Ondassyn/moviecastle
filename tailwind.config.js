const plugin = require("tailwindcss/plugin");

const FlipClass = plugin(function ({ addUtilities }) {
  addUtilities({
    ".flip-horizontally": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
      "-webkit-backface-visibility": "hidden",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in-bottom": {
          "0%": {
            opacity: "0",
            transform: "translateY(-2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(2rem)",
          },
        },
        "flip-vertically": {
          "0%": {
            transform: "rotateX(180deg)",
          },
          "100%": {
            transform: "rotateX(360deg)",
          },
        },
        "flip-horizontally": {
          "0%": {
            transform: "rotateY(180deg)",
          },
          "100%": {
            transform: "rotateY(360deg)",
          },
        },
      },
      animation: {
        "fade-in-bottom": "fade-in-bottom 0.3s",
        "fade-out-top": "fade-out-top 1s",
        "ping-once": "ping 1s",
        "flip-vertically-once": "flip-vertically 1s ease-in",
        "flip-horizontally-once": "flip-horizontally 1s ease-in",
      },
    },
  },
  plugins: [FlipClass],
};
