/**
 * ═══════════════════════════════════════════════════════════════════
 *  CONFIGURACIÓN GENERAL DEL SITIO
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  Edita aquí el nombre, lema, datos de contacto de la administración
 *  y los enlaces de navegación. El resto del sitio se actualiza solo.
 */

export interface AnchorItem {
  /** id de la sección en la página (usa <section id="...">) */
  id: string;
  /** Texto visible del enlace */
  label: string;
}

export const SITE = {
  /** Nombre corto de la app (pestañas, logo) */
  name: "Vecinos y Servicios",
  /** Comunidad a la que pertenece la guía */
  community: "Condominio La Rueda",
  /** Nombre completo para SEO y títulos */
  legalName: "Vecinos y Servicios · Condominio La Rueda",
  /** URL pública del sitio (para metadata y sitemap) */
  url: "https://condominiolarueda.cr",
  /** Lema corto */
  tagline: "La guía viva de la comunidad",
  /** Descripción SEO */
  description:
    "Directorio comercial comunitario del Condominio La Rueda: descubre y apoya los productos y servicios que ofrecen tus propios vecinos. Buscador inteligente, carrusel de destacados, categorías predefinidas y preguntas frecuentes.",
  /** Datos de contacto de la administración de la guía */
  admin: {
    label: "Administración de la guía",
    phone: "+506 8888-0000",
    whatsapp: "50688880000",
    email: "guia@condominiolarueda.cr",
  },
  /** Secciones del sitio de una sola página (anclas) */
  anchors: [
    { id: "inicio", label: "Inicio" },
    { id: "buscador", label: "Buscador" },
    { id: "destacados", label: "Destacados" },
    { id: "categorias", label: "Categorías" },
    { id: "servicios", label: "Directorio" },
    { id: "faq", label: "Preguntas" },
    { id: "mapa", label: "Mapa del sitio" },
    { id: "anunciate", label: "Anúnciate" },
  ] as AnchorItem[],
} as const;

/** Utilidad: enlace tel: limpio a partir de un número con formato */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** Utilidad: enlace de WhatsApp con mensaje precargado */
export function waHref(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
