import Link from "next/link";
import { getBlogPosts } from "@/lib/blog-utils";

export async function PostList() {
  const posts = await getBlogPosts();

  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li key={post.slug} className="flex gap-4">
          <time className="w-24 shrink-0 text-sm text-muted tabular-nums">
            {post.date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>
          <Link href={`/blog/${post.slug}`} className="text-fg">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
