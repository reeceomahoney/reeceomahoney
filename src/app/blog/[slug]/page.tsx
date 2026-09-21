import type { Metadata } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post, metadata } = (await import(
    `@/content/${slug}.mdx`
  )) as {
    default: React.ComponentType;
    metadata: Metadata;
  };

  return (
    <article>
      <h1 className="text-2xl font-bold">{metadata.title}</h1>
      <p className="mb-8 text-sm text-muted">
        {metadata.date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div className="prose max-w-none space-y-10 dark:prose-invert prose-h1:text-xl prose-a:text-link">
        <Post />
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return [
    { slug: "godel" },
    { slug: "knowledge" },
    { slug: "nietzsche" },
    { slug: "plato" },
    { slug: "quality" },
    { slug: "significance" },
  ];
}

export const dynamicParams = false;
