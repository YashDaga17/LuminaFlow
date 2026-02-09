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
          500: "#0ea5e9", // Our primary branding color
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