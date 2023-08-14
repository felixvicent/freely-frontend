/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,tsx,jsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans serif"],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
