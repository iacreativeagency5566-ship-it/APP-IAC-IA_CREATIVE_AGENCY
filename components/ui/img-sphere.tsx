"use client";
import { useEffect, useRef, useState } from "react";
export type ImageData = { id: string; src: string; alt: string; title?: string; description?: string };
type P = { images: ImageData[]; containerSize?: number; sphereRadius?: number; dragSensitivity?: number; momentumDecay?: number; maxRotationSpeed?: number; baseImageScale?: number; hoverScale?: number; perspective?: number; autoRotate?: boolean; autoRotateSpeed?: number };
export default function SphereImageGrid({ images, containerSize = 600, sphereRadius = 200, dragSensitivity = 0.8, momentumDecay = 0.96, maxRotationSpeed = 6, baseImageScale = 0.15, hoverScale = 1.3, perspective = 1000, autoRotate = true, autoRotateSpeed = 0.2 }: P) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState<string | null>(null);
  const vel = useRef({ x: 0, y: 0 }), last = useRef<{ x: number; y: number } | null>(null), hov = useRef<string | null>(null);
  hov.current = hover;
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; let raf = 0;
    const tick = () => {
      if (!last.current) { vel.current.x *= momentumDecay; vel.current.y *= momentumDecay; }
      const auto = autoRotate && !reduce && !last.current && !hov.current ? autoRotateSpeed : 0;
      setRot((r) => ({ x: r.x + vel.current.x, y: r.y + vel.current.y + auto }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf);
  }, [momentumDecay, autoRotate, autoRotateSpeed]);
  const clamp = (v: number) => Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, v));
  const n = images.length, size = containerSize * baseImageScale, rx = (rot.x * Math.PI) / 180, ry = (rot.y * Math.PI) / 180;
  return (
    <div className="relative mx-auto touch-none select-none" style={{ width: containerSize, height: containerSize, maxWidth: "100%" }}
      onPointerDown={(e) => { last.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={(e) => { if (!last.current) return; vel.current = { x: clamp(-(e.clientY - last.current.y) * dragSensitivity * 0.1), y: clamp((e.clientX - last.current.x) * dragSensitivity * 0.1) }; last.current = { x: e.clientX, y: e.clientY }; }}
      onPointerUp={() => { last.current = null; }}>
      {images.map((img, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / n), th = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
        let x = Math.sin(phi) * Math.cos(th), y = Math.cos(phi), z = Math.sin(phi) * Math.sin(th);
        const x1 = x * Math.cos(ry) + z * Math.sin(ry), z1 = -x * Math.sin(ry) + z * Math.cos(ry);
        const y2 = y * Math.cos(rx) - z1 * Math.sin(rx), z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
        const k = perspective / (perspective - z2 * sphereRadius), depth = (z2 + 1) / 2;
        const s = (hover === img.id ? hoverScale : 1) * (0.6 + 0.4 * depth);
        return (
          <div key={img.id} onPointerEnter={() => setHover(img.id)} onPointerLeave={() => setHover(null)} title={img.title}
            className="absolute overflow-hidden rounded-full border border-line"
            style={{ width: size, height: size, left: containerSize / 2 + x1 * sphereRadius * k - size / 2, top: containerSize / 2 + y2 * sphereRadius * k - size / 2, transform: `scale(${s})`, opacity: 0.3 + 0.7 * depth, zIndex: Math.round(depth * 100) + (hover === img.id ? 200 : 0) }}>
            {img.src ? <img src={img.src} alt={img.alt} draggable={false} className="h-full w-full object-cover" /> : <div className="ph h-full w-full" />}
          </div>
        );
      })}
    </div>
  );
}
