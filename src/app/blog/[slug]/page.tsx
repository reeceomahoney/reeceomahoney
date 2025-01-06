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
    <div className="mx-4 max-w-3xl space-y-6 md:ml-16">
      <h1 className="text-3xl font-bold">{metadata.title}</h1>
      <p className="text-lg">
        {metadata.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="prose space-y-12 dark:prose-invert prose-h1:text-2xl">
        <Post />
      </div>
    </div>
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
