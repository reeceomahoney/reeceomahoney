import Image from "next/image";

export const metadata = {
  title: "Improving Trajectory Stitching with Flow Models",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="mx-4 mb-24 mt-12 max-w-3xl space-y-12 px-4 text-center md:mx-auto md:px-0">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          Improving Trajectory Stitching with Flow Models
        </h1>
        <p className="mb-2 text-lg md:text-xl">
          Reece O&apos;Mahoney, Wanming Yu, Ioannis Havoutis
        </p>
        <p>Oxford Robotics Institute, University of Oxford</p>
      </div>

      <div className="flex justify-center gap-4">
        <button className="rounded-3xl bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 md:px-6">
          <a
            href="https://arxiv.org/abs/2505.07802"
            className="flex items-center gap-2"
          >
            <Image
              src="/arxiv-logomark-small.svg"
              alt="ArXiv logo"
              width={24}
              height={24}
            />
            Paper
          </a>
        </button>
        <button className="rounded-3xl bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 md:px-6">
          <a
            href="https://github.com/reeceomahoney/flow_planning"
            className="flex items-center gap-2"
          >
            <Image
              src="/github-mark-white.svg"
              alt="GitHub logo"
              width={24}
              height={24}
            />
            Code
          </a>
        </button>
      </div>

      <iframe
        src="https://www.youtube.com/embed/v_vLEPF8ZuU"
        className="h-[200px] w-full shadow-lg md:h-[432px]"
      ></iframe>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Overview</h2>
        <p className="text-left leading-relaxed">
          Generative models have shown great promise as trajectory planners,
          given their affinity to modeling complex distributions and guidable
          inference process. Previous works have successfully applied these in
          the context of robotic manipulation but perform poorly when the
          required solution does not exist as a complete trajectory within the
          training set. We identify that this is a result of being unable to
          plan via <i>stitching</i>, and subsequently address the architectural
          and dataset choices needed to remedy this. On top of this, we propose
          a novel addition to the training and inference procedures to both
          stabilize and enhance these capabilities. We demonstrate the efficacy
          of our approach by generating plans with out of distribution boundary
          conditions and performing obstacle avoidance on the Franka Panda in
          simulation and on real hardware. In both of these tasks our method
          performs significantly better than the baselines and is able to avoid
          obstacles up to four times as large.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Flow Planner</h2>
        <figure>
          <Image
            src="/flow_overview.png"
            alt="Stitching results"
            width={800}
            height={600}
            className="mx-auto w-full shadow-lg md:w-11/12"
          />
          <figcaption className="pt-2">
            Figure 1: Overview: We use a flow model with three key components: a
            local receptive, field, dataset augmentation with out addition, and
            trajectory splitting at train time and test time. This allows us to
            have significant improved stitching capabilities, and more flexible
            guided planning, leading an ability to avoid much larger obstacles
            than previous methods.
          </figcaption>
        </figure>
        <p className="text-left leading-relaxed">
          We propose three improvements to fix stitching. Firstly, we identify
          that a model architecture with what we call a “local receptive field”
          is required to avoid exposing global information. Our experiments show
          that without this, the model is strongly biased towards merely
          selecting whole trajectories that already exist. A local receptive
          field instead drives the model to only optimize for local consistency
          and thus allows for a more flexible global structure.
        </p>
        <p className="text-left leading-relaxed">
          Secondly, we found that action noise addition was crucial to allowing
          the model to “jump” between existing clips at points where they
          overlap. This was uniquely effective when compared to other dataset
          augmentation schemes, which we hypothesise is due to the breaking of
          the correlation between the joint states.
        </p>
        <p className="text-left leading-relaxed">
          Lastly, to both prevent mode collapse, and reduce dynamics
          inconsistencies, we apply a technique we call trajectory splitting,
          which differs based on when it is applied. At training time, this
          consists of randomly mixing half-length trajectories into the training
          batch. At inference time, this consists of partially renoising the
          trajectory after the first inference loop, splitting it in two, and
          then denoising each half separately.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Results</h2>
        <p className="text-left">
          Using the combination of these techniques we create a method called
          Flow Planner and compare it to previous approaches in two ways.
          Firstly, we demonstrate its stitching capabilities by successfully
          producing plans with out of distribution boundary conditions. We
          define the stitching error as the distance between the last generated
          state and the boundary condition on each end of the trajectory. Tables
          1 and 2 show we are able to produce OOD trajectories more consistently
          than previous methods and also highlight the importance of each of our
          modifications.
        </p>
        <figure>
          <Image
            src="/flow_planner_table_1.png"
            alt="Stitching results"
            width={800}
            height={600}
            className="mx-auto w-full shadow-lg md:w-11/12"
          />
          <figcaption className="pt-2">
            Table 1: Effects of architecture choice on stitching error
          </figcaption>
        </figure>
        <figure>
          <Image
            src="/flow_planner_table_2.png"
            alt="Stitching results"
            width={800}
            height={600}
            className="mx-auto w-full shadow-lg md:w-11/12"
          />
          <figcaption className="pt-2">
            Table 2: Effects of Dataset augmentation on stitching error
          </figcaption>
        </figure>
        <p className="text-left leading-relaxed">
          Secondly, we apply it to an obstacle avoidance problem where no single
          trajectory is a complete solution, hence also requiring stitching.
          Flow planner is able to both plan more successfully, and avoid much
          larger obstacles than previous methods. As shown in the figure below.
        </p>

        <figure>
          <Image
            src="/obstacle.png"
            alt="Guided planning results"
            width={800}
            height={600}
            className="mx-auto w-full shadow-lg md:w-11/12"
          />
          <figcaption className="pt-2">
            Figure 2: Performance benchmark in an obstacle avoidance task on a
            Franka arm in simulation. Left: Sample trajectories from obstacle
            avoidance experiments. Right: Maximum obstacle radius. that each
            method was able to reliably avoid.
          </figcaption>
        </figure>
        <p className="text-left leading-relaxed">
          We lastly demonstrate our methods generalisability by deploying it
          onto real hardware.
        </p>
        <figure>
          <Image
            src="/hardware.png"
            alt="Stitching results"
            width={800}
            height={600}
            className="mx-auto w-full shadow-lg md:w-11/12"
          />
          <figcaption className="pt-2">
            Figure 3: Hardware deployment, the top row shows an unguided plan
            and the bottom a guided one.
          </figcaption>
        </figure>
        <p className="text-left leading-relaxed">
          In conclusion, we present a novel, flow matching based planner for
          robotic manipulation that, through superior stitching abilities, is
          able to plan more flexibly, and robustly than previous methods.
        </p>
      </section>
    </div>
  );
}
