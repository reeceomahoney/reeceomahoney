import Image from "next/image";
import Link from "next/link";

type Publication = {
  title: string;
  authors: string;
  venue: string;
  href: string;
  image?: { src: string; alt: string };
};

const publications: Publication[] = [
  {
    title:
      "DetAug: Obstacle-Blind Trajectory Augmentation for Zero-shot Obstacle Avoidance",
    authors: "Reece O'Mahoney, Moritz Zoellner, Ioannis Havoutis",
    venue: "arXiv preprint",
    href: "/publications/detaug",
    image: { src: "/thumbs/detaug.gif", alt: "DetAug" },
  },
  {
    title: "DistAL: Distance-based Advantage Learning for VLA Fine-Tuning",
    authors: "Reece O'Mahoney, Ioannis Havoutis",
    venue: "arXiv preprint",
    href: "/publications/distal",
    image: { src: "/thumbs/distal.gif", alt: "DistAL" },
  },
  {
    title: "Improving Trajectory Stitching with Flow Models",
    authors: "Reece O'Mahoney, Wanming Yu, Ioannis Havoutis",
    venue: "arXiv preprint",
    href: "/publications/flow_planner",
    image: { src: "/thumbs/flow_planner.gif", alt: "Flow Planner" },
  },
  {
    title: "Offline Adaptation of Quadruped Locomotion using Diffusion Models",
    authors:
      "Reece O'Mahoney, Alexander L. Mitchell, Wanming Yu, Ingmar Posner, Ioannis Havoutis",
    venue:
      "2025 IEEE International Conference on Robotics and Automation (ICRA)",
    href: "/publications/locodiff",
    image: { src: "/thumbs/locodiff.gif", alt: "Locodiff" },
  },
];

export default function PublicationsPage() {
  return (
    <div className="mx-4 max-w-3xl md:ml-16">
      <h1 className="pb-8 text-3xl font-bold">Publications</h1>
      <div className="space-y-8">
        {publications.map((pub) => (
          <div
            key={pub.href}
            className="flex flex-col items-center gap-4 md:flex-row"
          >
            {pub.image ? (
              <Image
                src={pub.image.src}
                alt={pub.image.alt}
                width={480}
                height={270}
                className="w-full shrink-0 rounded-lg shadow-lg drop-shadow-lg md:w-[288px]"
              />
            ) : (
              <div className="hidden w-[288px] shrink-0 md:block" aria-hidden />
            )}
            <div className="text-center md:text-left">
              <Link href={pub.href} className="hover:text-blue-500">
                <h2 className="text-xl font-bold">{pub.title}</h2>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {pub.authors}
              </p>
              <h3>{pub.venue}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
