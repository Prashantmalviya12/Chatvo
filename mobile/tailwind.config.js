/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00b4d8",
          light: "#F4B183",
          dark: "#E76F51",
          soft: "#FFD7BA",
        },
        surface: {
          DEFAULT: "#00b4d8",
          light: "#caf0f8",
          dark: "#0077b6",
          card: "#0077b6",
        },
        foreground: "#FFFFFF",
        "muted-foreground": "#A0A0A5",
        "subtle-foreground": "#6B6B70",
      },
    },
  },
  plugins: [],
};
