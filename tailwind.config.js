/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "navy-blue": "#1D3557",
        "sky-blue": "#457B9D",
        "light-grey": "#F1FAEE",
        "teal-green": "#2A9D8F",
        "warning-orange": "#E76F51",
        "dark-grey": "#343A40",
        "sp-green": "#C0FAAD",
      },
      borderRadius: {
        "5xl": "5rem",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to bottom right, #E3F6DD 34%, #FFFFFF 66%)",
        "custom-gradient2":
          "linear-gradient(to bottom right, #FFFFFF 14%, #E3F6DD 46%)",
      },
    },
  },
  plugins: [],
};
