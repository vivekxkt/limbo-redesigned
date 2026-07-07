/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#000000",
        fog: "#e8e8e8",
        mist: "#aaaaaa",
        steel: "#8f959f",
        frost: "#f8f8f8",
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        body: ["Sora", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 100px rgba(255, 255, 255, 0.12)",
      },
    },
  },
  plugins: [],
};
