// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import remarkBreaks from "remark-breaks";

import icon from "astro-icon";

import expressiveCode from "astro-expressive-code";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkBreaks],
  },

  integrations: [icon(), expressiveCode(), react()],
});