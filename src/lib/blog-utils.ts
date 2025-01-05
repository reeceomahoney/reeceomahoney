"use server";

import fs from "fs";
import path from "path";
import type { Metadata } from "./types";

export async function getBlogPosts() {
  const contentDirectory = path.join(process.cwd(), "/src/content");
  const files = fs.readdirSync(contentDirectory);

  const posts = await Promise.all(
    files.map(async (file) => {
      const { metadata } = (await import(`src/content/${file}`)) as {
        metadata: Metadata;
      };
      return {
        slug: file.replace(".mdx", ""),
        date: new Date(metadata.date),
        title: metadata.title,
      };
    }),
  );

  return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
}
