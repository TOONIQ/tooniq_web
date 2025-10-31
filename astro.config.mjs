// 2025.10.31 動的動作をする系のコード・行を一旦全撤去しました
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
//import keystatic from "@keystatic/astro";
// import db from "@astrojs/db";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://tooniq.co.jp",
  //base: "tooniq_web", //github.ioのドメインでデプロイするなら必要
  prefetch: true,
  trailingSlash: "never",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    // ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
    // db(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static", //さくらインターネットはSSRに対応していないので"server"は使用せずに静的サイトでビルドする
});