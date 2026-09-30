import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site-config";

/* Sitemap del sitio de una sola página.
   Los anclas (#servicios, #faq…) no son URLs independientes, así que
   el sitemap solo expone la raíz con prioridad máxima. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
