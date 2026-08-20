export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    id: 'aurora',
    index: '01',
    title: 'Aurora',
    category: 'Design System',
    year: '2025',
    description:
      'A modular design system for fintech products. Built from first principles — typographic scale, spatial rhythm, and a token pipeline that ships to web, iOS, and brand in a single source of truth.',
    image:
      'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600',
    technologies: ['React', 'TypeScript', 'Style Dictionary', 'Figma'],
    github: 'https://github.com/ItisSardordev',
    demo: 'https://example.com',
  },
  {
    id: 'monolith',
    index: '02',
    title: 'Monolith',
    category: 'Developer Tooling',
    year: '2024',
    description:
      'A zero-config build orchestrator for monorepos. Replaces hand-rolled task graphs with a incremental scheduler that caches across machines — cutting CI time by an order of magnitude on large teams.',
    image:
      'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&w=1600',
    technologies: ['Rust', 'Node.js', 'GraphQL', 'Docker'],
    github: 'https://github.com/ItisSardordev',
    demo: 'https://example.com',
  },
  {
    id: 'atelier',
    index: '03',
    title: 'Atelier',
    category: 'Commerce',
    year: '2024',
    description:
      'A headless storefront for an independent fashion house. Editorial product photography, buttery transitions, and a checkout flow tuned for craft buyers — conversion lifted 38% in the first quarter.',
    image:
      'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1600',
    technologies: ['Next.js', 'Stripe', 'Sanity', 'GSAP'],
    github: 'https://github.com/ItisSardordev',
    demo: 'https://example.com',
  },
  {
    id: 'fieldnotes',
    index: '04',
    title: 'Field Notes',
    category: 'Product',
    year: '2023',
    description:
      'A long-form writing platform for researchers. Markdown-first, citation-aware, with a focus mode that disappears the interface entirely. Used by 14 university labs within its first year.',
    image:
      'https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=1600',
    technologies: ['React', 'Supabase', 'TipTap', 'Vercel'],
    github: 'https://github.com/ItisSardordev',
    demo: 'https://example.com',
  },
  {
    id: 'orbit',
    index: '05',
    title: 'Orbit',
    category: 'Realtime',
    year: '2023',
    description:
      'A collaborative whiteboard reimagined for systems thinkers. Infinite canvas, live multiplayer cursors, and a constraint engine that keeps diagrams legible as they scale to thousands of nodes.',
    image:
      'https://images.pexels.com/photos/325183/pexels-photo-325183.jpeg?auto=compress&cs=tinysrgb&w=1600',
    technologies: ['Three.js', 'WebRTC', 'CRDT', 'Canvas'],
    github: 'https://github.com/ItisSardordev',
    demo: 'https://example.com',
  },
];

export const socials = [
  { label: 'GitHub', href: 'https://github.com/ItisSardordev', handle: '@Sardor' },
  { label: 'Twitter', href: 'https://x.com/sardor1287', handle: '@Sardor' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sardorodilov/', handle: 'in/Sardor' },
  { label: 'Instagram', href: 'https://instagram.com/sardor_akbarovich_1', handle: 'Sardor' },
  { label: 'Telegram', href: 'https://t.me/sardor_akbarovich_1', handle: '/Sardor Tg' },
];
