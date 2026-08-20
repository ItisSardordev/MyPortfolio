'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { socials } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ContactSection() {
  return (
    <section
      id="contact"
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
          (04) — Contact
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </motion.div>

      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="font-serif text-[12vw] leading-[0.95] tracking-tightest text-paper md:text-[8vw] lg:text-[7rem]"
      >
        Let&apos;s make
        <br />
        something good.
      </motion.h2>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-16 grid gap-16 md:mt-24 md:grid-cols-12"
      >
        <div className="md:col-span-5">
          <p className="max-w-md text-pretty text-base leading-relaxed text-paper-muted md:text-lg">
            I take on a small number of engagements each year — product design,
            engineering, or the rare founding role. If the work is ambitious
            and the constraints are honest, I&apos;d like to hear about it.
          </p>
          <a
            href="mailto:sardor.cm.1287@gmail.com"
            className="group mt-10 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.18em] text-paper"
          >
            hello@Sardor_design&code.studio
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ul className="border-t border-hairline">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-hairline py-6 transition-colors duration-300 hover:bg-ink-soft"
                >
                  <span className="font-serif text-2xl text-paper transition-transform duration-500 group-hover:translate-x-3 md:text-3xl">
                    {social.label}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-paper-muted transition-colors group-hover:text-paper">
                      {social.handle}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-paper-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.footer
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-32 flex flex-col items-start justify-between gap-6 border-t border-hairline pt-8 md:mt-48 md:flex-row md:items-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
          © 2026 Sardor — All rights reserved
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-dim">
          Designed & built in Tokyo
        </p>
      </motion.footer>
    </section>
  );
}
