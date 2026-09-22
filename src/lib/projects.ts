export type Project = {
  title: string;
  description: string;
  href?: string;
  image: string;
};

export const projects: Project[] = [
  {
    title: "LeRobot | Hugging Face",
    description:
      "Open-source contributor to Hugging Face's PyTorch library for robotics, with merged PRs across datasets, environments, and policy configuration",
    href: "https://github.com/huggingface/lerobot/pulls?q=is%3Apr+author%3Areeceomahoney",
    image: "/projects/lerobot.png",
  },
  {
    title: "SLURM Tools",
    description:
      "CLI for submitting SLURM jobs over SSH and a web GUI for monitoring them across clusters",
    href: "https://github.com/reeceomahoney/slurm-tools",
    image: "/projects/slurm-tools.png",
  },
  {
    title: "Arxiv Library",
    description: "A web app for reading and organizing arXiv papers",
    href: "https://arxiv-library.vercel.app/",
    image: "/projects/arxiv-lib.png",
  },
  {
    title: "Booking System | Leading Education",
    description:
      "Platform for booking and managing client bookings built for a private tuition company",
    image: "/projects/le-booking.png",
  },
];
