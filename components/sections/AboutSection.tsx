'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48"
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mb-16 flex items-center gap-4 md:mb-24"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
          (02) — About
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </motion.div>

      <motion.div style={{ y }} className="grid gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="font-serif text-3xl leading-tight tracking-tight text-paper md:text-5xl lg:text-6xl"
          >
            I build software the way a sculptor works stone — removing what
            isn&apos;t needed until only the essential remains.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="mt-12 space-y-6 text-base leading-relaxed text-paper-muted md:text-lg"
          >
            <p>
              For the last decade I&apos;ve operated at the seam between design
              and engineering — first as a product designer shipping interfaces
              for early-stage startups, then as a founder building tools other
              makers use. The thread through all of it is a belief that the
              best products feel inevitable, as though no other arrangement
              were possible.
            </p>
            <p>
              I work independently now. Small surface, deep attention. I take
              on a handful of engagements a year and prefer projects where the
              brief is ambitious and the constraints are honest.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-8 border-l border-hairline pl-8"
          >
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
                Experience
              </dt>
              <dd className="mt-2 font-serif text-2xl text-paper">10+ years</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
                Based in
              </dt>
              <dd className="mt-2 font-serif text-2xl text-paper">
                Lisbon, PT
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
                Currently
              </dt>
              <dd className="mt-2 font-serif text-2xl text-paper">
                Building a studio
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
                Available
              </dt>
              <dd className="mt-2 font-serif text-2xl text-paper">
                Q1 2026
              </dd>
            </div>
          </motion.dl>
        </div>
      </motion.div>

      <div className="mt-32 grid gap-12 md:mt-48 md:grid-cols-2 md:gap-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
            Design Philosophy
          </h3>
          <p className="mt-6 font-serif text-2xl leading-snug tracking-tight text-paper md:text-3xl">
            Restraint is a feature. Every element on a screen is a claim on
            someone&apos;s attention — so each one has to earn its place.
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted md:text-lg">
            I start from typography and hierarchy, not decoration. A page should
            be legible in grayscale before a single color is applied. Motion is
            used to clarify relationships, never to perform. The goal is
            interfaces that feel calm, confident, and quietly considered.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
            Development Philosophy
          </h3>
          <p className="mt-6 font-serif text-2xl leading-snug tracking-tight text-paper md:text-3xl">
            Code is a medium, not a trophy. The measure of a codebase is how
            easily the next person can change it — not how cleverly it was
            written.
          </p>
          <p className="mt-6 text-base leading-relaxed text-paper-muted md:text-lg">
            I favor small, composable pieces over grand abstractions. Types do
            the documenting. Tests guard the behavior that matters. I ship
            early, watch how a thing actually gets used, and let reality inform
            the next iteration rather than defending the original plan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
