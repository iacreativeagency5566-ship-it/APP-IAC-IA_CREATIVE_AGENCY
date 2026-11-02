import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
type P = { label?: string; viewMode?: "text" | "icon"; href?: string; className?: string };
export function LiquidMetalButton({ label = "Iniciar diagnóstico", viewMode = "text", href = "#contacto", className }: P) {
  return (
    <a href={href} aria-label={label} className={cn("metal inline-flex h-12 items-center justify-center gap-2 rounded-full font-display font-semibold", viewMode === "icon" ? "w-12" : "px-7", className)}>
      {viewMode === "text" && <span>{label}</span>}<ArrowRight size={18} />
    </a>
  );
}
