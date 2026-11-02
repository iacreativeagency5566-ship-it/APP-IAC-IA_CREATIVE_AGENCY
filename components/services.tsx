import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SERVICES } from "@/lib/content";
const LV: Record<string, number> = { "BÁSICO": 1, INTERMEDIO: 2, AVANZADO: 3, EMPRESARIAL: 4 };
const SPAN = ["md:col-span-4", "md:col-span-2", "md:col-span-2", "md:col-span-4", "md:col-span-3", "md:col-span-3"];
export function Services() {
  return (
    <section id="servicios" data-label="Servicios" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="font-display text-3xl font-bold md:text-5xl">¿Qué automatizamos?</h2>
      <div className="mt-12 grid gap-4 md:grid-cols-6">
        {SERVICES.map((s, i) => (
          <SpotlightCard key={s.t} className={`flex min-h-[210px] flex-col justify-between ${SPAN[i]}`}>
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-sm text-mute">0{i + 1}</span>
              <div className="flex items-center gap-3" role="img" aria-label={`Nivel ${s.lv}`}>
                <span className="font-mono text-xs tracking-wider text-mute">{s.lv}</span>
                <span className="flex gap-1">{[1, 2, 3, 4].map((n) => <span key={n} className={`h-2 w-4 ${n <= LV[s.lv] ? "bg-neon" : "bg-line"}`} />)}</span>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold">{s.t}</h3>
              <p className="mt-3 max-w-xl text-sm text-mute">{s.d}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
