import { HeroVapor } from "@/components/hero-vapor";
import { HeroNodes } from "@/components/hero-nodes";
import { ScrollRail } from "@/components/scroll-rail";
import { Services } from "@/components/services";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { Marquee } from "@/components/ui/3d-testimonails";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { type ImageData } from "@/components/ui/img-sphere";
import { ResponsiveSphere } from "@/components/responsive-sphere";
import { PricingCard } from "@/components/ui/pricing-card";
import { HowItWorks } from "@/components/how-it-works";
import { Comparison } from "@/components/comparison";
import { FlowSimulator } from "@/components/flow-simulator";
import { SiteNav } from "@/components/site-nav";
import { MEDIA } from "@/lib/media";
import { PLANS, TESTIMONIALS } from "@/lib/content";

const IMAGES: ImageData[] = Array.from({ length: 48 }, (_, i) => ({ id: `img-${i}`, ...MEDIA.sphere[i % MEDIA.sphere.length] }));
const cols = [0, 1, 2, 3].map((c) => TESTIMONIALS.filter((_, i) => i % 4 === c));
const TRUST = ["n8n", "Make", "Zapier", "OpenAI", "WhatsApp Business", "HubSpot", "Google Workspace", "Supabase"];
const LINKS = [["Servicios", "#servicios"], ["Paquetes", "#paquetes"], ["Cómo funciona", "#como-funciona"], ["Contacto", "#contacto"]];

export default function Page() {
  return (
    <>
      <SiteNav />
      <ScrollRail />
      <main>
        <section id="inicio" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-16 pt-28">
          <div aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <HeroNodes />
          {MEDIA.heroVideo && <video src={MEDIA.heroVideo} autoPlay muted loop playsInline aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />}
          <div className="hud relative z-10 flex w-full max-w-5xl flex-col items-center px-6 py-12 text-center md:px-12 md:py-16">
            <HeroVapor />
            <h1 className="mt-6 max-w-3xl font-display text-3xl font-bold md:text-5xl [text-wrap:balance]">Convertimos tus procesos manuales en sistemas inteligentes.</h1>
            <p className="mt-6 max-w-2xl text-lg text-mute [text-wrap:pretty]">Automatización + Inteligencia Artificial para que tu negocio trabaje mientras tú no. Soluciones accesibles para negocios locales y sistemas avanzados para empresas.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <LiquidMetalButton label="▶ Iniciar diagnóstico" href="#contacto" />
              <a href="#paquetes" className="inline-flex h-12 items-center rounded-full border border-line px-7 font-semibold text-ink hover:border-neon">Ver paquetes</a>
            </div>
          </div>
        </section>

        <section aria-label="Herramientas" className="border-y border-line py-6">
          <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 font-mono text-sm text-mute">
            {TRUST.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </section>

        <Services />
        <HowItWorks />
        <FlowSimulator />
        <Comparison />
        <ParallaxComponent />

        <section id="proyectos" data-label="Proyectos" className="mx-auto overflow-hidden max-w-6xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Proyectos y resultados</h2>
          <p className="mt-3 text-mute">Arrastra la esfera para explorar.</p>
          <div className="mt-10"><ResponsiveSphere images={IMAGES} /></div>
        </section>

        <section id="testimonios" data-label="Testimonios" className="mx-auto max-w-6xl overflow-hidden px-6 py-24">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Lo que dicen nuestros clientes</h2>
          <div className="mt-6 flex h-[460px] items-center justify-center gap-4 [perspective:300px]">
            <div className="flex gap-4" style={{ transform: "translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)" }}>
              {cols.map((col, i) => (
                <Marquee key={i} vertical reverse={i % 2 === 1} pauseOnHover className="h-[560px] [--gap:1rem]">
                  {col.map((t, j) => (
                    <figure key={j} className="w-52 border border-line bg-surface p-4">
                      <figcaption className="text-sm font-semibold">{t.name}</figcaption>
                      <p className="text-xs text-mute">{t.role}</p>
                      <blockquote className="mt-2 text-sm">{t.body}</blockquote>
                    </figure>
                  ))}
                </Marquee>
              ))}
            </div>
          </div>
        </section>

        <section id="paquetes" data-label="Paquetes" className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Paquetes</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{PLANS.map((p) => <PricingCard key={p.name} {...p} />)}</div>
          <p className="mt-8 text-sm text-mute">Precios estimados de mercado en México. La cotización final depende del alcance de cada proyecto.</p>
        </section>

        <section id="contacto" className="dots relative px-6 py-32 text-center">
          <div className="hud mx-auto max-w-3xl px-6 py-14 md:px-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl [text-wrap:balance]">¿No sabes por dónde empezar? Agenda una auditoría gratuita de 30 minutos: te decimos exactamente qué automatizar y cuánto podrías ahorrar.</h2>
            <div className="mt-10"><LiquidMetalButton label="Agendar consultoría gratuita" href="mailto:hola@iacreativeagency.mx" /></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div><p className="font-display text-xl font-bold">IA Creative Agency</p><a href="mailto:hola@iacreativeagency.mx" className="mt-3 inline-block text-sm">hola@iacreativeagency.mx</a></div>
          <nav aria-label="Pie de página"><ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">{LINKS.map(([t, h]) => <li key={t}><a href={h} className="text-ink hover:text-neon">{t}</a></li>)}<li><a href="#" className="text-ink hover:text-neon">Aviso de privacidad</a></li></ul></nav>
        </div>
        <p className="mx-auto mt-10 max-w-6xl text-sm text-mute">© 2026 IA Creative Agency · Parallax: Osmo</p>
      </footer>
    </>
  );
}
