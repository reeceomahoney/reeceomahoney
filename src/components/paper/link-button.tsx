export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-md border border-rule px-3 py-1 text-sm hover:bg-rule/40 hover:no-underline"
    >
      {children}
    </a>
  );
}
