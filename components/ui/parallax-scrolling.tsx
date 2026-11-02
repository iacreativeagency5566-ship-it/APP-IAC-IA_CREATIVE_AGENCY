'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { MEDIA } from '@/lib/media';

// Código base: "Parallax Scrolling" de Osmo (21st.dev). Las imágenes vienen de lib/media.ts.
// Capas: 1 fondo, 2 capa media, 3 título, 4 primer plano.
export function ParallaxComponent({ title = 'IA Creative Agency' }: { title?: string }) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [bg, mid, fg] = MEDIA.parallax;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
    if (triggerElement) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: triggerElement, start: '0% 0%', end: '100% 0%', scrub: 0 } });
      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];
      layers.forEach((l, idx) => {
        tl.to(triggerElement.querySelectorAll(`[data-parallax-layer="${l.layer}"]`), { yPercent: l.yPercent, ease: 'none' }, idx === 0 ? undefined : '<');
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const Layer = ({ n, m }: { n: string; m: { src: string; alt: string } }) =>
    m.src ? (
      <img src={m.src} loading="eager" data-parallax-layer={n} alt={m.alt} className="parallax__layer-img" />
    ) : (
      <div data-parallax-layer={n} className="parallax__layer-img ph" style={{ opacity: n === '4' ? 0.9 : 0.6 }}>
        {`capa ${n} · ${m.alt} · sube imagen en lib/media.ts`}
      </div>
    );

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div data-parallax-layers className="parallax__layers">
            <Layer n="1" m={bg} />
            <Layer n="2" m={mid} />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">{title}</h2>
            </div>
            <Layer n="4" m={fg} />
          </div>
          <div className="parallax__fade" />
        </div>
      </section>
    </div>
  );
}
