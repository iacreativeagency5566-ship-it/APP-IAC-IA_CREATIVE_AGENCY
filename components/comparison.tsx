"use client";
import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MANUAL, AUTO } from "@/lib/content";

function Column({ title, items, show, auto }: { title: string; items: string[]; show: boolean; auto?: boolean }) {
  const Icon = auto ? Check : X;
  return (
    <div className={cn("rounded-2xl border p-6 md:p-8", auto ? "border-neon bg-surface" : "border-line bg-surface")}>
      <h3 className={cn("font-display text-xl font-semibold", auto ? "text-neon" : "text-mute")}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((t, i) => (
          <li key={t} className={cn("flex gap-3 transition-all duration-500", show ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0", auto ? "text-ink" : "text-mute")} style={{ transitionDelay: `${i * 150 + (auto ? 600 : 0)}ms` }}>
            <Icon size={18} className={cn("mt-0.5 shrink-0", auto ? "text-neon" : "text-mute")} aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparison() {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <section data-label="Comparativa" ref={ref} id="comparativa" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="sr-only">Proceso manual frente a proceso automatizado</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Column title="Proceso manual" items={MANUAL} show={show} />
        <Column title="Proceso automatizado" items={AUTO} show={show} auto />
      </div>
    </section>
  );
}
