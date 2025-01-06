import Image from "next/image";
import { Mail, Github, Linkedin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-4 max-w-3xl py-12 md:ml-16">
      <div className="mb-12 flex flex-col items-center gap-8 md:flex-row">
        <div className="h-48 w-48 flex-shrink-0 md:h-64 md:w-64">
          <Image
            src="/profile.jpg"
            alt="Reece O'mahoney"
            width={300}
            height={300}
            className="rounded-full object-cover shadow-lg drop-shadow-lg"
            priority
          />
        </div>
        <div className="text-center md:text-left">
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
          Oxford within the Robotics Institute. I&apos;m interested in the
          intersection of machine learning and robotics, and I&apos;m currently
          working on applying diffusion models to quadrupedal locomotion and
          manipulation. In addition to my PhD I also do freelance web
          development and have experience implementing and deploying full-stack
          applications for enterprise clients. In my spare time I enjoy
          powerlifting, travelling, reading, and playing chess. Feel free to get
          in touch at any of the contacts below if you&apos;d like to chat!
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Work Experience</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Freelance Web Developer</h3>
            <p className="text-sm text-gray-600">December 2024 - Present</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Undergraduate Admissions Interviewer - University of Oxford
            </h3>
            <p className="text-sm text-gray-600">December 2024</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Undergraduate Tutor - University of Oxford
            </h3>
            <p className="text-sm text-gray-600">October 2023 - Present</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Private Tutor</h3>
            <p className="text-sm text-gray-600">August 2019 - October 2024</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Education</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              PhD in AI & Robotics - University of Oxford
            </h3>
            <p className="text-sm text-gray-600">Oxford Robotics Institute</p>
            <p className="text-sm text-gray-600">October 2022 - Present</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              MEng Engineering Science, 1st class - University of Oxford
            </h3>
            <p className="text-sm text-gray-600">October 2018 - June 2022</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">Skills</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">AI & Robotics</h3>
            <ul className="list-disc pl-4">
              <li>
                Extensive experience researching, developing, and deploying
                maching learning models for robotics applications using PyTorch
                and performing robotics simulation with Isaac Sim.
              </li>
              <li>
                Proficiency using ROS and real-time C++ for embedded systems,
                with particular focus on implementing ML controllers for
                quadrupedal robots.
              </li>
              <li>
                Subject matter expert on diffusion models, including their
                application to robotics and control systems with a paper
                submitted to ICRA 2025 currently under review.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Web Development</h3>
            <ul className="list-disc pl-4">
              <li>
                Full-stack developer with expertise in modern
                JavaScript/TypeScript frameworks including React, Next.js, and
                Astro.
              </li>
              <li>
                Strong background in developing enterprise-level applications,
                from gathering client requirements to designing and deploying
                scalable and responsive systems.
              </li>
            </ul>
          </div>
        </div>
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
