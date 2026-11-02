// MEDIOS EDITABLES: sube archivos a /public/media y pon aquí la ruta (ej. "/media/hero.mp4").
// Si "src" está vacío se muestra un placeholder de rayas.
export const MEDIA = {
  heroVideo: "", // "/media/hero.mp4"
  parallax: [
    { src: "", alt: "Fondo", speed: 0.1 },
    { src: "", alt: "Capa media", speed: 0.25 },
    { src: "", alt: "Primer plano", speed: 0.4 },
  ],
  sphere: Array.from({ length: 12 }, (_, i) => ({
    src: "", // "/media/proyecto-1.jpg"
    alt: `Proyecto ${i + 1}`,
    title: `Proyecto ${i + 1}`,
    description: "Descripción pendiente.",
  })),
};
