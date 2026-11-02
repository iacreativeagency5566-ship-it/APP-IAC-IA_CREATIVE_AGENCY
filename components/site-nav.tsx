"use client";
import { Home, Layers, Images, MessageSquare, Tag, Mail } from "lucide-react";
import { ExpandableTabs, type TabItem } from "@/components/ui/expandable-tabs";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
const tabs: TabItem[] = [
  { title: "Inicio", icon: Home }, { title: "Servicios", icon: Layers }, { title: "Proyectos", icon: Images },
  { type: "separator" }, { title: "Testimonios", icon: MessageSquare }, { title: "Paquetes", icon: Tag }, { title: "Contacto", icon: Mail },
];
const ids = ["inicio", "servicios", "proyectos", null, "testimonios", "paquetes", "contacto"];
export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-bg via-bg/80 to-transparent px-4 pb-6 pt-3 md:px-8">
      <a href="#inicio" className="hidden font-display text-lg font-bold text-ink sm:block">IA Creative Agency</a>
      <div className="flex items-center gap-3">
        <ExpandableTabs tabs={tabs} onChange={(i) => { if (i !== null && ids[i]) document.getElementById(ids[i]!)?.scrollIntoView({ behavior: "smooth" }); }} />
        <LiquidMetalButton label="Iniciar diagnóstico" href="#contacto" className="hidden h-11 px-5 text-sm lg:inline-flex" />
      </div>
    </header>
  );
}
