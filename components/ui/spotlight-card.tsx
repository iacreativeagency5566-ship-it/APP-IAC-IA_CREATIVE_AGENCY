"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`); ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`); }}
      className={cn("group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-neon/40", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(320px circle at var(--x,50%) var(--y,50%), rgba(0,229,160,.12), transparent 70%)" }} />
      <div className="relative">{children}</div>
    </div>
  );
}
