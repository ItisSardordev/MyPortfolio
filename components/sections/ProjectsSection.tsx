'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { projects, type Project } from '@/lib/data';

function ProjectRow({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group grid gap-6 border-t border-hairline py-12 md:grid-cols-12 md:gap-8 md:py-16"
    >
      <div className="md:col-span-1">
        <span className="font-mono text-xs text-paper-dim">
          {project.index}
        </span>
      </div>

      <div className="md:col-span-6">
        <div className="relative overflow-hidden">
          <motion.img
            style={{ y }}
            src={project.image}
            alt={project.title}
            className="aspect-[4/3] w-full scale-110 object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-ink/20 transition-opacity duration-500 group-hover:opacity-0" />
        </div>
      </div>

      <div className="flex flex-col justify-between md:col-span-5">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
              {project.category}
            </span>
            <span className="h-px w-6 bg-hairline" />
            <span className="font-mono text-xs text-paper-dim">
              {project.year}
            </span>
          </div>
          <h3 className="mt-4 font-serif text-3xl tracking-tight text-paper md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-paper-muted md:text-base">
            {project.description}
          </p>
        </div>

        <div className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-6">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper"
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-muted transition-colors hover:text-paper"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-12 md:py-48"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 flex items-center gap-4 md:mb-24"
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
          (03) — Selected Work
        </span>
        <span className="h-px flex-1 bg-hairline" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 max-w-4xl font-serif text-3xl leading-tight tracking-tight text-paper md:mb-32 md:text-5xl lg:text-6xl"
      >
        A small set of projects, chosen because they taught me something
        I&apos;m still using.
      </motion.h2>

      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.id} project={project} i={i} />
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
}
