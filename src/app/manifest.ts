import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site-config";

/* Manifest PWA-lite: instalable en el teléfono del vecino con icono de
   marca, colores de la paleta oficial y nombre es-CR. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.legalName}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7ef", // brand-cream
    theme_color: "#12433c", // brand-pine
    lang: "es-CR",
    categories: ["shopping", "community", "lifestyle"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
