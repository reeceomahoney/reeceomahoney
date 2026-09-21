import { Figure } from "@/components/paper/figure";
import { LinkButton } from "@/components/paper/link-button";

export const metadata = {
  title:
    "DetAug: Obstacle-Blind Trajectory Augmentation for Zero-shot Obstacle Avoidance",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="mx-4 mt-12 mb-24 max-w-3xl space-y-12 px-4 text-center md:mx-auto md:px-0">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          DetAug: Obstacle-Blind Trajectory Augmentation for Zero-shot Obstacle
          Avoidance
        </h1>
        <p className="mb-2 text-lg md:text-xl">
          Reece O&apos;Mahoney<sup>1</sup>, Moritz Zoellner<sup>2</sup>, Ioannis
          Havoutis<sup>1</sup>
        </p>
        <p>
          <sup>1</sup>Oxford Robotics Institute, University of Oxford
          <br />
          <sup>2</sup>Purdue University
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <LinkButton
          href="https://arxiv.org/abs/2609.18395"
          icon="/icons/arxiv.svg"
          iconAlt="arXiv logo"
        >
          Paper
        </LinkButton>
        <LinkButton
          href="https://github.com/reeceomahoney/detaug"
          icon="/icons/github.svg"
          iconAlt="GitHub logo"
        >
          Code
        </LinkButton>
      </div>

      <iframe
        src="https://www.youtube.com/embed/66RCuDwZ0QQ"
        title="detaug video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-[200px] w-full shadow-lg md:h-[432px]"
      ></iframe>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Overview</h2>
        <p className="text-left leading-relaxed">
          Policies for robotic manipulation are produced by training on large
          teleoperated datasets. These datasets typically consist of free-space
          trajectories, making them difficult to transfer to test-time
          environments with obstacles. Previous methods for closing this gap
          have largely fallen into two groups. Dataset augmentation addresses it
          at training time but needs obstacle geometry in advance, whereas
          steering an existing checkpoint at inference time avoids that
          requirement but is limited in flexibility. Our method draws from both
          areas without inheriting either drawback. DetAug applies an
          obstacle-blind augmentation scheme to the transit phases of a
          free-space dataset, leaving object interactions untouched, and records
          the augmentation parameters as an explicit conditioning label. At
          inference it samples a batch of labels and executes the trajectory
          with the lowest collision cost. On the SafeLIBERO benchmark DetAug
          achieves a collision-free success rate more than 20pp above the next
          best method, and selecting over the label space outperforms guidance
          on the same policy by 26pp. On real hardware, inference-time steering
          methods collapse on tasks requiring large detours, while DetAug
          matches or exceeds an obstacle-conditioned baseline without ever
          seeing obstacles in training.
        </p>
        <Figure
          src="/publications/detaug/teaser.png"
          alt="DetAug on hardware avoiding an unseen obstacle"
          width={720}
          height={707}
          className="mx-auto w-full shadow-lg md:w-2/3"
          caption="Figure 1: DetAug on hardware. A policy trained only on free-space demos augmented with random detours avoids an obstacle never seen in training. At each replan, a batch of detours (grey) is sampled from the label space and the collision-free candidate (blue) is executed."
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Method</h2>
        <Figure
          src="/publications/detaug/overview.png"
          alt="Overview of DetAug"
          width={2274}
          height={652}
          caption="Figure 2: Overview of DetAug. (a) Transit phases of free-space demos are replaced with random arcs, keeping grasp and release intact; the arc parameters form a low-dimensional label. (b) The label is injected into a flow-matching policy via AdaLN-Zero. (c) At inference, K labels are sampled, each yields a trajectory, and the lowest collision-cost candidate (blue) is executed."
        />
        <p className="text-left leading-relaxed">
          DetAug (Detour Augmentation) starts from a dataset of free-space
          teleoperated demonstrations and augments them with randomly generated
          arcs, recording the augmentation parameters as a conditioning
          variable. A flow-matching policy is then trained to recreate these
          trajectories, with the augmentation label injected into the model via
          AdaLN-Zero. At inference, the policy samples a batch of plans with
          different randomly sampled labels from the training support, scores
          them with an analytic collision cost, and executes the best
          trajectory. Steering methods assume the required modes already exist
          in the prior, and augmentation methods assume the obstacles are known.
          DetAug assumes neither.
        </p>
        <p className="text-left leading-relaxed">
          <b>Detour augmentation.</b> Demonstrations are first split into
          interaction and transit phases. Interaction phases are a fixed window
          around each gripper transition, and transit phases are the motion
          between them: an <i>approach</i> from the start to the grasp, and a{" "}
          <i>carry</i> from the grasp to the release. Each transit phase, minus
          a margin on either side, is replaced with a circular arc of a sampled
          half-angle φ, lying in a plane rotated by a sampled angle θ about the
          original chord. The label for an arc is its half-angle expressed as a
          2D vector in the direction of the plane rotation, so a grasp carries a
          4-dimensional label. This gives a smooth, continuous parameterisation
          that is zero for unbent demos. Samples are checked for kinematic
          feasibility and joint motion smoothness, and any that fail are
          rejected. Only the transit phases are modified; the grasp and release
          windows are preserved exactly, so avoidance can never corrupt an
          object interaction.
        </p>
        <Figure
          src="/publications/detaug/trajectories.png"
          alt="Example detour augmentations"
          width={1650}
          height={1050}
          caption="Figure 3: Example detour augmentations. Each panel shows an original end-effector demonstration and several augmented variants, with the approach and carry phases replaced by arcs of varying half-angle φ and plane rotation θ, while the grasp and release windows are left unchanged."
        />
        <p className="text-left leading-relaxed">
          <b>Architecture.</b> The policy is a DiT-style transformer trained
          with a conditional flow matching loss. It outputs a chunk of states
          and actions and replans every few action steps, like a standard action
          chunking model. The conditioning vector is the sum of an embedding of
          the flow-matching time and an embedding of the augmentation label, and
          is injected through AdaLN-Zero conditioning. This also makes it easy
          to graft the augmentation label onto an existing pre-trained policy.
        </p>
        <p className="text-left leading-relaxed">
          <b>Inference-time selection.</b> At inference a batch of K labels is
          sampled uniformly from within the training support, and a trajectory
          is generated for each, conditioned on the current observation. This is
          repeated with a fresh batch at every replan rather than latching the
          first choice, since an early pick made under a partial view of the
          scene is rarely the best one later. Trajectories are scored with a
          collision cost computed from points sampled along the robot&apos;s
          surface against a signed distance field of the obstacle. Trajectories
          are scored by penetration only rather than clearance, as clearance
          tended to produce overly circuitous paths that hurt task success.
          Geometry is used only to rank candidates, never to construct
          trajectories.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Results</h2>
        <p className="text-left leading-relaxed">
          <b>SafeLIBERO benchmark.</b> We evaluate on the simulated SafeLIBERO
          benchmark, where the training data is the standard LIBERO scenes but
          random obstacles are inserted at test time. Baselines are DemoGen (a
          train-time method with access to the obstacle geometries during
          training), AEGIS (a purely inference-time CBF-QP applied to a frozen
          policy&apos;s output) and CAPE (an inference-time method applying
          collision guidance to a re-noised copy of the unexecuted plan). DetAug
          achieves a 52.2% collision-free success rate averaged over the four
          suites, more than 20pp above the next best method (CAPE at 30.6%), and
          the best total success rate of 67.6%. The inference-time methods have
          high avoidance rates but low success, often ending in timeouts as the
          policy is unable to find a feasible path. DemoGen, despite having
          obstacle geometry, is conditioned on a single point cloud embedding
          that proves too weak a signal to push trajectories along significantly
          different paths.
        </p>
        <div className="overflow-x-auto">
          <table className="mx-auto text-sm">
            <caption className="pb-2 text-sm">
              Table 1: Results on SafeLIBERO averaged over the four suites (%).
              Clean is collision-free success, Total is success irrespective of
              collisions, Avoid is the collision avoidance rate.
            </caption>
            <thead>
              <tr className="border-b border-gray-400">
                <th className="px-4 py-1 text-left">Method</th>
                <th className="px-4 py-1">Clean</th>
                <th className="px-4 py-1">Total</th>
                <th className="px-4 py-1">Avoid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-1 text-left font-semibold">
                  DetAug (ours)
                </td>
                <td className="px-4 py-1 font-semibold">52.2</td>
                <td className="px-4 py-1 font-semibold">67.6</td>
                <td className="px-4 py-1">65.4</td>
              </tr>
              <tr>
                <td className="px-4 py-1 text-left">DemoGen</td>
                <td className="px-4 py-1">20.3</td>
                <td className="px-4 py-1">54.9</td>
                <td className="px-4 py-1">26.3</td>
              </tr>
              <tr>
                <td className="px-4 py-1 text-left">CAPE</td>
                <td className="px-4 py-1">30.6</td>
                <td className="px-4 py-1">36.0</td>
                <td className="px-4 py-1 font-semibold">74.7</td>
              </tr>
              <tr>
                <td className="px-4 py-1 text-left">AEGIS</td>
                <td className="px-4 py-1">26.6</td>
                <td className="px-4 py-1">35.9</td>
                <td className="px-4 py-1">64.2</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-left leading-relaxed">
          <b>Selection vs guidance.</b> To compare selection over the label
          space against guidance, we train the policy with the label randomly
          dropped out for a null token so that the same collision cost can be
          used as a guidance gradient. Guidance on the null token performs 26pp
          worse than label selection, and mixed variants also perform worse. We
          hypothesise that the 4-dimensional label reduces the search space
          compared with the full state and action space, and that the label
          parameterises the clean sample whereas guidance acts on off-manifold
          noisy intermediates. Increasing the number of sampled labels K raises
          success monotonically, and random labels beat zero-valued
          (unaugmented) labels at every batch size.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <Figure
            src="/publications/detaug/selection.png"
            alt="Selection vs guidance results"
            width={1650}
            height={1200}
            className="mx-auto w-full shadow-lg"
            caption="Figure 4: Collision-free success on the SafeLIBERO spatial suite for DetAug's label selection against guidance and mixed variants."
          />
          <Figure
            src="/publications/detaug/ncond.png"
            alt="Effect of the number of sampled labels"
            width={1650}
            height={950}
            className="mx-auto w-full shadow-lg"
            caption="Figure 5: Collision-free success as the number of sampled labels K varies, for random and zero-valued labels."
          />
        </div>
        <p className="text-left leading-relaxed">
          <b>Adapting a pre-trained policy.</b> To add obstacle avoidance to an
          existing policy, we adapt a base policy trained on the unaugmented
          dataset via AdaLN, injecting either the augmentation label (DetAug) or
          a point cloud embedding (DemoGen). With a frozen backbone and a 3M
          parameter adapter, DetAug reaches 35% success versus 2% for DemoGen,
          which is worse than the base policy&apos;s 6%. With full fine-tuning
          DemoGen is able to beat DetAug in success rate, albeit with a greater
          number of training steps.
        </p>
        <Figure
          src="/publications/detaug/finetune.png"
          alt="Fine-tuning results"
          width={1650}
          height={1500}
          className="mx-auto w-full shadow-lg md:w-2/3"
          caption="Figure 6: Success and collision rates over fine-tuning steps when adapting a pre-trained base policy with DetAug and DemoGen, training either the AdaLN adapter only or the full policy."
        />
        <p className="text-left leading-relaxed">
          <b>Hardware.</b> We train a policy on a pick-and-place task from
          free-space demonstrations, then roll out each method with four
          obstacles of different shapes placed at random positions, 10 rollouts
          per obstacle type. DetAug is the best performing method at 87.5%
          average success, with DemoGen second at 80%; DemoGen&apos;s failures
          mainly came from moving straight through the obstacle where large
          detours were required. The inference-time methods collapse to 35%
          (CAPE) and 30% (AEGIS). They struggle with significant detours from
          the prior, and because neither separates grasping from transit, their
          corrections interfere with the object interaction, an issue DetAug
          avoids by construction.
        </p>
        <Figure
          src="/publications/detaug/hardware.png"
          alt="Hardware experiments"
          width={1945}
          height={493}
          className="mx-auto w-full shadow-lg"
          caption="Figure 7: DetAug rollouts on the pick-and-place task with the four test-time obstacles: cups, tube, jar and rack. The policy was trained on free-space demos only."
        />
        <p className="text-left leading-relaxed">
          In summary, DetAug adapts manipulation policies with zero-shot
          obstacle avoidance without any knowledge of the test-time environment
          during training. It significantly outperforms prior methods on a broad
          suite of simulation tasks, selection over the augmentation label
          outperforms guidance on the same policy, and on real hardware it
          matches or exceeds an obstacle-conditioned baseline that saw obstacles
          in training. In future work we would like to scale this method to a
          large VLA model and to tasks requiring greater dexterity.
        </p>
      </section>
    </div>
  );
}
