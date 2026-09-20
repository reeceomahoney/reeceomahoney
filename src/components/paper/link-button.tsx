import Image from "next/image";

export function LinkButton({
  href,
  icon,
  iconAlt,
  children,
}: {
  href: string;
  icon: string;
  iconAlt: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 rounded-3xl bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 md:px-6"
    >
      <Image src={icon} alt={iconAlt} width={24} height={24} />
      {children}
    </a>
  );
}
