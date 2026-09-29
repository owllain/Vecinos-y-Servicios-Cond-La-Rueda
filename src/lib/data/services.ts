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
 *  2. Copia un bloque { ... } de ejemplo de la lista SERVICES, pégalo al
 *     final y cambia los campos:
 *
 *       id          → identificador ÚNICO, minúsculas y sin espacios
 *       title       → nombre del negocio o servicio (obligatorio)
 *       tagline     → frase corta gancho que se muestra en el carrusel
 *       category    → UNA de las categorías predefinidas (ver CATEGORIES)
 *       keywords    → palabras clave que alimentan el buscador
 *                     (mínimo 5 recomendado; sin tildes también funciona,
 *                      el buscador ignora tildes y mayúsculas)
 *       images      → lista de rutas de imagen (1 o más, la primera es
 *                     la principal; ej.: "/images/mi-foto.png")
 *       phone       → número de contacto visible (formato +506 XXXX-XXXX)
 *       whatsapp    → true si quieres botón de WhatsApp con ese número
 *       schedule    → (opcional) horario de atención
 *       location    → (opcional) ubicación dentro del condominio
 *       description → descripción del servicio o producto (1–3 oraciones)
 *       featured    → true para que aparezca en el carrusel de destacados
 *                     (se recomienda máximo 6 destacados)
 *       isNew       → true para mostrar la píldora "Nuevo" en la tarjeta
 *
 *  3. Guarda el archivo: buscador, categorías, carrusel, directorio y
 *     mapa del sitio se actualizan automáticamente.
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
  /** Número de contacto */
  phone: string;
  /** Mostrar botón de WhatsApp con el mismo número */
  whatsapp?: boolean;
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
}

export const SERVICES: ServiceListing[] = [
  {
    id: "panaderia-dona-marta",
    title: "Panadería Doña Marta",
    tagline: "Pan caliente cada mañana, a dos casas de distancia",
    category: "alimentos",
    keywords: [
      "pan",
      "panadería",
      "pan dulce",
      "empanadas",
      "media agua",
      "baguette",
      "desayuno",
      "panificado",
    ],
    images: ["/images/svc-panaderia.png"],
    phone: "+506 8888-1001",
    whatsapp: true,
    schedule: "Lun a Sáb · 6:00 a. m. – 6:00 p. m.",
    location: "Calle principal · Casa 4",
    description:
      "Pan artesanal horneado cada mañana: media agua, baguettes, pan dulce y empanadas. Encarga tus panes para el desayuno por WhatsApp y pásalos a buscar calientitos.",
    featured: true,
  },
  {
    id: "reposteria-yozenia",
    title: "Repostería by Yozenia",
    tagline: "Tortas personalizadas para cada celebración",
    isNew: true,
    category: "alimentos",
    keywords: [
      "torta",
      "tortas",
      "repostería",
      "cumpleaños",
      "cupcakes",
      "postres",
      "galletas",
      "brownies",
    ],
    images: ["/images/svc-reposteria.png", "/images/svc-panaderia.png"],
    phone: "+506 8888-1002",
    whatsapp: true,
    schedule: "Pedidos con 3 días de anticipación",
    location: "Torre A · Apartamento 302",
    description:
      "Tortas decoradas por encargo para cumpleaños, baby showers y aniversarios. Cupcakes, galletas y brownies con temática personalizada y ingredientes frescos.",
  },
  {
    id: "finquita-frutas",
    title: "La Finquita · Frutas y Verduras",
    tagline: "De la huerta a tu puerta, sin intermediarios",
    category: "comercio",
    keywords: [
      "frutas",
      "verduras",
      "hortalizas",
      "huerta",
      "orgánico",
      "bolsa semanal",
      "productos frescos",
      "mercado",
    ],
    images: ["/images/svc-verduras.png"],
    phone: "+506 8888-1003",
    whatsapp: true,
    schedule: "Vie y Sáb · 7:00 a. m. – 1:00 p. m.",
    location: "Estacionamiento de visitas",
    description:
      "Bolsas semanales de frutas y verduras frescas traídas de la finca familiar en Cartago. Pide la bolsa mixta o arma tu propia selección por WhatsApp.",
    featured: true,
  },
  {
    id: "taller-don-chente",
    title: "Taller Don Chente",
    tagline: "Carpintería a medida con 30 años de oficio",
    category: "hogar",
    keywords: [
      "carpintería",
      "muebles",
      "madera",
      "reparación",
      "puertas",
      "closets",
      "estantes",
      "taller",
    ],
    images: ["/images/svc-carpinteria.png"],
    phone: "+506 8888-1004",
    whatsapp: false,
    schedule: "Lun a Vie · 7:00 a. m. – 5:00 p. m.",
    location: "Bodegas · Local 2",
    description:
      "Fabricación y reparación de muebles de madera: closets, estantes, puertas y mobiliario a medida. Presupuesto sin costo para vecinos del condominio.",
    featured: true,
  },
  {
    id: "plomeria-mario",
    title: "Plomería y Electricidad Mario",
    tagline: "Fugas, destapes e instalaciones: respuesta el mismo día",
    category: "hogar",
    keywords: [
      "plomería",
      "plomero",
      "destape",
      "fugas",
      "electricidad",
      "electricista",
      "instalaciones",
      "reparaciones",
      "emergencia",
    ],
    images: ["/images/svc-plomeria.png"],
    phone: "+506 8888-1005",
    whatsapp: true,
    schedule: "Lun a Sáb · 7:00 a. m. – 7:00 p. m. · Urgencias hasta 9 p. m.",
    location: "Servicio a domicilio",
    description:
      "Reparación de fugas, destape de cañerías, instalación de lámparas y tomacorrientes. Servicio de urgencia para vecinos con respuesta el mismo día.",
  },
  {
    id: "unas-karla",
    title: "Uñas & Spa Karla",
    tagline: "Uñas esculpidas y nail art sin salir del condominio",
    category: "belleza",
    keywords: [
      "uñas",
      "manicure",
      "pedicure",
      "nail art",
      "gel",
      "acrylic",
      "esmaltado",
      "spa",
    ],
    images: ["/images/svc-unas.png"],
    phone: "+506 8888-1006",
    whatsapp: true,
    schedule: "Lun a Sáb · 8:00 a. m. – 6:00 p. m.",
    location: "Torre C · Apartamento 105",
    description:
      "Manicure y pedicure con esmaltado semipermanente, uñas esculpidas y nail art personalizado. Atención con cita previa en un espacio relajante y privado.",
    featured: true,
  },
  {
    id: "salon-elena",
    title: "Salón de Belleza Elena",
    tagline: "Cortes, color y peinados para toda la familia",
    category: "belleza",
    keywords: [
      "corte de cabello",
      "tinte",
      "color",
      "peinado",
      "maquillaje",
      "salón",
      "estilista",
      "niños",
    ],
    images: ["/images/svc-salon.png"],
    phone: "+506 8888-1007",
    whatsapp: false,
    schedule: "Mar a Sáb · 8:00 a. m. – 5:00 p. m.",
    location: "Casa 11 · Entrada lateral",
    description:
      "Cortes de cabello para damas, caballeros y niños, tintes, mechas, peinados y maquillaje para eventos. Con cita previa por teléfono o WhatsApp.",
  },
  {
    id: "masajes-aura",
    title: "Masajes & Terapias Aura",
    tagline: "Relájate sin salir de casa: atención en tu hogar",
    category: "salud",
    keywords: [
      "masajes",
      "relajación",
      "terapias",
      "espalda",
      "estrés",
      "masaje deportivo",
      "bienestar",
    ],
    images: ["/images/svc-masajes.png"],
    phone: "+506 8888-1008",
    whatsapp: true,
    schedule: "Lun a Sáb · 9:00 a. m. – 7:00 p. m.",
    location: "Servicio a domicilio",
    description:
      "Masajes relajantes, descontracturantes y deportivos a domicilio dentro del condominio. Sesiones de 60 o 90 minutos con aceites esenciales y música de relajación.",
  },
  {
    id: "yoga-larueda",
    title: "Yoga Comunitario La Rueda",
    tagline: "Clases al amanecer en el jardín central",
    category: "salud",
    keywords: [
      "yoga",
      "estiramientos",
      "meditación",
      "ejercicio",
      "clase grupal",
      "bienestar",
      "respiración",
    ],
    images: ["/images/svc-yoga.png"],
    phone: "+506 8888-1009",
    whatsapp: true,
    schedule: "Lun, Mié y Vie · 5:30 a. m. – 6:30 a. m.",
    location: "Jardín central del condominio",
    description:
      "Clases de yoga para todos los niveles en el jardín central. Trae tu colchoneta; la primera clase de prueba es gratuita para vecinos y sus visitas.",
    featured: true,
  },
  {
    id: "clases-sofia",
    title: "Clases Particulares con Sofía",
    tagline: "Refuerzo escolar de matemáticas e inglés",
    category: "educacion",
    keywords: [
      "clases",
      "tutoría",
      "matemáticas",
      "inglés",
      "tarea",
      "refuerzo escolar",
      "primaria",
      "secundaria",
      "estudio",
    ],
    images: ["/images/svc-clases.png"],
    phone: "+506 8888-1010",
    whatsapp: true,
    schedule: "Lun a Vie · 3:00 p. m. – 7:00 p. m.",
    location: "Torre B · Apartamento 201",
    description:
      "Tutorías personalizadas de matemáticas e inglés para primaria y secundaria. Refuerzo de tareas y preparación para exámenes, presencial o virtual.",
  },
  {
    id: "guitarra-andres",
    title: "Guitarra con Andrés",
    tagline: "Aprende tus primeras canciones en un mes",
    category: "educacion",
    keywords: [
      "guitarra",
      "música",
      "clases de música",
      "acordes",
      "acústica",
      "niños",
      "adultos",
    ],
    images: ["/images/svc-clases.png"],
    phone: "+506 8888-1011",
    whatsapp: true,
    schedule: "Mar y Jue · 4:00 p. m. – 7:00 p. m.",
    location: "Casa 7 · Terraza",
    description:
      "Clases de guitarra acústica para niños y adultos, desde cero o para perfeccionar técnica. Método práctico: tocas una canción completa desde la primera lección.",
  },
  {
    id: "petspa-guau-miau",
    title: "Pet Spa Guau & Miau",
    tagline: "Baño, corte y mimos para los peluditos",
    category: "mascotas",
    keywords: [
      "grooming",
      "baño de mascotas",
      "corte de pelo",
      "perros",
      "gatos",
      "uñas de mascotas",
      "peluquería canina",
    ],
    images: ["/images/svc-mascotas.png"],
    phone: "+506 8888-1012",
    whatsapp: true,
    schedule: "Lun a Sáb · 8:00 a. m. – 5:00 p. m.",
    location: "Casa 19 · Retral frontal",
    description:
      "Baño, corte de pelo, limpieza de oídos y corte de uñas para perros y gatos de todas las razas. Recogida y entrega a la puerta de tu casa sin costo.",
    featured: true,
  },
  {
    id: "taxi-don-rigo",
    title: "Taxi de Confianza · Don Rigo",
    tagline: "Aeropuerto, trámites y rutas seguras",
    category: "transporte",
    keywords: [
      "taxi",
      "transporte",
      "aeropuerto",
      "trámites",
      "bancos",
      "médico",
      "chofer",
      "ruta segura",
    ],
    images: ["/images/svc-taxi.png"],
    phone: "+506 8888-1013",
    whatsapp: false,
    schedule: "Todos los días · 5:00 a. m. – 9:00 p. m.",
    location: "Servicio a domicilio",
    description:
      "Transporte privado en sedán con aire acondicionado. Viajes al aeropuerto, bancos, hospitales y trámites. Conoce al conductor: es tu vecino de la Casa 23.",
  },
  {
    id: "delivery-veloz",
    title: "Delivery Veloz La Rueda",
    tagline: "Mandados, farmacia y sobres: lo llevamos por ti",
    isNew: true,
    category: "transporte",
    keywords: [
      "delivery",
      "mandados",
      "recados",
      "farmacia",
      "sobres",
      "compras",
      "mensajería",
      "encargos",
    ],
    images: ["/images/svc-delivery.png"],
    phone: "+506 8888-1014",
    whatsapp: true,
    schedule: "Todos los días · 7:00 a. m. – 8:00 p. m.",
    location: "Servicio a domicilio",
    description:
      "Servicio de mandados dentro y fuera del condominio: farmacia, súper, sobres y encargos. Tarifa fija dentro del condominio y tarifas preferenciales para vecinos.",
  },
];

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
    { weight: 7, text: service.keywords.join(" ") },
    { weight: 5, text: category?.label ?? "" },
    { weight: 4, text: service.tagline ?? "" },
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
