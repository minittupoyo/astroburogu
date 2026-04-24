import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { render, type Font } from "takumi-js";
import stylesheet from "@/styles/global.css?inline";
import { OgImage } from "@/components/OgImage";
import { loadDefaultJapaneseParser } from "budoux";
import React from "react";
import fs from "node:fs";
import path from "node:path";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { id: post.id },
    props: { post }
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<"blog"> };
  const parser = loadDefaultJapaneseParser();

  const title = parser.parse(post.data.title).join("\u200B");
  const description = parser.parse(post.data.description).join("\u200B")

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