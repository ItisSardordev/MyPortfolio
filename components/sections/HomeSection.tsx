'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero3D } from '@/components/Hero3D';

const roles = ['Designer.', 'Programmer.', 'Founder.'];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const lineReveal = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HomeSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <Hero3D />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12"
      >
        <motion.div variants={lineReveal} className="reveal-mask mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
            Portfolio — 2026
          </p>
        </motion.div>

        <div className="space-y-1 md:space-y-2">
          {roles.map((role) => (
            <div key={role} className="reveal-mask block">
              <motion.h1
                variants={lineReveal}
                className="font-serif text-[14vw] leading-[0.95] tracking-tightest text-paper md:text-[10vw] lg:text-[9rem]"
              >
                {role}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          variants={lineReveal}
          className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-pretty text-base leading-relaxed text-paper-muted md:text-lg">
            I&apos;m Sardor — an independent designer, programmer, and founder
            building digital products at the intersection of aesthetics and
            engineering. Currently shaping a studio focused on considered
            software.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-8 w-px bg-paper-muted"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
