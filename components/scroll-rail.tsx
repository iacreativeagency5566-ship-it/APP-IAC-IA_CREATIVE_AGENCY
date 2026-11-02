"use client";
import { useEffect, useRef } from "react";
// Riel vertical: un pulso verde baja por la página como un flujo ejecutándose.
export function ScrollRail() {
  const dot = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; if (dot.current) dot.current.style.top = `${p * 100}%`; }); };
    on(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed bottom-0 left-6 top-0 z-40 hidden w-px bg-line 2xl:block">
      <span ref={dot} className="absolute -left-[3px] h-[7px] w-[7px] bg-neon shadow-[0_0_12px_#00E5A0]" />
    </div>
  );
}
