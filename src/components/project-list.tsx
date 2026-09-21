import Image from "next/image";
import { projects } from "@/lib/projects";

export function ProjectList() {
  return (
    <ul className="space-y-6">
      {projects.map((project) => (
        <li key={project.title} className="flex gap-4">
          <Image
            src={project.image}
            alt={project.title}
            width={160}
            height={100}
            className="mt-1 h-auto w-[96px] shrink-0 rounded-sm border border-rule sm:w-[120px]"
          />
          <div>
            {project.href ? (
              <a href={project.href} className="font-bold text-fg">
                {project.title}
              </a>
            ) : (
              <span className="font-bold">{project.title}</span>
            )}
            <p className="text-sm text-muted">{project.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
