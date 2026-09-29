"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Heart, LayoutGrid, Search, SearchX } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import {
  CATEGORIES,
  categoryCounts,
  categoryUi,
  searchServices,
  type CategoryFilter,
} from "@/lib/data/services";
import { useSearchStore } from "@/lib/search-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { ServiceCard } from "@/components/site/service-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/* Conteos estáticos (los datos viven en código) */
const COUNTS = categoryCounts();
const TOTAL = Object.values(COUNTS).reduce((sum, count) => sum + count, 0);

interface FilterChip {
  id: CategoryFilter;
  label: string;
  icon: LucideIcon;
  count: number;
}

/* Filtros compactos: "Todas" + las 8 categorías predefinidas */
const FILTER_CHIPS: FilterChip[] = [
  { id: "todas", label: "Todas", icon: LayoutGrid, count: TOTAL },
  ...CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    icon: category.icon,
    count: COUNTS[category.id],
  })),
];

function pluralCount(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`;
}

/**
 * Directorio completo de la guía: grid de todas las tarjetas con barra
 * de controles sticky (búsqueda compacta + pills de categoría) que
 * comparte estado con el híper-buscador mediante useSearchStore.
 */
export function DirectorySection() {
  const query = useSearchStore((state) => state.query);
  const category = useSearchStore((state) => state.category);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setCategory = useSearchStore((state) => state.setCategory);
  const clear = useSearchStore((state) => state.clear);
  const favorites = useFavoritesStore((state) => state.favorites);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const results = useMemo(() => {
    const base = searchServices(query, category);
    if (!onlyFavorites) return base;
    const favoriteSet = new Set(favorites);
    return base.filter((result) => favoriteSet.has(result.service.id));
  }, [query, category, onlyFavorites, favorites]);

  const hasQuery = query.trim().length > 0;
  const isEmpty = results.length === 0;

  const counterText = hasQuery
    ? `${pluralCount(results.length, "resultado", "resultados")} para «${query}»`
    : onlyFavorites
      ? `${pluralCount(results.length, "anuncio favorito", "anuncios favoritos")}`
      : `${pluralCount(results.length, "anuncio", "anuncios")} en el directorio`;

  return (
    <section id="servicios" aria-label="Directorio de servicios" className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* Encabezado */}
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-brand-terracotta-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-terracotta-dark">
            Directorio completo
          </span>

          <h2 className="mt-4 font-display text-3xl font-semibold text-brand-pine md:text-4xl">
            Todos los servicios y productos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Explora todo lo que la comunidad del condominio ofrece. Filtra por categoría o busca directamente.
          </p>
        </div>

        {/* Barra de controles sticky: búsqueda compacta + categorías */}
        <div className="sticky top-[88px] z-20 mt-8 rounded-2xl border bg-background/90 py-3 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 px-3 md:flex-row md:items-center md:px-4">
            <div className="relative md:flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-teal"
                aria-hidden="true"
              />
              <Input
                type="text"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar en el directorio…"
                aria-label="Buscar en el directorio de servicios"
                className="h-11 rounded-full border-border bg-card pl-10 pr-4"
              />
            </div>

            <div
              role="group"
              aria-label="Filtrar el directorio por categoría"
              className="scrollbar-fina flex gap-1.5 overflow-x-auto pb-1 md:max-w-[62%] md:pb-0"
            >
              {/* Filtro de favoritos (persistente en el dispositivo) */}
              <button
                type="button"
                aria-pressed={onlyFavorites}
                onClick={() => setOnlyFavorites((value) => !value)}
                className={cn(
                  "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-all duration-200",
                  onlyFavorites
                    ? "border-transparent bg-brand-terracotta text-white shadow-sm"
                    : "border-border bg-card text-foreground/75 hover:border-brand-terracotta hover:text-brand-terracotta-dark",
                )}
              >
                <Heart
                  className={cn("h-3.5 w-3.5", onlyFavorites && "fill-current")}
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">Favoritos</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[11px] font-semibold leading-4",
                    onlyFavorites ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {favorites.length}
                </span>
              </button>

              {FILTER_CHIPS.map((chip) => {
                const active = category === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(chip.id)}
                    className={cn(
                      "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-medium transition-all duration-200",
                      active
                        ? chip.id === "todas"
                          ? "border-transparent bg-brand-pine text-brand-cream shadow-sm"
                          : cn("border-transparent shadow-sm", categoryUi(chip.id).classes.solid)
                        : "border-border bg-card text-foreground/75 hover:border-brand-teal hover:text-brand-teal-dark",
                    )}
                  >
                    <chip.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="whitespace-nowrap">{chip.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[11px] font-semibold leading-4",
                        active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {chip.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contador accesible */}
        <p aria-live="polite" className="mt-6 text-sm font-medium text-muted-foreground">
          {counterText}
        </p>

        {/* Estado vacío */}
        {isEmpty && (
          <div className="mt-4 rounded-2xl border border-dashed border-brand-pine/25 bg-brand-cream-deep/40 p-10 text-center">
            <SearchX
              className="mx-auto h-8 w-8 text-brand-terracotta"
              aria-hidden="true"
            />
            <p className="mt-3 font-display text-xl text-brand-pine">
              {onlyFavorites && favorites.length === 0
                ? "Aún no guardas favoritos"
                : hasQuery
                  ? `Sin resultados para «${query}»`
                  : "No hay anuncios en esta categoría todavía"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {onlyFavorites && favorites.length === 0
                ? "Toca el corazón de cualquier anuncio para guardarlo aquí."
                : "Prueba con otra palabra o quita los filtros activos."}
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={onlyFavorites ? () => setOnlyFavorites(false) : clear}
              className="mt-5 h-11 rounded-full px-5 text-sm font-semibold text-brand-pine hover:bg-brand-pine-soft"
            >
              {onlyFavorites ? "Ver todos los anuncios" : "Limpiar filtros"}
            </Button>
          </div>
        )}

        {/* Grid del directorio */}
        {!isEmpty && (
          <div className="mt-4 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.service.id}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: reduceMotion ? 0 : (index % 4) * 0.06,
                }}
              >
                <ServiceCard service={result.service} priority={index < 4} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
