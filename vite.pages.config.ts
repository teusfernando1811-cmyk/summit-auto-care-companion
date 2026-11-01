// Dedicated GitHub Pages build. Does not affect Lovable's default build.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/summit-auto-care-companion/",
  },
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: true,
    },
  },
});
