import Image from "next/image";

export default function Page() {
  return (
    <div className="mx-auto mt-12 mb-24 max-w-3xl space-y-12 text-center">
      <div>
        <h1 className="mb-4 text-6xl font-bold">
          Offline Adaptation of Quadruped Locomotion using Diffusion Models
        </h1>
        <p className="mb-2 text-xl">
          Reece O’Mahoney, Alexander L. Mitchell, Wanming Yu, Ingmar Posner,
          Ioannis Havoutis
        </p>
        <p>Oxford Robotics Institute, University of Oxford</p>
      </div>

      <div className="flex justify-center gap-4">
        <button className="rounded-3xl bg-gray-800 px-6 py-2 text-white hover:bg-gray-700">
          <a
            href="https://arxiv.org/abs/2411.08832"
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
        <button className="rounded-3xl bg-gray-800 px-6 py-2 text-white hover:bg-gray-700">
          <a
            href="https://github.com/reeceomahoney/locodiff"
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
        src="https://www.youtube.com/embed/HCrITc8e1Zs"
        className="h-[432px] w-full shadow-lg"
      ></iframe>

      <section className="space-y-8">
        <h2 className="text-4xl font-semibold">Abstract</h2>
        <p className="leading-relaxed">
          We present a diffusion-based approach to quadrupedal locomotion that
          simultaneously addresses the limitations of learning and interpolating
          between multiple skills (modes) and of offline adapting to new
          locomotion behaviours after training. This is the first framework to
          apply classNameifier-free guided diffusion to quadruped locomotion and
          demonstrate its efficacy by extracting goal-conditioned behaviour from
          an originally unlabelled dataset. We show that these capabilities are
          compatible with a multi-skill policy and can be applied with little
          modification and minimal compute overhead, i.e., running entirely on
          the robot’s onboard CPU. We verify the validity of our approach with
          hardware experiments on the ANYmal quadruped platform.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-4xl font-semibold">Approach</h2>
        <Image
          src="/method.png"
          alt="Method diagram"
          width={800}
          height={600}
          className="mx-auto w-11/12 shadow-lg"
        />
        <p className="leading-relaxed">
          Method Overview: a) A reinforcement learning agent is pre-trained with
          a hand crafted policy that generates reference trajectories. These are
          collected by rolling out the policy in an environment with randomised
          parameters for robustness. b) An embedding of the observation is
          concatenated with separate embeddings of the diffusion timestep,
          skill, and return. These together form the conditioning input. The
          multi-head transformer decoder initially takes a noise vector as
          input, applies causal self-attention, then cross-attention with the
          conditioning and produces a partially denoised vector. This process is
          repeated N times to produce a complete action trajectory. c) The
          return value is randomly masked during training, allowing us to use
          classNameifier-free guidance at test time. This is done by taking a
          weighted sum of unconditional and maximum return trajectories at each
          denoising step.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-4xl font-semibold">Results</h2>
        <Image
          src="/results_1.png"
          alt="Results diagram"
          width={800}
          height={600}
          className="mx-auto w-11/12 shadow-lg"
        />
        <p>
          After training, the model’s outputs are adjusted to recover different
          locomotion behaviours. The table above shows the velocity tracking
          error of policies trained with different target velocities. We compare
          an expert model with access to the ground truth commands to our model
          that has no access to these commands but instead aims to maximise a
          reward function via classNameifier-free guidance. Our results
          demonstrate that our method, without access to ground truth commands,
          can produce comparable velocity tracking to a model that does by using
          reward guidance.
        </p>
        <Image
          src="/results_2.png"
          alt="Results diagram"
          width={800}
          height={600}
          className="mx-auto w-11/12 shadow-lg"
        />
        <p className="leading-relaxed">
          We collect separate datasets generated by walking and crawling
          reinforcement learning policies with no transitions present between
          the two. Our model was able to learn interpolations between these two
          skills which were remarkably stable over the full range of velocity
          commands in the dataset. The bottom row of the above figure shows
          snapshots from one of these transitions when deployed on real
          hardware.
        </p>
      </section>
    </div>
  );
}