import type { Metadata } from "next";
import { Space_Grotesk, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });
export const metadata: Metadata = {
  title: "IA Creative Agency — Automatización e Inteligencia Artificial para tu negocio",
  description: "Automatizamos procesos con n8n, Make, WhatsApp Business, CRMs e IA para negocios locales y empresas en México.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-MX" className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}</body></html>;
}
