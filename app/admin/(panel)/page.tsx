'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAllContent } from '@/lib/queries';
import type { Project, Social, SiteContent } from '@/lib/types';
import { FolderKanban, Link2, FileText, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllContent()
      .then(({ projects, socials, siteContent }) => {
        setProjects(projects);
        setSocials(socials);
        setContent(siteContent);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      icon: FolderKanban,
      href: '/admin/projects',
    },
    {
      label: 'Social Links',
      value: socials.length,
      icon: Link2,
      href: '/admin/socials',
    },
    {
      label: 'Site Content',
      value: content ? '1' : '0',
      icon: FileText,
      href: '/admin/site-content',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-paper">Dashboard</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
        Overview of your portfolio content
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="group border border-hairline bg-ink-soft p-6 transition-colors hover:border-paper-muted"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-paper-muted" />
                <ArrowUpRight className="h-4 w-4 text-paper-dim transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper" />
              </div>
              <div className="mt-8">
                <div className="font-serif text-4xl text-paper">
                  {loading ? '—' : stat.value}
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
                  {stat.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
          Recent Projects
        </h2>
        <div className="mt-6 border-t border-hairline">
          {loading ? (
            <div className="py-8 text-center font-mono text-xs text-paper-dim">
              Loading...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-paper-dim">
              No projects yet.
            </div>
          ) : (
            projects.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                href="/admin/projects"
                className="group flex items-center justify-between border-b border-hairline py-4 transition-colors hover:bg-ink-soft"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-paper-dim">
                    {String(project.sort_order).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-lg text-paper">
                    {project.title}
                  </span>
                </div>
                <span className="font-mono text-xs text-paper-muted">
                  {project.category} · {project.year}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
