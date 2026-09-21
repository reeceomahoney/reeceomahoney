export type Publication = {
  slug: string;
  title: string;
  authors: string;
  venue: string;
  arxiv: string;
  code: string;
};

export const publications: Publication[] = [
  {
    slug: "detaug",
    title:
      "DetAug: Obstacle-Blind Trajectory Augmentation for Zero-shot Obstacle Avoidance",
    authors: "Reece O'Mahoney, Moritz Zoellner, Ioannis Havoutis",
    venue: "arXiv preprint, 2026",
    arxiv: "https://arxiv.org/abs/2609.18395",
    code: "https://github.com/reeceomahoney/detaug",
  },
  {
    slug: "distal",
    title: "DistAL: Distance-based Advantage Learning for VLA Fine-Tuning",
    authors: "Reece O'Mahoney, Ioannis Havoutis",
    venue: "arXiv preprint, 2026",
    arxiv: "https://arxiv.org/abs/2609.18392",
    code: "https://github.com/reeceomahoney/distal",
  },
  {
    slug: "flow_planner",
    title: "Improving Trajectory Stitching with Flow Models",
    authors: "Reece O'Mahoney, Wanming Yu, Ioannis Havoutis",
    venue: "arXiv preprint, 2025",
    arxiv: "https://arxiv.org/abs/2505.07802",
    code: "https://github.com/reeceomahoney/flow-planning",
  },
  {
    slug: "locodiff",
    title: "Offline Adaptation of Quadruped Locomotion using Diffusion Models",
    authors:
      "Reece O'Mahoney, Alexander L. Mitchell, Wanming Yu, Ingmar Posner, Ioannis Havoutis",
    venue: "ICRA 2025",
    arxiv: "https://arxiv.org/abs/2411.08832",
    code: "https://github.com/reeceomahoney/locodiff",
  },
];
