// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

export default defineConfig({
  integrations: [preact()],
  vite: {
    plugins: tailwindcss(),
  },
  image: {
    service: passthroughImageService(),
    domains: ["167.172.54.89", "cms.jonang.in", "localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "167.172.54.89",
      },
      {
        protocol: "https",
        hostname: "cms.jonang.in",
      },
    ],
  },
});
