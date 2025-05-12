import Image from "next/image";
import Link from "next/link";

export default function PublicationsPage() {
  return (
    <div className="mx-4 max-w-3xl md:ml-16">
      <h1 className="pb-8 text-3xl font-bold">Publications</h1>
      <div className="flex flex-col items-center gap-4 pb-8 md:flex-row">
        <Image
          src="/flow_planner.gif"
          alt="Locodiff"
          width={180}
          height={180}
          className="w-[180px] rounded-lg shadow-lg drop-shadow-lg"
        />
        <div className="text-center md:text-left">
          <Link
            href="/publications/flow_planner"
            className="hover:text-blue-500"
          >
            <h2 className="text-xl font-bold">
              Improving Trajectory Stitching with Flow Models
            </h2>
          </Link>
          <h3>Under review</h3>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Image
          src="/locodiff.gif"
          alt="Locodiff"
          width={180}
          height={180}
          className="w-[180px] rounded-lg shadow-lg drop-shadow-lg"
        />
        <div className="text-center md:text-left">
          <Link href="/publications/locodiff" className="hover:text-blue-500">
            <h2 className="text-xl font-bold">
              Offline Adaptation of Quadruped Locomotion using Diffusion Models
            </h2>
          </Link>
          <h3>
            2025 IEEE International Conference on Robotics and Automation (ICRA)
          </h3>
        </div>
      </div>
    </div>
  );
}
