export const SERVICES = [
  { t: "Automatizaciones básicas", d: "Formularios, correos, recordatorios y organización automática de datos. Ideales para empezar.", lv: "BÁSICO" },
  { t: "Comerciales y marketing", d: "Captura y seguimiento de leads, campañas automáticas y CRM conectado a tus anuncios.", lv: "INTERMEDIO" },
  { t: "Negocios locales", d: "Citas automáticas, confirmaciones por WhatsApp, reseñas y recordatorios de pago para clínicas, salones, talleres y más.", lv: "INTERMEDIO" },
  { t: "Administrativas y operativas", d: "Facturas, reportes, aprobaciones y sistemas que normalmente operan aislados.", lv: "AVANZADO" },
  { t: "Inteligencia artificial", d: "Chatbots entrenados con tu información, clasificación de mensajes y asistentes especializados por sector.", lv: "AVANZADO" },
  { t: "Sistemas empresariales", d: "Plataformas integrales que conectan ventas, marketing, atención y administración en un solo sistema.", lv: "EMPRESARIAL" },
];
export const PLANS = [
  { name: "Automatización Inicial", price: "Desde $4,000 MXN", features: ["1–3 automatizaciones básicas", "Diagnóstico exprés", "Capacitación incluida"] },
  { name: "Automatización Profesional", price: "Desde $20,000 MXN", featured: true, features: ["Hasta 8 flujos", "CRM configurado", "Seguimiento de leads automático", "Panel básico"] },
  { name: "Automatización Inteligente", price: "Desde $60,000 MXN", features: ["Chatbot IA entrenado con tus datos", "Clasificación inteligente de mensajes", "Hasta 15 flujos", "Monitoreo continuo"] },
  { name: "Sistema Integral", price: "Cotización personalizada", features: ["Agentes de IA con supervisión humana", "Dashboards en tiempo real", "Solución multi-departamento"] },
];
// TESTIMONIOS: reemplaza con testimonios reales de clientes en México. No inventes.
export const TESTIMONIALS = Array.from({ length: 8 }, (_, i) => ({
  name: "Nombre del cliente", role: "Negocio · Ciudad, México",
  body: `Testimonio real pendiente (${i + 1}). Edita lib/content.ts.`,
}));
export const STEPS = [
  { t: "Diagnóstico", d: "Identificamos tus tareas repetitivas y cuánto te cuestan." },
  { t: "Diseño", d: "Proponemos la solución con las herramientas adecuadas a tu presupuesto." },
  { t: "Implementación", d: "Construimos y probamos cada automatización contigo." },
  { t: "Optimización", d: "Monitoreamos, mejoramos y evolucionamos tu sistema mes a mes." },
];
export const MANUAL = ["Respondes leads en horas o días", "Copias datos entre apps", "Agendas citas por chat", "Los recordatorios dependen de tu memoria"];
export const AUTO = ["Respuesta en menos de 5 minutos", "Los datos fluyen solos entre sistemas", "Citas confirmadas y recordadas automáticamente", "Nada se olvida, nada se pierde"];
