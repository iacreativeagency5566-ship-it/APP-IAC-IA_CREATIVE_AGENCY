import { STEPS } from "@/lib/content";
export function HowItWorks() {
  return (
    <section data-label="Cómo funciona" id="como-funciona" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Cómo funciona</h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-0">
        {STEPS.map((s, i) => (
          <li key={s.t} className="relative flex gap-4 md:flex-col md:pr-6">
            {i < STEPS.length - 1 && <span aria-hidden className="absolute left-5 top-12 -bottom-10 w-px bg-line md:bottom-auto md:left-12 md:right-0 md:top-5 md:h-px md:w-auto" />}
            <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-neon bg-bg font-display font-bold text-neon">{i + 1}</span>
            <div className="md:mt-5">
              <h3 className="font-display text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-mute">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
