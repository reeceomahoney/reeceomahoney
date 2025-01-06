import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="mx-4 max-w-3xl space-y-8 md:ml-16">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Image
          src="/arxiv-lib.png"
          alt="Arxiv Library"
          width={300}
          height={300}
          className="w-full rounded-lg shadow-lg drop-shadow-lg md:w-auto"
        />
        <div className="text-center md:text-left">
          <Link
            href="https://arxiv-library.vercel.app/"
            className="hover:text-blue-500"
          >
            <h2 className="text-xl font-bold">Arxiv Library</h2>
          </Link>
          <h3>A web app for reading and organizing arXiv papers</h3>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <Image
          src="/le-booking.png"
          alt="Booking System | Leading Education"
          width={300}
          height={300}
          className="w-full rounded-lg shadow-lg drop-shadow-lg md:w-auto"
        />
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">
            Booking System | Leading Education
          </h2>
          <h3>
            Platform for booking and managing client bookings built for a
            private tution company
          </h3>
        </div>
      </div>
    </div>
  );
}
