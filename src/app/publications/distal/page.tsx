import { Figure } from "@/components/paper/figure";
import { LinkButton } from "@/components/paper/link-button";

export const metadata = {
  title: "DistAL: Distance-based Advantage Learning for VLA Fine-Tuning",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="mx-4 mt-12 mb-24 max-w-3xl space-y-12 px-4 text-center md:mx-auto md:px-0">
      <div>
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          DistAL: Distance-based Advantage Learning for VLA Fine-Tuning
        </h1>
        <p className="mb-2 text-lg md:text-xl">
          Reece O&apos;Mahoney, Ioannis Havoutis
        </p>
        <p>Oxford Robotics Institute, University of Oxford</p>
      </div>

      <div className="flex justify-center gap-4">
        <LinkButton
          href="https://arxiv.org/abs/2609.18392"
          icon="/icons/arxiv.svg"
          iconAlt="arXiv logo"
        >
          Paper
        </LinkButton>
        <LinkButton
          href="https://github.com/reeceomahoney/distal"
          icon="/icons/github.svg"
          iconAlt="GitHub logo"
        >
          Code
        </LinkButton>
      </div>

      <iframe
        src="https://www.youtube.com/embed/HSWYzTzYNC4"
        title="distal video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-[200px] w-full shadow-lg md:h-[432px]"
      ></iframe>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Overview</h2>
        <p className="text-left leading-relaxed">
          Vision-language-action models (VLAs) have transformed the field of
          robotic manipulation in recent years by combining the semantic
          understanding of LLMs with the precise control of flow-matching
          policies. Advantage conditioning is a recent technique that
          iteratively improves VLAs by training a value function on deployment
          data and using this to train an advantage-conditioned policy. Previous
          works have only applied simple, low-information success/failure
          rewards, which leave the value function unable to distinguish states
          of differing quality beyond how far along the task they appear.
          Motivated by an exploration of out-of-distribution (OOD) detection
          methods, we introduce Distance-based Advantage Learning (DistAL),
          which, by using an embedding space distance as a reward, produces a
          more informative value function and subsequently a higher downstream
          task success rate. We validate our method on a series of simulation
          benchmarks and dexterous bi-manual manipulation tasks on real
          hardware.
        </p>
        <Figure
          src="/publications/distal/overview.png"
          alt="Overview of DistAL"
          width={2839}
          height={983}
          caption="Figure 1: Overview of DistAL. Instead of the sparse success/failure reward used by prior advantage-conditioning methods, we score each deployment observation by its k-nearest-neighbours distance to the base VLA's training distribution in SigLIP feature space. The resulting dense reward yields a more informative value function and, in turn, a stronger advantage-conditioned policy."
        />
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Method</h2>
        <p className="text-left leading-relaxed">
          The advantage-conditioning pipeline that DistAL builds on trains a
          value function on deployment trajectories annotated with per-timestep
          rewards, computes the advantage at each timestep, thresholds it into a
          binary positive/negative label, and fine-tunes the VLA on that label
          using classifier-free guidance. So far this pipeline has only been
          paired with a binary success/failure reward with a constant per-step
          penalty, which means the only factor that raises a state&apos;s value
          is the estimated number of steps remaining. An unstable grasp that
          barely holds an object and a secure one receive the same value despite
          very different odds of eventual success. DistAL is a drop-in
          replacement for that reward signal, with the policy, value function
          and training procedure left unchanged, isolating reward design as the
          single variable.
        </p>
        <p className="text-left leading-relaxed">
          <b>kNN feature-distance reward.</b> DistAL is motivated by the idea
          that failure trajectories will be out-of-distribution when compared to
          a reference dataset of successes. We build an index of embeddings over
          all observations in the dataset used to train the base VLA, using the
          same fine-tuned SigLIP vision encoder as the base VLA. For any
          observation encountered at deployment, its score is the mean distance
          in embedding space to its k nearest neighbours in that index, and the
          per-timestep reward is the negative of this distance. Because a policy
          could in principle raise this reward by remaining in familiar states
          rather than progressing, we retain the large terminal penalty on
          failed episodes from prior work. The dense distance supplies a
          per-step signal of how far the policy has drifted from the training
          distribution, while the failure penalty preserves a strong signal of
          eventual task success.
        </p>
        <Figure
          src="/publications/distal/arch.png"
          alt="DistAL architecture"
          width={3130}
          height={1421}
          className="mx-auto w-full shadow-lg md:w-3/4"
          caption="Figure 2: DistAL architecture. The value function is trained on deployment data using the kNN feature-distance reward, and the resulting advantage label is injected into the VLA via classifier-free guidance."
        />
        <p className="text-left leading-relaxed">
          <b>Architecture and training.</b> The value function consists of a
          pre-trained Gemma3 270M language model and a 400M SigLIP vision
          encoder, receiving the same image, language and state conditioning
          that the policy observes, with a small MLP head predicting a
          categorical distribution over discretised return bins. It is fit by
          Monte Carlo regression onto the full-episode return. The policy is a
          fine-tuned π<sub>0.5</sub> model. The binary advantage label is
          injected by appending the text &ldquo;Advantage: positive&rdquo; or
          &ldquo;Advantage: negative&rdquo; to the tokenised language input,
          with the threshold set so that 30% of labels are positive. Training
          proceeds in three steps: score every deployment observation with the
          kNN distance, fit the value function and label each timestep by its
          advantage, then fine-tune the VLA on the label, dropping it to a null
          token with some probability so that classifier-free guidance can be
          applied at inference.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Results</h2>
        <p className="text-left leading-relaxed">
          <b>OOD detection as a failure predictor.</b> We first ask which metric
          best predicts task success, collecting rollouts from the base π
          <sub>0.5</sub> policy on LIBERO, LIBERO-plus and two bi-manual
          hardware tasks, and reporting AUROC at both the per-trajectory and
          per-timestep level. The kNN distance on SigLIP features is the
          strongest detector on both measures (0.82 per-trajectory and 0.67
          per-timestep mean), ahead of a VAE likelihood (0.79 and 0.65),
          Mahalanobis distance in the same feature space (0.71), kNN on the
          language model&apos;s image tokens (0.57) and action-chunk variance
          (0.58). The gap between successful and failed rollouts opens
          progressively through the episode rather than only at the terminal
          frame.
        </p>
        <Figure
          src="/publications/distal/rewards.png"
          alt="Per-step rewards along successful and failed rollouts"
          width={3000}
          height={900}
          className="mx-auto w-full shadow-lg"
          caption="Figure 3: Per-step rewards along a successful and a failed rollout of the same task, averaged over 10 random episodes of each and min-max normalised per method. The kNN score separates the two outcomes far more cleanly than the other embedding-based detectors, which repeatedly cross over."
        />
        <p className="text-left leading-relaxed">
          <b>Simulation.</b> We evaluate on LIBERO-10 and LIBERO-plus against
          the base π<sub>0.5</sub>, SFT on success-filtered deployment data, and
          a RECAP-style binary reward with the identical pipeline. DistAL is the
          strongest method on every aggregate, with the best LIBERO-10 score
          (96.2%) and highest overall mean (78.4%, +3.3 over base). The largest
          gains are on the perturbations the base handles worst: Camera (+25.2
          over base), Noise (+14.1) and Texture (+10.7, reaching 100%). Against
          the binary-reward baseline, DistAL wins on 5 of the 8 columns, with
          its largest individual gains on Camera (+4.8) and Texture (+7.7).
        </p>
        <p className="text-left leading-relaxed">
          <b>Hardware.</b> We use a bi-manual setup of two Piper arms on two
          contact-rich tasks: <i>remove pen lid</i> and{" "}
          <i>remove ethernet cable</i>. On the ethernet task, DistAL reaches 87%
          against 46% for the base policy and 72% for the binary reward. On the
          pen lid task DistAL is again best at 52%, a 10-point gain over base
          but only 4 points above the binary reward. This split matches the
          failure-prediction results: ethernet failures are visually obvious,
          while pen-lid failures are a correctly formed grasp that slips under
          load, which the image does not show. DistAL is therefore most useful
          when a task&apos;s failure modes are visually distinguishable from its
          success modes.
        </p>
        <Figure
          src="/publications/distal/tasks.png"
          alt="Keyframes of the two bi-manual tasks"
          width={2400}
          height={627}
          className="mx-auto w-full shadow-lg"
          caption="Figure 4: Keyframes of the two bi-manual Piper tasks: remove pen lid (top) and remove ethernet cable (bottom)."
        />
        <Figure
          src="/publications/distal/results.png"
          alt="Hardware success rates"
          width={3447}
          height={2045}
          className="mx-auto w-full shadow-lg md:w-3/4"
          caption="Figure 5: Success rate on the two bi-manual tasks, averaged over 50 rollouts per task."
        />
        <p className="text-left leading-relaxed">
          In summary, DistAL replaces the sparse success/failure reward in
          advantage-conditioned VLA fine-tuning with a dense per-step reward
          based on the k-nearest-neighbours distance to the base VLA&apos;s
          training distribution, keeping the rest of the pipeline fixed. This
          distance is the strongest predictor of failure among a range of OOD
          detection baselines, and the resulting policy improves over the base π
          <sub>0.5</sub> on LIBERO-10, LIBERO-plus and two bi-manual tasks on
          real hardware, and over the binary-reward baseline where failure is
          visually separable from success.
        </p>
      </section>
    </div>
  );
}
