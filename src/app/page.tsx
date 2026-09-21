import Image from "next/image";
import Link from "next/link";
import { PublicationList } from "@/components/publication-list";
import { ProjectList } from "@/components/project-list";
import { PostList } from "@/components/post-list";

const news = [
  {
    date: "Sep 2026",
    text: (
      <>
        Released <Link href="/publications/detaug">DetAug</Link> and{" "}
        <Link href="/publications/distal">DistAL</Link> on arXiv
      </>
    ),
  },
  {
    date: "Sep 2026",
    text: "Started as Head of AI at a stealth startup",
  },
  {
    date: "Jul 2025",
    text: "Joined Kinisi Robotics as a machine learning engineer",
  },
  {
    date: "May 2025",
    text: (
      <>
        Released <Link href="/publications/flow_planner">Flow Planner</Link> on
        arXiv
      </>
    ),
  },
  {
    date: "Jan 2025",
    text: (
      <>
        <Link href="/publications/locodiff">LocoDiff</Link> accepted to ICRA
        2025
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Image
          src="/profile.jpg"
          alt="me"
          width={140}
          height={140}
          className="h-[140px] w-[140px] shrink-0 rounded-lg object-cover"
          priority
        />
        <div className="min-w-0 flex-1">
          <nav className="mb-2 text-sm">
            <a href="https://github.com/reeceomahoney">GitHub</a> |{" "}
            <a href="https://www.linkedin.com/in/reece-omahoney/">LinkedIn</a> |{" "}
            <a href="mailto:reeceo@robots.ox.ac.uk">Email</a>
          </nav>
          <p>
            I am Head of AI at a stealth-mode startup and a final-year PhD
            candidate at the{" "}
            <a href="https://ori.ox.ac.uk/">Oxford Robotics Institute</a>,
            University of Oxford. My thesis is on applying diffusion models to
            robotic control. Previously I was a machine learning engineer at{" "}
            Kinisi Robotics, did freelance
            full-stack development, and read Engineering Science at Oxford. I am
            currently trying to improve my handstands and my chess rating.
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-lg font-bold">News</h3>
        <ul className="list-disc space-y-1 pl-5">
          {news.map((item, index) => (
            <li key={index}>
              <strong>{item.date}:</strong> {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section id="publications">
        <h2 className="mb-3 text-xl font-bold">Publications</h2>
        <PublicationList />
      </section>

      <section id="projects">
        <h2 className="mb-3 text-xl font-bold">Projects</h2>
        <ProjectList />
      </section>

      <section id="writing">
        <h2 className="mb-3 text-xl font-bold">Writing</h2>
        <PostList />
      </section>
    </div>
  );
}
