"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { LayoutGrid, Search, SearchX, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import {
  CATEGORIES,
  categoryCounts,
  categoryUi,
  searchServices,
  type CategoryFilter,
} from "@/lib/data/services";
import { scrollToSection, useSearchStore } from "@/lib/search-store";
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

/* Filtros: "Todas" + las 8 categorías predefinidas */
const FILTER_CHIPS: FilterChip[] = [
  { id: "todas", label: "Todas", icon: LayoutGrid, count: TOTAL },
  ...CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    icon: category.icon,
    count: COUNTS[category.id],
  })),
];

/* Sugerencias visibles (ley de Hick: máximo 6) */
const SUGGESTIONS = ["pan", "plomero", "uñas", "yoga", "taxi", "frutas"] as const;

function pluralCount(n: number, singular: string, plural: string): string {
  return `${n} ${n === 1 ? singular : plural}`;
}

/**
 * EL HÍPER-BUSCADOR: búsqueda instantánea (debounce 150 ms) con
 * sugerencias, filtros por categoría y resultados con resaltado.
 * Comparte query + categoría con el resto del sitio vía useSearchStore.
 */
export function SearchSection() {
  const query = useSearchStore((state) => state.query);
  const category = useSearchStore((state) => state.category);
  const setQuery = useSearchStore((state) => state.setQuery);
  const setCategory = useSearchStore((state) => state.setCategory);

  const [input, setInput] = useState(query);
  const [inputFocused, setInputFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Sincroniza el campo local cuando la consulta cambia desde otro
  // punto del sitio (input del directorio, botón limpiar, chips…).
  useEffect(() => {
    setInput(query);
  }, [query]);

  // Soporte ?q= en la URL (activa el SearchAction del JSON-LD):
  // al llegar con /?q=pan#buscador la búsqueda se aplica sola.
  const urlQueryApplied = useRef(false);
  useEffect(() => {
    if (urlQueryApplied.current) return;
    urlQueryApplied.current = true;
    // Defer a un macrotask: evita setState síncrono en el efecto y
    // deja que la página termine de hidratar antes de desplazarse.
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      let urlQuery = params.get("q") ?? "";
      if (!urlQuery) {
        const match = /[?#&]q=([^&]+)/.exec(window.location.hash);
        if (match) urlQuery = decodeURIComponent(match[1]);
      }
      if (urlQuery) {
        setInput(urlQuery);
        setQuery(urlQuery);
        document
          .getElementById("buscador")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        inputRef.current?.focus({ preventScroll: true });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [setQuery]);

  // Atajo de teclado "/": salta al buscador desde cualquier parte
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);
      if (isTyping) return;
      event.preventDefault();
      document
        .getElementById("buscador")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      inputRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Limpia el debounce pendiente al desmontar
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  /** Escritura con debounce de 150 ms para no re-renderizar el mundo */
  const handleInput = (value: string) => {
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(value), 150);
  };

  /** Cambio inmediato de consulta (chips de sugerencia, botón limpiar) */
  const applyQuery = (value: string) => {
    setInput(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery(value);
  };

  const handleClear = () => {
    applyQuery("");
    inputRef.current?.focus();
  };

  const results = useMemo(
    () => searchServices(query, category),
    [query, category],
  );

  const hasQuery = query.trim().length > 0;
  const showWelcome = !hasQuery && category === "todas";

  const counterText = hasQuery
    ? `${pluralCount(results.length, "resultado", "resultados")} para «${query}»`
    : `${pluralCount(results.length, "anuncio", "anuncios")}`;

  return (
    <section id="buscador" aria-label="Buscador de servicios" className="relative py-16 md:py-20">
      {/* Resplandor decorativo detrás de la caja de búsqueda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-brand-teal-soft/70 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-teal-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-teal-dark">
          Híper-buscador vecinal
        </span>

        <h2 className="mt-4 font-display text-3xl font-semibold text-brand-pine md:text-4xl">
          ¿Qué necesitas hoy?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
          Escribe y descubre quién en el condominio lo ofrece: pan, un plomero, uñas, yoga…
        </p>

        {/* Caja de búsqueda */}
        <div className="relative mx-auto mt-8 max-w-2xl">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-brand-teal"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            id="input-buscador"
            type="text"
            autoComplete="off"
            enterKeyHint="search"
            value={input}
            onChange={(event) => handleInput(event.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Busca pan, plomero, uñas, taxi…"
            aria-label="Buscar servicios y productos de vecinos"
            className="h-14 rounded-2xl border-2 border-brand-pine/15 bg-card pl-14 pr-12 text-lg shadow-lg shadow-brand-pine/5 focus-visible:border-brand-teal md:h-16"
          />
          {/* Pista de atajo de teclado (escritorio) */}
          {input.length === 0 && !inputFocused && (
            <kbd
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 hidden h-6 -translate-y-1/2 items-center rounded-md border border-border bg-muted px-2 font-sans text-xs font-semibold text-muted-foreground md:inline-flex"
            >
              /
            </kbd>
          )}
          {input.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Limpiar búsqueda"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Chips de sugerencia */}
        <div
          role="group"
          aria-label="Búsquedas sugeridas"
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-sm text-muted-foreground">Sugerencias:</span>
          {SUGGESTIONS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => applyQuery(chip)}
              className="inline-flex h-10 items-center rounded-full border border-border bg-card px-4 text-sm text-foreground/80 transition-colors hover:border-brand-teal hover:text-brand-teal-dark"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Filtros de categoría */}
        <div
          role="group"
          aria-label="Filtrar por categoría"
          className="scrollbar-fina -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:justify-center md:overflow-x-visible md:px-0 md:pb-0"
        >
          {FILTER_CHIPS.map((chip) => {
            const active = category === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(chip.id)}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-all duration-200",
                  active
                    ? chip.id === "todas"
                      ? "border-transparent bg-brand-pine text-brand-cream shadow-md"
                      : cn("border-transparent shadow-md", categoryUi(chip.id).classes.solid)
                    : "border-border bg-card text-foreground/75 hover:border-brand-teal hover:text-brand-teal-dark",
                )}
              >
                <chip.icon className="h-4 w-4" aria-hidden="true" />
                <span>{chip.label}</span>
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

        {/* Resultados */}
        {!showWelcome && (
          <div className="mt-8 text-left">
            <p aria-live="polite" className="mb-4 text-sm font-medium text-muted-foreground">
              {counterText}
            </p>

            {results.length === 0 ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-dashed bg-card/60 p-10 text-center"
              >
                <SearchX
                  className="mx-auto h-8 w-8 text-brand-terracotta"
                  aria-hidden="true"
                />
                <p className="mt-3 font-display text-xl text-brand-pine">
                  Sin resultados para «{query}»
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prueba con otra palabra (el buscador ignora tildes y mayúsculas)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => scrollToSection("anunciate")}
                  className="mt-5 h-11 rounded-full border-brand-pine/30 px-5 text-sm font-semibold text-brand-pine hover:bg-brand-pine-soft"
                >
                  ¿Ofreces este servicio? Anúnciate
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={`${query}__${category}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="scrollbar-fina grid max-h-[760px] gap-4 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3"
              >
                {results.map((result) => (
                  <ServiceCard
                    key={result.service.id}
                    service={result.service}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}

        {/* Estado inicial: sin consulta y sin categoría */}
        {showWelcome && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-8 rounded-2xl border border-dashed border-brand-pine/25 bg-brand-cream-deep/40 p-8 text-center"
          >
            <Search
              className="mx-auto h-8 w-8 text-brand-teal"
              aria-hidden="true"
            />
            <p className="mt-3 font-display text-xl text-brand-pine">
              Empieza a escribir…
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              o elige una categoría arriba. Ejemplos: pan, plomero, uñas, taxi.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
