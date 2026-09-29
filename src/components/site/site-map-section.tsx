"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  MAPA DEL SITIO — Índice visual tipo mapa de guía turística
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  ▶ 3 columnas: Secciones (anclas) · Categorías (filtro del
 *    directorio) · Índice de anuncios A–Z (abre la ficha).
 *  ▶ Los botones de categoría y del índice sincronizan con el
 *    buscador/directorio vía useSearchStore (misma fuente de verdad).
 *  ▶ Animación whileInView respetuosa de prefers-reduced-motion.
 */

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  HelpCircle,
  Home,
  LayoutGrid,
  Map as MapIcon,
  MapPin,
  Megaphone,
  Search,
  Star,
  type LucideIcon,
} from "lucide-react";

import { ServiceDialog } from "@/components/site/service-dialog";
import { FAQ_ITEMS } from "@/lib/data/faq";
import {
  CATEGORIES,
  categoryCounts,
  getServicesByCategory,
  SERVICES,
  type ServiceListing,
} from "@/lib/data/services";
import { scrollToSection, useSearchStore } from "@/lib/search-store";
import { SITE } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Icono por sección (ids de SITE.anchors) */
const ANCHOR_ICONS: Record<string, LucideIcon> = {
  inicio: Home,
  buscador: Search,
  destacados: Star,
  categorias: LayoutGrid,
  servicios: BookOpen,
  faq: HelpCircle,
  mapa: MapIcon,
  anunciate: Megaphone,
};

/** Curva de entrada suave, coherente con el resto de la guía */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SiteMapSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const setCategory = useSearchStore((state) => state.setCategory);

  /** Estado local de la ficha de anuncio (contrato EXACTO de ServiceDialog) */
  const [selected, setSelected] = useState<ServiceListing | null>(null);
  const [open, setOpen] = useState(false);

  const counts = useMemo(() => categoryCounts(), []);

  /** Índice A–Z: categorías con anuncios, servicios en orden alfabético */
  const indexGroups = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        category,
        services: [...getServicesByCategory(category.id)].sort((a, b) =>
          a.title.localeCompare(b.title, "es"),
        ),
      })).filter((group) => group.services.length > 0),
    [],
  );

  const openListing = (service: ServiceListing) => {
    setSelected(service);
    setOpen(true);
  };

  /** Entrada sutil; se desactiva por completo con prefers-reduced-motion */
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 28 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section id="mapa" aria-label="Mapa del sitio" className="relative">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* ── Encabezado ──────────────────────────────────────── */}
        <motion.div {...reveal(0)} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-pine-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-pine">
            Mapa del sitio
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-pine md:text-4xl">
            Tu mapa de la guía
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Todo el condominio comercial en una sola vista: secciones,
            categorías y el índice completo de anuncios.
          </p>
        </motion.div>

        {/* ── Panel principal estilo mapa de guía ─────────────── */}
        <motion.div
          {...reveal(0.1)}
          className="relative mt-10 overflow-hidden rounded-[2rem] border-2 border-brand-pine/10 bg-card p-6 shadow-sm md:p-10"
        >
          {/* Decoración: puntos de mapa + brújula gigante */}
          <div
            aria-hidden="true"
            className="patron-puntos pointer-events-none absolute -right-8 -top-8 h-44 w-44 text-brand-pine/10"
          />
          <MapIcon
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 -left-10 size-56 -rotate-12 text-brand-pine opacity-5"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.2fr_1.6fr]">
            {/* (1) Secciones ──────────────────────────────────── */}
            <nav aria-label="Secciones de la guía">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-brand-pine">
                <Compass
                  aria-hidden="true"
                  className="size-5 text-brand-terracotta"
                />
                Secciones
              </h3>
              <ul className="mt-4 space-y-1">
                {SITE.anchors.map((anchor) => {
                  const Icon = ANCHOR_ICONS[anchor.id] ?? MapIcon;
                  return (
                    <li key={anchor.id}>
                      <a
                        href={`#${anchor.id}`}
                        className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-4 shrink-0 text-brand-teal-dark"
                        />
                        {anchor.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* (2) Categorías ─────────────────────────────────── */}
            <div className="lg:border-l lg:border-dashed lg:border-border lg:pl-10">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-brand-pine">
                <LayoutGrid
                  aria-hidden="true"
                  className="size-5 text-brand-terracotta"
                />
                Categorías
              </h3>
              <ul className="mt-4 space-y-1">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      aria-label={`Filtrar directorio por ${category.label}`}
                      onClick={() => {
                        setCategory(category.id);
                        scrollToSection("servicios");
                      }}
                      className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-3 w-3 shrink-0 rounded-full",
                          `bg-cat-${category.id}`,
                        )}
                      />
                      <span className="flex-1 text-sm font-medium">
                        {category.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {counts[category.id]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* (3) Índice de anuncios A–Z ─────────────────────── */}
            <div className="lg:border-l lg:border-dashed lg:border-border lg:pl-10">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-brand-pine">
                <BookOpen
                  aria-hidden="true"
                  className="size-5 text-brand-terracotta"
                />
                Índice de anuncios{" "}
                <span className="texto-marca">A–Z</span>
              </h3>
              <div className="scrollbar-fina mt-4 max-h-[420px] overflow-y-auto pr-2">
                <div className="space-y-5">
                  {indexGroups.map(({ category, services }) => (
                    <div key={category.id}>
                      <p
                        className={cn(
                          "text-[11px] font-bold uppercase tracking-wider",
                          `text-cat-${category.id}`,
                        )}
                      >
                        {category.label}
                      </p>
                      <ul className="mt-1.5 space-y-0.5">
                        {services.map((service) => (
                          <li key={service.id}>
                            <button
                              type="button"
                              onClick={() => openListing(service)}
                              className="group flex min-h-11 w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <span className="min-w-0 flex-1">
                                {service.title}
                              </span>
                              <ArrowUpRight
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Pie del panel ───────────────────────────────────── */}
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-soft px-4 py-2 text-xs font-semibold text-brand-pine">
              <MapPin aria-hidden="true" className="size-3.5" />
              Estás en: Inicio
            </span>
            <p className="text-xs text-muted-foreground">
              {SERVICES.length} anuncios · {CATEGORIES.length} categorías ·{" "}
              {FAQ_ITEMS.length} preguntas
            </p>
          </div>
        </motion.div>

        {/* Ficha de anuncio (portal; contrato exacto de 2-b) */}
        <ServiceDialog service={selected} open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
}
