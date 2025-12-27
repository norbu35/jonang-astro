/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "serif"],
        display: ["Bodoni Moda", "serif"],
        headerLinks: ["Quicksand", "sans-serif"],
        siteTitle: ["Bodoni Moda", "serif"],
        sectionTitle: ["Bodoni Moda", "serif"],
        tibetan: ["Monlam Uni Ouchan3", "Noto Serif Tibetan", "serif"],
        body: ["Open Sans", "system-ui", "sans-serif"],
        button: ["Quicksand", "sans-serif"],
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
        soft: "0 14px 30px -22px rgba(35, 24, 20, 0.4)",
        card: "0 30px 60px -42px rgba(35, 24, 20, 0.55)",
      },
    },
  },
  plugins: [],
};
