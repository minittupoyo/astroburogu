import type { APIRoute } from "astro";
import { render } from "takumi-js";
import stylesheet from "@/styles/global.css?inline";
import { OgImage } from "@/components/OgImage";
import { loadDefaultJapaneseParser } from "budoux";
import React from "react";
import fs from "node:fs";
import path from "node:path";

export const GET: APIRoute = async () => {
  const parser = loadDefaultJapaneseParser();

  const title = parser.parse("burogu").join("\u200B");
  const description = parser.parse("Astroで適当に作ったブログ").join("\u200B")

  const buffer = await render(React.createElement(OgImage, { title, description }), {
    width: 1200,
    height: 630,
    format: "png",
    stylesheets: [stylesheet],
    fonts: [
      {
        name: "Noto Sans JP",
        weight: 500,
        data: fs.readFileSync(path.join(process.cwd(), "src/assets/fonts/NotoSansJP-Medium.ttf")).buffer as ArrayBuffer
      },
      {
        name: "Noto Sans JP",
        weight: 700,
        data: fs.readFileSync(path.join(process.cwd(), "src/assets/fonts/NotoSansJP-Bold.ttf")).buffer as ArrayBuffer
      },
      {
        name: "Inter",
        weight: 500,
        data: fs.readFileSync(path.join(process.cwd(), "src/assets/fonts/Inter-Medium.woff2")).buffer as ArrayBuffer
      },
      {
        name: "Inter",
        weight: 700,
        data: fs.readFileSync(path.join(process.cwd(), "src/assets/fonts/Inter-Bold.woff2")).buffer as ArrayBuffer
      }
    ]
  })
  return new Response(new Uint8Array(buffer), {
    headers: { "Content-Type": "image/png" }
  })
}