"use client";
import { useEffect, useRef } from "react";
// Nodos conectados con pulsos viajando por las líneas (diagrama de flujo discreto).
export function HeroNodes() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current, ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from({ length: 28 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - .5) * 6e-5, vy: (Math.random() - .5) * 6e-5 }));
    const pulses: { a: number; b: number; t: number }[] = [];
    let w = 0, h = 0, raf = 0, last = performance.now();
    const size = () => { const dpr = Math.min(devicePixelRatio, 2); w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const links = () => { const L: [number, number][] = []; const max = Math.min(w, 900) * .22; nodes.forEach((p, i) => nodes.forEach((q, j) => { if (j > i && Math.hypot((p.x - q.x) * w, (p.y - q.y) * h) < max) L.push([i, j]); })); return L; };
    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const L = links();
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(139,148,158,.28)";
      L.forEach(([i, j]) => { ctx.beginPath(); ctx.moveTo(nodes[i].x * w, nodes[i].y * h); ctx.lineTo(nodes[j].x * w, nodes[j].y * h); ctx.stroke(); });
      nodes.forEach((n, i) => { if (!reduce) { n.x = (n.x + n.vx * dt + 1) % 1; n.y = (n.y + n.vy * dt + 1) % 1; } ctx.fillStyle = i % 7 === 0 ? "rgba(124,92,255,.9)" : "rgba(139,148,158,.7)"; ctx.fillRect(n.x * w - 2, n.y * h - 2, 4, 4); });
      if (reduce) return;
      if (L.length && pulses.length < 6 && Math.random() < .03) { const [a, b] = L[Math.floor(Math.random() * L.length)]; pulses.push({ a, b, t: 0 }); }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]; p.t += dt / 1100;
        if (p.t >= 1) { pulses.splice(k, 1); continue; }
        const A = nodes[p.a], B = nodes[p.b];
        ctx.fillStyle = "#00E5A0"; ctx.shadowColor = "#00E5A0"; ctx.shadowBlur = 10;
        ctx.fillRect((A.x + (B.x - A.x) * p.t) * w - 2.5, (A.y + (B.y - A.y) * p.t) * h - 2.5, 5, 5); ctx.shadowBlur = 0;
      }
    };
    const loop = (now: number) => { draw(now - last); last = now; raf = requestAnimationFrame(loop); };
    size(); draw(16);
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(16); }); ro.observe(c);
    if (!reduce) raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full opacity-60" />;
}
