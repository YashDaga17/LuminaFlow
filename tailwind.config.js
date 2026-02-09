/** @type {import('tailwindcss').Config} */
module.exports = {
  // CONTENT: Tells Tailwind which files to "scan" for CSS classes. 
  // If a file isn't listed here, its Tailwind styles won't show up!
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // COLORS: This is where we define LuminaFlow's identity.
      colors: {
        lumina: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Our primary branding color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      // SHADOWS: Custom effects like our "AI Glow"
      boxShadow: {
        'glow': '0 0 20px -5px rgba(14, 165, 233, 0.5)',
      }
    },
  },
  plugins: [],
}