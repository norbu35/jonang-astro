// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://jonang.in",
  output: "static",
  redirects: {
    "/about-us": "/monastery",
    "/jonang-doctrine": "/doctrine",
  },
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
