/**
 * ═══════════════════════════════════════════════════════════════════
 *  ARCHIVO DE DATOS — PREGUNTAS FRECUENTES
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  ▶ Para agregar una pregunta: copia un bloque { ... }, pégalo al final
 *    de FAQ_ITEMS y define question, answer y category.
 *  ▶ Las preguntas se agrupan por categoría en la sección FAQ y alimentan
 *    el esquema FAQPage (SEO) automáticamente.
 */

export const FAQ_CATEGORY_IDS = ["general", "publicar", "buscar", "contacto"] as const;

export type FaqCategoryId = (typeof FAQ_CATEGORY_IDS)[number];

export const FAQ_CATEGORY_LABELS: Record<FaqCategoryId, string> = {
  general: "General",
  publicar: "Publicar",
  buscar: "Buscar",
  contacto: "Contacto",
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategoryId;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "que-es-la-guia",
    question: "¿Qué es Vecinos y Servicios?",
    answer:
      "Es la guía comercial del Condominio La Rueda: un espacio donde los vecinos publican los productos y servicios que ofrecen a la comunidad. Funciona como una guía turística, pero de nuestra propia comunidad: explora el carrusel de destacados, busca lo que necesitas y contacta directo al vecino.",
    category: "general",
  },
  {
    id: "que-hay-en-el-carrusel",
    question: "¿Qué aparece en el carrusel de destacados?",
    answer:
      "El carrusel muestra los servicios y productos que los vecinos administradores seleccionan para resaltar en cada temporada. Rota automáticamente, se puede deslizar con el dedo o con las flechas, y cada tarjeta tiene botones directos para llamar al vecino o pedir por el grupo de WhatsApp.",
    category: "general",
  },
  {
    id: "responsabilidad-transacciones",
    question: "¿El condominio se hace responsable de las compras?",
    answer:
      "No. La guía es un medio informativo entre vecinos: precios, entregas, garantías y calidad se acuerdan directamente con cada vecino vendedor. Te recomendamos coordinar siempre dentro del condominio y hacer tus solicitudes por el grupo oficial de WhatsApp de la comunidad.",
    category: "general",
  },
  {
    id: "cada-cuanto-actualiza",
    question: "¿Cada cuánto se actualiza la guía?",
    answer:
      "La guía se actualiza a la brevedad posible. Cuando un vecino publica, edita o retira un servicio, los cambios se reflejarán pronto en el buscador, las categorías y el carrusel.",
    category: "general",
  },
  {
    id: "quien-mantiene",
    question: "¿Quién mantiene la guía?",
    answer:
      "La administran los propios vecinos del condominio de forma voluntaria: ellos revisan, publican y mantienen los anuncios al día. No hay empresas ni administradores externos. Si detectas información desactualizada o quieres sugerir una mejora, escríbelo al grupo de WhatsApp de los vecinos.",
    category: "general",
  },
  {
    id: "quien-puede-publicar",
    question: "¿Quién puede publicar su servicio?",
    answer:
      "Cualquier residente o propietario del Condominio La Rueda que ofrezca un producto o servicio lícito y compatible con la convivencia: desde panaderías caseras y clases particulares hasta plomería o transporte.",
    category: "publicar",
  },
  {
    id: "como-publicar",
    question: "¿Cómo publico mi servicio o producto?",
    answer:
      "Tres pasos: 1) Prepara tu información (título, categoría, palabras clave, fotos, número de contacto y descripción). 2) Escríbela al grupo de WhatsApp de los vecinos. 3) Los vecinos administradores la revisan y a la brevedad posible su anuncio aparece en la guía, listo para que tus vecinos te encuentren.",
    category: "publicar",
  },
  {
    id: "costo-publicar",
    question: "¿Tiene algún costo publicar?",
    answer:
      "No, publicar es gratuito para todos los vecinos del condominio. La guía es un beneficio de la comunidad para impulsar el comercio entre vecinos.",
    category: "publicar",
  },
  {
    id: "informacion-anuncio",
    question: "¿Qué información debe incluir mi anuncio?",
    answer:
      "Cada anuncio contiene: título del negocio o servicio, categoría, palabras clave, una o varias imágenes, número de contacto y descripción del servicio. Mientras más claras sean tus palabras clave, más fácil será que tus vecinos te encuentren en el buscador.",
    category: "publicar",
  },
  {
    id: "como-enviar-imagenes",
    question: "¿Cómo envío las imágenes de mi anuncio?",
    answer:
      "Envía entre 1 y 4 fotos buenas (JPG o PNG), con buena luz y sin marcas de agua. La primera será la imagen principal del anuncio. Adjúntalas en el grupo de WhatsApp de los vecinos, junto con el resto de tu información.",
    category: "publicar",
  },
  {
    id: "editar-o-eliminar",
    question: "¿Puedo editar o eliminar mi anuncio después?",
    answer:
      "Sí. Escríbelo en el grupo de WhatsApp de los vecinos indicando el nombre de tu anuncio y el cambio (nuevo horario, nuevo teléfono, nuevas fotos o retirarlo). Los vecinos administradores lo aplicarán a la brevedad posible.",
    category: "publicar",
  },
  {
    id: "productos-y-servicios",
    question: "¿Puedo publicar si vendo productos y no servicios?",
    answer:
      "¡Claro! La guía incluye productos y servicios. Los productos van en categorías como «Productos y Ventas» o «Alimentos y Repostería», y los servicios en categorías como «Hogar y Reparaciones», «Belleza y Estética» o «Transporte y Mensajería».",
    category: "publicar",
  },
  {
    id: "como-funciona-buscador",
    question: "¿Cómo funciona el buscador?",
    answer:
      "Escribe lo que necesitas (por ejemplo «pan», «plomero» o «uñas») y verás resultados mientras escribes. El buscador revisa títulos, palabras clave, categorías y descripciones, ignora tildes y mayúsculas, y prioriza las coincidencias más relevantes.",
    category: "buscar",
  },
  {
    id: "que-son-palabras-clave",
    question: "¿Qué son las palabras clave?",
    answer:
      "Son términos que describen a cada servicio y alimentan el buscador: «empanadas», «destape», «grooming»… Sirven para que encuentres un servicio aunque no sepas el nombre del negocio. Puedes sugerir palabras clave al publicar tu anuncio.",
    category: "buscar",
  },
  {
    id: "sin-resultados",
    question: "¿Por qué no encuentro resultados?",
    answer:
      "Prueba con otra palabra (por ejemplo «torta» en lugar de «pastel»), revisa la ortografía —el buscador ya ignora tildes— o explora por categorías. Si crees que falta un servicio, invita a ese vecino a publicar: la guía crece entre todos.",
    category: "buscar",
  },
  {
    id: "navegar-categorias",
    question: "¿Puedo navegar solo por una categoría?",
    answer:
      "Sí. En la sección «Categorías» toca la que te interese y el directorio se filtrará automáticamente. También puedes usar los filtros rápidos dentro del directorio o combinarlos con el buscador.",
    category: "buscar",
  },
  {
    id: "como-contactar-vecino",
    question: "¿Cómo contacto a un vecino vendedor?",
    answer:
      "Para solicitar cualquier servicio escribe al grupo de WhatsApp de los vecinos: el botón verde «Pedir por WhatsApp» de cada tarjeta te lleva directo al grupo. Cada anuncio también muestra el número del vecino por si prefieres llamar, y la ficha completa incluye horario, ubicación y descripción detallada.",
    category: "contacto",
  },

  {
    id: "como-entrar-al-grupo",
    question: "¿Cómo me uno al grupo de WhatsApp?",
    answer:
      "Usa el botón verde «Unirme al grupo de WhatsApp» del pie de página o el de la sección «Anúnciate». Si el enlace cambió, pídeselo a cualquier vecino administrador de la guía; todas las solicitudes de la comunidad se coordinan en ese grupo.",
    category: "contacto",
  },
  {
    id: "reportar-anuncio",
    question: "¿Cómo reporto un anuncio o hago una sugerencia?",
    answer:
      "Escríbelo en el grupo de WhatsApp de los vecinos con el nombre del anuncio y el motivo. Los vecinos administradores revisan todo reporte para mantener una guía confiable y útil para toda la comunidad.",
    category: "contacto",
  },
];
