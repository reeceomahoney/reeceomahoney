import Link from "next/link";
import { getBlogPosts } from "@/lib/blog-utils";

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-4 max-w-3xl md:ml-16">
      <h1 className="pb-8 text-3xl font-bold">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold hover:underline"
            >
              {post.title}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
