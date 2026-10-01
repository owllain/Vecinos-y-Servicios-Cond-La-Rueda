"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  CATEGORÍAS PREDEFINIDAS — 8 rutas + acceso al directorio completo
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  · Tarjetas con personalidad de guía turística: color propio por
 *    categoría (tokens bg-cat-*-soft / text-cat-*), conteo en vivo y
 *    flecha que se desliza al pasar el mouse.
 *  · Miller-friendly: 8 categorías + 1 tarjeta "todo" = 9 celdas en
 *    una grilla simétrica de 4 columnas en desktop.
 *  · Click → setCategory() del store global + scroll a #servicios.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, LayoutGrid } from "lucide-react";

import {
  CATEGORIES,
  SERVICES,
  categoryCounts,
  categoryUi,
  type CategoryId,
} from "@/lib/data/services";
import { scrollToSection, useSearchStore } from "@/lib/search-store";
import { cn } from "@/lib/utils";

/** "1 anuncio" vs "n anuncios" (es-CR) */
function etiquetaAnuncios(n: number): string {
  return n === 1 ? "1 anuncio" : `${n} anuncios`;
}

/**
 * Clases LITERALES por categoría para el color de acento del hover del
 * título y del anillo de foco. Deben escribirse completas en el código
 * para que Tailwind las detecte y compile (no se pueden armar en
 * runtime con variables).
 */
const HOVER_TEXT_POR_CATEGORIA: Record<CategoryId, string> = {
  alimentos: "group-hover:text-cat-alimentos",
  hogar: "group-hover:text-cat-hogar",
  salud: "group-hover:text-cat-salud",
  belleza: "group-hover:text-cat-belleza",
  educacion: "group-hover:text-cat-educacion",
  mascotas: "group-hover:text-cat-mascotas",
  comercio: "group-hover:text-cat-comercio",
  transporte: "group-hover:text-cat-transporte",
  asesoria: "group-hover:text-cat-asesoria",
};

const RING_POR_CATEGORIA: Record<CategoryId, string> = {
  alimentos: "focus-visible:ring-cat-alimentos",
  hogar: "focus-visible:ring-cat-hogar",
  salud: "focus-visible:ring-cat-salud",
  belleza: "focus-visible:ring-cat-belleza",
  educacion: "focus-visible:ring-cat-educacion",
  mascotas: "focus-visible:ring-cat-mascotas",
  comercio: "focus-visible:ring-cat-comercio",
  transporte: "focus-visible:ring-cat-transporte",
  asesoria: "focus-visible:ring-cat-asesoria",
};

export function CategoriesSection() {
  const setCategory = useSearchStore((state) => state.setCategory);
  const counts = useMemo(() => categoryCounts(), []);

  const [reducedMotion, setReducedMotion] = useState(false);

  /* Animaciones de entrada se anulan si el usuario prefiere menos
     movimiento (prefers-reduced-motion, con matchMedia reactivo) */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  /** Filtra el directorio y lleva a la persona hasta #servicios */
  const irAlDirectorio = useCallback((categoria: CategoryId | "todas") => {
    setCategory(categoria);
    scrollToSection("servicios");
  }, [setCategory]);

  return (
    <section
      id="categorias"
      aria-label="Categorías de la guía"
      className="relative overflow-hidden"
    >
      {/* Decoración de puntos estilo mapa de guía */}
      <div
        aria-hidden="true"
        className="patron-puntos pointer-events-none absolute right-0 top-10 hidden h-44 w-44 text-brand-pine/10 lg:block"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* ── Encabezado centrado ── */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-2xl text-center">

            <h2 className="mt-4 font-display text-3xl leading-tight text-brand-pine md:text-4xl">
              Explora la guía por categoría
            </h2>
            <p className="mt-3 text-balance text-muted-foreground">
              Ocho rutas claras para encontrar lo que necesitas, sin perderte.
            </p>
          </div>
        </motion.div>

        {/* ── Grilla: 8 categorías + tarjeta "todo el directorio" ── */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {CATEGORIES.map((categoria, index) => {
            const ui = categoryUi(categoria.id);
            const IconoCategoria = ui.icon;
            const n = counts[categoria.id];

            return (
              <motion.div
                key={categoria.id}
                className="h-full"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : index * 0.06,
                  ease: "easeOut",
                }}
              >
                <button
                  type="button"
                  onClick={() => irAlDirectorio(categoria.id)}
                  aria-label={`Ver ${etiquetaAnuncios(n)} de ${ui.label}`}
                  className={cn(
                    "group relative flex h-full min-h-[150px] w-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    RING_POR_CATEGORIA[categoria.id],
                  )}
                >


                  <span
                    className={cn(
                      "inline-flex w-fit rounded-2xl p-3",
                      ui.classes.soft,
                    )}
                  >
                    <IconoCategoria
                      className={cn("h-6 w-6", ui.classes.text)}
                      aria-hidden="true"
                    />
                  </span>

                  <span
                    className={cn(
                      "mt-4 block font-display text-lg leading-snug text-brand-pine transition-colors duration-300",
                      HOVER_TEXT_POR_CATEGORIA[categoria.id],
                    )}
                  >
                    {ui.label}
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-muted-foreground line-clamp-2">
                    {ui.description}
                  </span>

                  <span className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-semibold",
                        ui.classes.soft,
                        ui.classes.text,
                      )}
                    >
                      {etiquetaAnuncios(n)}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-teal"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </motion.div>
            );
          })}

          {/* ── Tarjeta extra: todo el directorio (9.ª celda) ── */}
          <motion.div
            className="h-full"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: reducedMotion ? 0 : 0.5,
              delay: reducedMotion ? 0 : CATEGORIES.length * 0.06,
              ease: "easeOut",
            }}
          >
            <button
              type="button"
              onClick={() => irAlDirectorio("todas")}
              aria-label={`Ver todo el directorio: ${SERVICES.length} anuncios en total`}
              className="group flex h-full min-h-[150px] w-full flex-col rounded-2xl border border-dashed border-border bg-brand-cream-deep/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal hover:shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="inline-flex w-fit rounded-2xl bg-brand-pine-soft p-3">
                <LayoutGrid className="h-6 w-6 text-brand-pine" aria-hidden="true" />
              </span>

              <span className="mt-4 block font-display text-lg leading-snug text-brand-pine transition-colors duration-300 group-hover:text-brand-teal-dark">
                Todas las categorías
              </span>
              <span className="mt-1 block text-sm leading-snug text-muted-foreground line-clamp-2">
                {SERVICES.length} anuncios en total
              </span>

              <span className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="rounded-full bg-brand-pine-soft px-2.5 py-1 text-xs font-semibold text-brand-pine">
                  Explorar todo
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-teal"
                  aria-hidden="true"
                />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
