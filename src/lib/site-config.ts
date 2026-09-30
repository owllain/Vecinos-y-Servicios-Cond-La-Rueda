/**
 * ═══════════════════════════════════════════════════════════════════
 *  CONFIGURACIÓN GENERAL DEL SITIO
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  Guía HECHA POR Y PARA LOS VECINOS y administrada por los propios
 *  vecinos. TODAS las solicitudes —servicios, pedidos y trámites de
 *  secretaría incluidos— se hacen escribiendo al grupo de WhatsApp.
 *
 *  Edita aquí el nombre, el lema y el enlace del grupo. El resto del
 *  sitio se actualiza solo.
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
  tagline: "La guía hecha por y para los vecinos",
  /** Descripción SEO */
  description:
    "La guía hecha por y para los vecinos del Condominio La Rueda: descubre los productos y servicios que ofrece tu propia comunidad. Administrada por los vecinos y con todas las solicitudes —secretaría incluida— por el grupo de WhatsApp.",
  /**
   * Grupo de WhatsApp de los vecinos: el ÚNICO canal de solicitud.
   * ▶ REEMPLAZA el enlace provisional por el enlace de invitación real
   *   de tu grupo (WhatsApp → Información del grupo → Invitar enlace).
   */
  whatsappGroup: {
    url: "https://chat.whatsapp.com/invito-vecinos-la-rueda",
    label: "Grupo de WhatsApp de los vecinos",
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

/** Atajo: enlace del grupo de WhatsApp de los vecinos */
export function groupHref(): string {
  return SITE.whatsappGroup.url;
}
