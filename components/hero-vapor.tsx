"use client";
import { useEffect, useState } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

// Los textos salen de tu titular: "procesos manuales" → "sistemas inteligentes".
const TEXTS = ["Procesos manuales", "Sistemas inteligentes"];

export function HeroVapor() {
  const [cfg, setCfg] = useState({ family: "sans-serif", size: 56 });
  useEffect(() => {
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "sans-serif";
    const longest = Math.max(...TEXTS.map((t) => t.length));
    const size = Math.max(30, Math.min(88, Math.floor((window.innerWidth * 0.88) / (longest * 0.58))));
    setCfg({ family, size });
  }, []);
  return (
    <div className="h-[130px] w-full md:h-[190px]">
      <VaporizeTextCycle
        texts={TEXTS}
        font={{ fontFamily: cfg.family, fontSize: `${cfg.size}px`, fontWeight: 700 }}
        color="rgb(0, 229, 160)"
        spread={5}
        density={6}
        animation={{ vaporizeDuration: 2.2, fadeInDuration: 1, waitDuration: 1.4 }}
        direction="left-to-right"
        alignment="center"
        tag={Tag.H2}
      />
    </div>
  );
}
