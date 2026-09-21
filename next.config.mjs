import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // The old list pages are now sections of the home page.
  redirects: async () => [
    { source: "/publications", destination: "/#publications", permanent: true },
    { source: "/projects", destination: "/#projects", permanent: true },
    { source: "/blog", destination: "/#writing", permanent: true },
  ],
};

// Plugins are referenced by name so the config stays serializable for Turbopack.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: ["rehype-katex"],
  },
});

export default withMDX(nextConfig);
