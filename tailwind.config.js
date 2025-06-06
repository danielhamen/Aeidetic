/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        md: "15px",
      },
    },
  },
  plugins: [],
};
console.log("✅ Tailwind Configuration Loaded");
