'use client';

import { useEffect, useRef } from 'react';

export function Hero3D() {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    let frame = 0;
    const animate = () => {
      const time = performance.now() / 1000;
      orb.style.transform = `translate3d(0, ${Math.sin(time * 0.7) * 12}px, 0) rotateX(${Math.sin(time * 0.32) * 8}deg) rotateY(${time * 14}deg)`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[min(62vw,620px)] w-[min(62vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_28%,rgba(245,243,239,0.16),transparent_30%),radial-gradient(circle_at_68%_72%,rgba(245,243,239,0.06),transparent_40%)] blur-3xl" />
      <div
        ref={orbRef}
        className="absolute left-1/2 top-1/2 h-[min(26vw,280px)] w-[min(26vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-[38%_62%_55%_45%/48%_42%_58%_52%] border border-paper/20 bg-[radial-gradient(circle_at_34%_28%,rgba(245,243,239,0.34),rgba(245,243,239,0.08)_24%,rgba(10,10,10,0.94)_68%)] shadow-[inset_-34px_-30px_60px_rgba(0,0,0,0.9),inset_22px_20px_42px_rgba(245,243,239,0.12),0_0_100px_rgba(245,243,239,0.08)] [transform-style:preserve-3d]"
      >
        <span className="absolute -inset-10 rounded-full border border-paper/10" />
        <span className="absolute -inset-20 rounded-full border border-paper/5" />
      </div>
      <div className="absolute left-1/2 top-1/2 h-[min(48vw,500px)] w-[min(48vw,500px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/5" />
    </div>
  );
}
