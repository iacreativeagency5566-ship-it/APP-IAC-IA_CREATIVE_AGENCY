"use client";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
export type TabItem = { title: string; icon: LucideIcon; type?: undefined } | { type: "separator"; title?: undefined; icon?: undefined };
type P = { tabs: TabItem[]; className?: string; activeColor?: string; onChange?: (i: number | null) => void };
export function ExpandableTabs({ tabs, className, activeColor = "text-neon", onChange }: P) {
  const [sel, setSel] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setSel(null); onChange?.(null); } };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [onChange]);
  return (
    <div ref={ref} className={cn("flex items-center gap-1 rounded-2xl border border-line bg-surface p-1", className)}>
      {tabs.map((t, i) => t.type === "separator" ? <div key={i} className="mx-1 h-6 w-px bg-line" aria-hidden /> : (
        <button key={i} aria-label={t.title} onClick={() => { setSel(i); onChange?.(i); }}
          className={cn("flex h-11 items-center gap-2 rounded-xl px-3 text-mute transition-colors duration-300 hover:text-ink", sel === i && ["bg-bg", activeColor])}>
          <t.icon size={20} />
          <span className="overflow-hidden whitespace-nowrap text-sm transition-[max-width] duration-300" style={{ maxWidth: sel === i ? "9rem" : 0 }}>{t.title}</span>
        </button>
      ))}
    </div>
  );
}
