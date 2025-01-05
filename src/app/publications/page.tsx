import Image from "next/image";
import Link from "next/link";

export default function PublicationsPage() {
  return (
    <div className="ml-16 max-w-3xl">
      <h1 className="pb-8 text-3xl font-bold">Publications</h1>
      <div className="flex items-center gap-4">
        <Image
          src="/locodiff.gif"
          alt="Locodiff"
          width={180}
          height={180}
          className="rounded-lg shadow-lg drop-shadow-lg"
        />
        <div>
          <Link href="/publications/locodiff" className="hover:text-blue-500">
            <h2 className="text-xl font-bold">
              Offline Adaptation of Quadruped Locomotion using Diffusion Models
            </h2>
          </Link>
          <h3>[Submitted ICRA 2025]</h3>
        </div>
      </div>
    </div>
  );
}
