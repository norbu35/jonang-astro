/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "headerLinks": ["Quicksand", "sans-serif"],
        "siteTitle": ["Bodoni Moda", "serif"],
        "sectionTitle": ["Bodoni Moda", "sans-serif"],
        "tibetan": ["Noto Serif Tibetan", "sans-serif"],
        "body": ["Lato", "sans-serif"],
        "button": ["Segoe UI", "sans-serif"],
        "quote": ["Cormorant Garamond", "sans-serif"],
        "garamond": ["Cormorant Garamond", "sans-serif"],
      },
      colors: {},
    },
  },
  plugins: [],
};
