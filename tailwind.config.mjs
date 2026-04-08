/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "Open Sans", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Cormorant Garamond", "serif"],
        display: ["Playfair Display", "Noto Serif", "Bodoni Moda", "serif"],
        headerLinks: ["Outfit", "Manrope", "Quicksand", "sans-serif"],
        siteTitle: ["Playfair Display", "Noto Serif", "serif"],
        sectionTitle: ["Playfair Display", "Noto Serif", "serif"],
        tibetan: ["Monlam Uni Ouchan3", "Noto Serif Tibetan", "serif"],
        body: ["Outfit", "Manrope", "system-ui", "sans-serif"],
        button: ["Outfit", "Manrope", "sans-serif"],
        quote: ["Playfair Display", "Cormorant Garamond", "serif"],
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
        soft: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
        card: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(var(--saffron), 0.3)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
