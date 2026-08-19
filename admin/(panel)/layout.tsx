'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Loader2, LayoutDashboard, FolderKanban, Link2, FileText, LogOut, ExternalLink } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/socials', label: 'Socials', icon: Link2 },
  { href: '/admin/site-content', label: 'Site Content', icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/admin/signin');
    }
  }, [session, loading, router]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-6 w-6 animate-spin text-paper-muted" />
      </div>
    );
  }

  const isActive = (item: (typeof navItems)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-hairline">
        <div className="border-b border-hairline px-6 py-6">
          <Link href="/admin" className="font-serif text-lg text-paper">
            Adrian<span className="text-paper-muted">.</span>
          </Link>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                      isActive(item)
                        ? 'bg-ink-soft text-paper'
                        : 'text-paper-muted hover:text-paper'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-hairline px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper-muted transition-colors hover:text-paper"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
          <button
            onClick={() => signOut().then(() => router.push('/admin/signin'))}
            className="flex w-full items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper-muted transition-colors hover:text-paper"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-8 py-12 md:px-16">{children}</div>
      </main>
    </div>
  );
}
