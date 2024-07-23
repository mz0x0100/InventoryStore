/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#56b8e6",
        secondary: "#1b2f45",
        // primary: "#4338CA",
        // secondary: "#FBBF24",
        xf: {
          primary: "",
          secondary: ""
        }
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
};
