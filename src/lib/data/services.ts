/**
 * ═══════════════════════════════════════════════════════════════════
 *  ARCHIVO DE DATOS — SERVICIOS Y PRODUCTOS DE LOS VECINOS
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *
 *  ▶ CÓMO AGREGAR O EDITAR UN SERVICIO (3 pasos):
 *
 *  1. Guarda la(s) imagen(es) en  /public/images/  (ej.: mi-servicio.png)
 *     y escríbelas como  "/images/mi-servicio.png".
 *
 *  2. Abre el archivo  /src/data/services.json  y agrega o edita el objeto
 *     JSON con los campos del servicio (id, title, category, keywords, etc.).
 *
 *  3. Guarda el archivo JSON: buscador, categorías, carrusel, directorio y
 *     mapa del sitio se actualizan automáticamente sin necesidad de base de datos.
 */

import {
  CarFront,
  GraduationCap,
  Hammer,
  HeartPulse,
  PawPrint,
  Scissors,
  ShoppingBag,
  UtensilsCrossed,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────────────
 *  CATEGORÍAS PREDEFINIDAS (no agregar más de ~8 para no saturar)
 * ─────────────────────────────────────────────────────────────────── */

export const CATEGORY_IDS = [
  "alimentos",
  "hogar",
  "salud",
  "belleza",
  "educacion",
  "mascotas",
  "comercio",
  "transporte",
  "asesoria",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

/** Filtro válido: una categoría o "todas" */
export type CategoryFilter = CategoryId | "todas";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  {
    id: "alimentos",
    label: "Alimentos y Repostería",
    description: "Pan, tortas, comidas y antojos hechos por vecinos",
    icon: UtensilsCrossed,
  },
  {
    id: "hogar",
    label: "Hogar y Reparaciones",
    description: "Carpintería, plomería, electricidad y mantenimiento",
    icon: Hammer,
  },
  {
    id: "salud",
    label: "Salud y Bienestar",
    description: "Masajes, yoga y terapias para vivir mejor",
    icon: HeartPulse,
  },
  {
    id: "belleza",
    label: "Belleza y Estética",
    description: "Salón, uñas y cuidado personal dentro del condominio",
    icon: Scissors,
  },
  {
    id: "educacion",
    label: "Educación y Clases",
    description: "Tutorías, idiomas, música y refuerzo escolar",
    icon: GraduationCap,
  },
  {
    id: "mascotas",
    label: "Mascotas",
    description: "Grooming, paseos y cuidado de los peluditos",
    icon: PawPrint,
  },
  {
    id: "comercio",
    label: "Productos y Ventas",
    description: "Frutas, verduras y productos de emprendedores locales",
    icon: ShoppingBag,
  },
  {
    id: "transporte",
    label: "Transporte y Mensajería",
    description: "Taxi de confianza, mandados y delivery",
    icon: CarFront,
  },
  {
    id: "asesoria",
    label: "Asesorías y Legal",
    description: "Servicios legales, profesionales y asesorías especializadas",
    icon: Briefcase,
  },
];

/** Mapa de clases Tailwind por categoría (usa los tokens --cat-* de globals.css) */
const CAT_CLASSES: Record<
  CategoryId,
  { badge: string; soft: string; solid: string; text: string; border: string }
> = {
  alimentos: {
    badge: "bg-cat-alimentos-soft text-cat-alimentos",
    soft: "bg-cat-alimentos-soft",
    solid: "bg-cat-alimentos text-white",
    text: "text-cat-alimentos",
    border: "border-cat-alimentos/40",
  },
  hogar: {
    badge: "bg-cat-hogar-soft text-cat-hogar",
    soft: "bg-cat-hogar-soft",
    solid: "bg-cat-hogar text-white",
    text: "text-cat-hogar",
    border: "border-cat-hogar/40",
  },
  salud: {
    badge: "bg-cat-salud-soft text-cat-salud",
    soft: "bg-cat-salud-soft",
    solid: "bg-cat-salud text-white",
    text: "text-cat-salud",
    border: "border-cat-salud/40",
  },
  belleza: {
    badge: "bg-cat-belleza-soft text-cat-belleza",
    soft: "bg-cat-belleza-soft",
    solid: "bg-cat-belleza text-white",
    text: "text-cat-belleza",
    border: "border-cat-belleza/40",
  },
  educacion: {
    badge: "bg-cat-educacion-soft text-cat-educacion",
    soft: "bg-cat-educacion-soft",
    solid: "bg-cat-educacion text-white",
    text: "text-cat-educacion",
    border: "border-cat-educacion/40",
  },
  mascotas: {
    badge: "bg-cat-mascotas-soft text-cat-mascotas",
    soft: "bg-cat-mascotas-soft",
    solid: "bg-cat-mascotas text-white",
    text: "text-cat-mascotas",
    border: "border-cat-mascotas/40",
  },
  comercio: {
    badge: "bg-cat-comercio-soft text-cat-comercio",
    soft: "bg-cat-comercio-soft",
    solid: "bg-cat-comercio text-white",
    text: "text-cat-comercio",
    border: "border-cat-comercio/40",
  },
  transporte: {
    badge: "bg-cat-transporte-soft text-cat-transporte",
    soft: "bg-cat-transporte-soft",
    solid: "bg-cat-transporte text-white",
    text: "text-cat-transporte",
    border: "border-cat-transporte/40",
  },
  asesoria: {
    badge: "bg-cat-asesoria-soft text-cat-asesoria",
    soft: "bg-cat-asesoria-soft",
    solid: "bg-cat-asesoria text-white",
    text: "text-cat-asesoria",
    border: "border-cat-asesoria/40",
  },
};

/** Devuelve etiqueta, icono y clases de color para una categoría */
export function categoryUi(id: CategoryId) {
  const category = CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
  return {
    id: category.id,
    label: category.label,
    description: category.description,
    icon: category.icon,
    classes: CAT_CLASSES[category.id],
  };
}

/* ───────────────────────────────────────────────────────────────────
 *  LISTADO DE SERVICIOS Y PRODUCTOS
 *  ── AGREGA NUEVOS BLOQUES AL FINAL DE ESTA LISTA ──
 * ─────────────────────────────────────────────────────────────────── */

export interface ServiceListing {
  /** Identificador único, minúsculas y sin espacios */
  id: string;
  /** Nombre del negocio o servicio */
  title: string;
  /** Frase corta gancho (se muestra en el carrusel y tarjetas) */
  tagline?: string;
  /** Categoría predefinida (debe existir en CATEGORIES) */
  category: CategoryId;
  /** Palabras clave que alimentan el buscador */
  keywords: string[];
  /** Imagen o imágenes (rutas bajo /images/); la primera es la principal */
  images: string[];
  /** Número de contacto visible (las solicitudes se piden por el grupo) */
  phone: string;
  /** Horario de atención (opcional) */
  schedule?: string;
  /** Ubicación dentro del condominio (opcional) */
  location?: string;
  /** Descripción del servicio o producto */
  description: string;
  /** Aparece en el carrusel de destacados (máx. recomendado: 6) */
  featured?: boolean;
  /** Marca el anuncio con la píldora "Nuevo" (recién incorporado a la guía) */
  isNew?: boolean;
  /** Precio visible o tarifa de referencia (opcional) */
  price?: string;
  /** Enlaces directos a redes sociales, web o correo (opcional) */
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
    email?: string;
  };
}

import servicesData from "@/data/services.json";

export const SERVICES: ServiceListing[] = servicesData as ServiceListing[];

/* ───────────────────────────────────────────────────────────────────
 *  HELPERS (los componentes los usan; normalmente no hace falta editar)
 * ─────────────────────────────────────────────────────────────────── */

import { normalizeText, tokenize } from "@/lib/text";

export interface ScoredService {
  service: ServiceListing;
  score: number;
}

/** Destacados para el carrusel */
export function getFeaturedServices(): ServiceListing[] {
  return SERVICES.filter((s) => s.featured);
}

/** Servicios de una categoría (o todos) */
export function getServicesByCategory(category: CategoryFilter): ServiceListing[] {
  if (category === "todas") return SERVICES;
  return SERVICES.filter((s) => s.category === category);
}

/** Cantidad de servicios por categoría */
export function categoryCounts(): Record<CategoryId, number> {
  const counts = {} as Record<CategoryId, number>;
  for (const c of CATEGORY_IDS) counts[c] = 0;
  for (const s of SERVICES) counts[s.category] += 1;
  return counts;
}

export function getServiceById(id: string): ServiceListing | undefined {
  return SERVICES.find((s) => s.id === id);
}

function haystack(service: ServiceListing): Array<{ weight: number; text: string }> {
  const category = CATEGORIES.find((c) => c.id === service.category);
  return [
    { weight: 10, text: service.title },
    { weight: 8, text: service.keywords.join(" ") },
    { weight: 7, text: service.phone },
    { weight: 5, text: category?.label ?? "" },
    { weight: 4, text: service.tagline ?? "" },
    { weight: 3, text: service.price ?? "" },
    { weight: 2, text: service.description },
    { weight: 2, text: service.location ?? "" },
  ];
}

/**
 * Híper-buscador: puntúa cada servicio contra la consulta.
 * Ignora tildes y mayúsculas; multipremia coincidencias en título y
 * palabras clave, y combina varias palabras (AND) sumando puntajes.
 */
export function searchServices(
  query: string,
  category: CategoryFilter = "todas",
): ScoredService[] {
  const pool =
    category === "todas" ? SERVICES : SERVICES.filter((s) => s.category === category);

  const tokens = tokenize(query);
  if (tokens.length === 0) {
    // Sin consulta: orden estable, destacados primero
    return pool
      .map((service) => ({ service, score: service.featured ? 1 : 0 }))
      .sort((a, b) => b.score - a.score);
  }

  const results: ScoredService[] = [];
  for (const service of pool) {
    const fields = haystack(service).map((f) => ({
      weight: f.weight,
      text: normalizeText(f.text),
    }));
    let score = 0;
    let allMatched = true;

    for (const token of tokens) {
      let tokenScore = 0;
      for (const field of fields) {
        const idx = field.text.indexOf(token);
        if (idx === -1) continue;
        // Coincidencia al inicio de una palabra vale más
        const atWordStart = idx === 0 || field.text[idx - 1] === " ";
        const prefixBonus = field.text.startsWith(token) ? 3 : 0;
        const wordStartBonus = atWordStart ? 2 : 0;
        const exactTitleBonus =
          field.weight === 10 && field.text === token ? 8 : 0;
        tokenScore = Math.max(
          tokenScore,
          field.weight + prefixBonus + wordStartBonus + exactTitleBonus,
        );
      }
      if (tokenScore === 0) {
        allMatched = false;
        break;
      }
      score += tokenScore;
    }

    if (allMatched && score > 0) {
      results.push({ service, score: score + (service.featured ? 1 : 0) });
    }
  }

  return results.sort(
    (a, b) => b.score - a.score || a.service.title.localeCompare(b.service.title),
  );
}
