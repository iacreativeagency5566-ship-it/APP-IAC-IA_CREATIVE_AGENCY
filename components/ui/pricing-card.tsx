import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
type P = { name: string; price: string; features: string[]; featured?: boolean; cta?: string };
export function PricingCard({ name, price, features, featured, cta = "Solicitar cotización" }: P) {
  return (
    <div className={cn("relative flex h-full flex-col rounded-2xl border bg-surface p-6", featured ? "border-neon md:-translate-y-3 shadow-[0_0_48px_rgba(0,229,160,.14)]" : "border-line")}>
      {featured && <span className="absolute -top-3 left-6 rounded-full bg-neon px-3 py-1 text-xs font-semibold text-bg">RECOMENDADO</span>}
      <h3 className="font-display text-xl font-semibold">{name}</h3>
      <p className="mt-2 font-display text-2xl text-neon">{price}</p>
      <ul className="mt-5 flex-1 space-y-3 text-sm">{features.map((f) => <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-neon" />{f}</li>)}</ul>
      <a href="#contacto" className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-neon px-5 text-sm font-semibold hover:bg-neon hover:text-bg">{cta}</a>
    </div>
  );
}
