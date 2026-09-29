import type { ServiceListing } from "@/lib/data/services";
import { SITE } from "@/lib/site-config";

/**
 * Lógica compartida para compartir un anuncio (la usan la ficha
 * ServiceDialog y las tarjetas del directorio/buscador).
 */

/** Enlace profundo: abre la guía con la búsqueda del anuncio ya hecha */
export function listingShareUrl(service: ServiceListing): string {
  if (typeof window === "undefined") return SITE.url;
  return `${window.location.origin}/?q=${encodeURIComponent(service.title)}#buscador`;
}

function shareDataFor(service: ServiceListing): ShareData {
  return {
    title: `${service.title} · ${SITE.name}`,
    text: `Mira este anuncio de la guía del ${SITE.community}: ${service.title}${
      service.tagline ? ` — ${service.tagline}` : ""
    }`,
    url: listingShareUrl(service),
  };
}

export type ShareResult = "shared" | "copied" | "cancelled" | "failed";

/**
 * Comparte con la Web Share API cuando existe (móvil) y usa el
 * portapapeles como respaldo (escritorio). Nunca lanza: devuelve un
 * resultado para que la UI muestre el toast que corresponda.
 */
export async function shareListing(service: ServiceListing): Promise<ShareResult> {
  const shareData = shareDataFor(service);
  try {
    if (typeof navigator.share === "function") {
      await navigator.share(shareData);
      return "shared";
    }
    await navigator.clipboard.writeText(shareData.url ?? listingShareUrl(service));
    return "copied";
  } catch (error) {
    // El usuario canceló el diálogo nativo: no es un error
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled";
    }
    return "failed";
  }
}
