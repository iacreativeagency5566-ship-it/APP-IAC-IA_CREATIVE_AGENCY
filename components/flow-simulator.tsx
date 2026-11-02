"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileText, Cpu, Database, MessageCircle, Mail, Trophy, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

type Node = { icon: LucideIcon; label: string; msg: string; tip: string; tone: string; aria: string };
const NODES: Node[] = [
  { icon: FileText, label: "Cliente llena el formulario en tu sitio", msg: "Nuevo lead: María G. — Solicita cotización", tip: "Formulario web conectado a n8n o Make", tone: "border-ink/70 text-ink", aria: "Paso 1: entrada del formulario" },
  { icon: Cpu, label: "La IA clasifica y puntúa el lead", msg: "Lead calificado: interés alto · presupuesto medio", tip: "Usando OpenAI a través de n8n", tone: "border-violet text-violet", aria: "Paso 2: la IA clasifica el lead" },
  { icon: Database, label: "Se registra en tu CRM automáticamente", msg: "María G. agregada a HubSpot · etiqueta: 'Cotización pendiente'", tip: "HubSpot, o el CRM que ya uses", tone: "border-neon text-neon", aria: "Paso 3: registro en el CRM" },
  { icon: MessageCircle, label: "Tu vendedor recibe el aviso al instante", msg: "Notificación enviada al vendedor asignado · hace 3 segundos", tip: "WhatsApp Business conectado al flujo", tone: "border-neon text-neon", aria: "Paso 4: aviso al vendedor por WhatsApp" },
  { icon: Mail, label: "El cliente recibe respuesta inmediata", msg: "Correo automático enviado: 'Gracias María, te contactamos hoy mismo'", tip: "Gmail o un servicio de correo transaccional", tone: "border-neon text-neon", aria: "Paso 5: correo al cliente" },
  { icon: Trophy, label: "Tiempo total: 47 segundos", msg: "Flujo completado", tip: "Todo el flujo corre en n8n, sin intervención humana", tone: "border-ink text-ink shadow-[0_0_24px_rgba(230,237,243,.35)]", aria: "Paso 6: resultado, 47 segundos" },
];
const STEP_MS = 1300;

export function FlowSimulator() {
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const root = useRef<HTMLElement>(null);
  const started = useRef(false);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout); timers.current = [];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(NODES.length); return; }
    setStep(0);
    NODES.forEach((_, i) => timers.current.push(setTimeout(() => setStep(i + 1), 300 + i * STEP_MS)));
  }, []);

  useEffect(() => {
    const el = root.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started.current) { started.current = true; run(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); timers.current.forEach(clearTimeout); };
  }, [run]);

  const done = step === NODES.length;
  return (
    <section data-label="Simulador" ref={root} id="simulador" className="mx-auto max-w-6xl px-6 py-24">
      <p className="text-sm font-semibold uppercase tracking-wider text-neon">Mira la automatización en acción</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold md:text-4xl">Esto es lo que pasa cuando un cliente te contacta — en automático.</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={run} className="h-11 rounded-full border border-neon px-6 text-sm font-semibold text-neon hover:bg-neon hover:text-bg">▶ Ejecutar flujo</button>
        {done && <button onClick={run} className="h-11 rounded-full border border-line px-6 text-sm font-semibold text-ink hover:border-ink">Repetir</button>}
      </div>

      <ol aria-live="polite" className="mt-12 flex flex-col gap-6 md:grid md:grid-cols-6 md:gap-0">
        {NODES.map((n, i) => {
          const on = step > i, current = step === i + 1 && !done;
          return (
            <li key={i} className="relative flex gap-4 md:flex-col md:items-center md:px-2 md:text-center">
              {i < NODES.length - 1 && (
                <span aria-hidden className="absolute -bottom-6 left-7 top-14 w-px -translate-x-1/2 overflow-hidden bg-line md:bottom-auto md:left-1/2 md:top-7 md:h-px md:w-full md:-translate-y-1/2 md:translate-x-0">
                  <span className={cn("block h-full w-full origin-top bg-neon transition-transform duration-500 md:origin-left", step > i + 1 ? "scale-y-100 md:scale-x-100" : "scale-y-0 md:scale-x-0 md:scale-y-100")} />
                </span>
              )}
              <div tabIndex={0} role="group" aria-label={n.aria} className="group relative z-10 shrink-0 outline-none">
                <div className={cn("grid h-14 w-14 place-items-center rounded-2xl border bg-surface transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-neon", on ? n.tone : "border-line text-mute", on && "animate-pop")} style={{ transitionDelay: on ? "400ms" : "0ms" }}>
                  <n.icon size={24} />
                </div>
                <span role="tooltip" className="pointer-events-none absolute left-16 top-1/2 z-20 w-48 -translate-y-1/2 rounded-lg border border-line bg-surface px-3 py-2 text-left text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:left-1/2 md:top-16 md:-translate-x-1/2 md:translate-y-0">{n.tip}</span>
              </div>
              <div className="min-w-0 flex-1 md:mt-4 md:flex-none">
                <p className={cn("text-sm font-semibold transition-colors", on ? "text-ink" : "text-mute")}>{n.label}</p>
                <p className={cn("mt-2 text-xs text-mute transition-all duration-500", on && i < NODES.length - 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}>
                  {i === 1 && current ? <span aria-hidden className="mr-1 inline-flex gap-0.5 align-middle">{[0, 1, 2].map((d) => <span key={d} className="h-1 w-1 animate-pulse rounded-full bg-violet" style={{ animationDelay: `${d * 150}ms` }} />)}</span> : null}
                  {n.msg}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className={cn("mt-12 text-center font-display text-2xl font-bold transition-all duration-700 md:text-3xl", done ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>Sin tocar nada. Mientras tanto, tú sigues trabajando.</p>

      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        <div>
          <p className={cn("text-sm", done ? "text-mute line-through" : "text-ink")}>Proceso manual típico: 4–24 horas</p>
          <div className="mt-2 h-2 rounded-full bg-line"><div className="h-2 w-full rounded-full bg-mute" /></div>
        </div>
        <div>
          <p className="text-sm text-neon">Con automatización: menos de 1 minuto</p>
          <div className="mt-2 h-2 rounded-full bg-line"><div className="h-2 rounded-full bg-neon transition-all duration-700" style={{ width: `${(step / NODES.length) * 4}%` }} /></div>
        </div>
      </div>

      <div className={cn("mt-10 flex justify-center transition-opacity duration-500", done ? "opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!done}>
        <LiquidMetalButton label="Quiero esto para mi negocio" href="#contacto" />
      </div>
    </section>
  );
}
