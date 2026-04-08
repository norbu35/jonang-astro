/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "Open Sans", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        display: ["Noto Serif", "Bodoni Moda", "Cormorant Garamond", "serif"],
        headerLinks: ["Manrope", "Quicksand", "sans-serif"],
        siteTitle: ["Noto Serif", "Bodoni Moda", "serif"],
        sectionTitle: ["Noto Serif", "Bodoni Moda", "serif"],
        tibetan: ["Monlam Uni Ouchan3", "Noto Serif Tibetan", "serif"],
        body: ["Manrope", "Open Sans", "system-ui", "sans-serif"],
        button: ["Manrope", "Quicksand", "sans-serif"],
        quote: ["Cormorant Garamond", "serif"],
        garamond: ["Cormorant Garamond", "serif"],
      },
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--ink-muted) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--surface-muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        saffron: "rgb(var(--saffron) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 20px 40px -28px rgba(87, 0, 19, 0.22)",
        card: "0 34px 70px -44px rgba(87, 0, 19, 0.26)",
      },
    },
  },
  plugins: [],
};
