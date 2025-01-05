import Image from "next/image";
import { Mail, Github, Linkedin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="ml-16 max-w-3xl py-12">
      <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div className="h-48 w-48 flex-shrink-0 md:h-64 md:w-64">
          <Image
            src="/profile.jpg"
            alt="Reece O'mahoney"
            width={300}
            height={300}
            className="rounded-full object-cover shadow-lg drop-shadow-lg"
          />
        </div>
        <div>
          <h1 className="mb-4 text-4xl font-bold">Reece O&apos;mahoney</h1>
          <div className="text-lg">
            PhD Student @ University of Oxford
            <br />
            Oxford Robotics Institute
          </div>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">About Me</h2>
        <p className="leading-relaxed">
          Hello! I&apos;m Reece. I&apos;m a PhD student at the University of
          Oxford, where I&apos;m a member of the Oxford Robotics Institute.
          I&apos;m interested in the intersection of machine learning and
          robotics, and I&apos;m currently working on applying diffusion models
          to robotic locomotion and manipulation. In my spare time I enjoy
          powerlifting, travelling, and playing chess.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
        <div className="flex flex-col gap-4">
          <a
            href="mailto:reeceo@robots.ox.ac.uk"
            className="flex items-center hover:text-blue-500"
          >
            <Mail className="mr-2 h-6 w-6" />
            <span>reeceo@robots.ox.ac.uk</span>
          </a>

          <a
            href="https://github.com/reeceomahoney"
            className="flex items-center hover:text-blue-500"
          >
            <Github className="mr-2 h-6 w-6" />
            <span>github.com/reeceomahoney</span>
          </a>

          <a
            href="https://www.linkedin.com/in/reece-omahoney/"
            className="flex items-center hover:text-blue-500"
          >
            <Linkedin className="mr-2 h-6 w-6" />
            <span>linkedin.com/in/reece-omahoney</span>
          </a>
        </div>
      </section>
    </div>
  );
}
