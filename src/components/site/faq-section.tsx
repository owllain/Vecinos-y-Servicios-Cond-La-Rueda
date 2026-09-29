"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  SECCIÓN FAQ — Preguntas frecuentes con búsqueda en vivo
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  ▶ Búsqueda instantánea: normaliza tildes/mayúsculas (normalizeText)
 *    y exige TODOS los tokens (AND) sobre pregunta + respuesta.
 *  ▶ Tabs de categoría (Ley de Hick: 5 opciones claras y estables).
 *  ▶ JSON-LD FAQPage generado SIEMPRE con TODAS las preguntas (SEO).
 */

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HelpCircle, MessageCircle, Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  FAQ_CATEGORY_IDS,
  FAQ_CATEGORY_LABELS,
  FAQ_ITEMS,
  type FaqCategoryId,
} from "@/lib/data/faq";
import { SITE, waHref } from "@/lib/site-config";
import { normalizeText, tokenize } from "@/lib/text";
import { cn } from "@/lib/utils";

type FaqTabId = FaqCategoryId | "todas";

/** Esquema FAQPage — con TODAS las preguntas, sin filtros ni búsqueda */
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/** Curva de entrada suave (guía cálida, nada brusco) */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FaqSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<FaqTabId>("todas");

  /** Conteo de preguntas por categoría (para los badges de los tabs) */
  const counts = useMemo(() => {
    const byCategory = {} as Record<FaqCategoryId, number>;
    for (const id of FAQ_CATEGORY_IDS) byCategory[id] = 0;
    for (const item of FAQ_ITEMS) byCategory[item.category] += 1;
    return byCategory;
  }, []);

  const tabs = useMemo<Array<{ id: FaqTabId; label: string; count: number }>>(
    () => [
      { id: "todas", label: "Todas", count: FAQ_ITEMS.length },
      ...FAQ_CATEGORY_IDS.map((id) => ({
        id,
        label: FAQ_CATEGORY_LABELS[id],
        count: counts[id],
      })),
    ],
    [counts],
  );

  const tokens = useMemo(() => tokenize(query), [query]);
  const searching = tokens.length > 0;

  /** Filtro combinado: categoría activa + TODOS los tokens de búsqueda */
  const filteredItems = useMemo(
    () =>
      FAQ_ITEMS.filter((item) => {
        if (tab !== "todas" && item.category !== tab) return false;
        if (tokens.length === 0) return true;
        const haystack = normalizeText(`${item.question} ${item.answer}`);
        return tokens.every((token) => haystack.includes(token));
      }),
    [tab, tokens],
  );

  /** Entrada sutil; se desactiva por completo con prefers-reduced-motion */
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 24 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.55, ease: EASE, delay },
  });

  return (
    <section id="faq" aria-label="Preguntas frecuentes" className="relative">
      {/* SEO: esquema FAQPage con TODAS las preguntas (no las filtradas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* ── Encabezado centrado ─────────────────────────────── */}
        <motion.div {...reveal(0)} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-terracotta-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-terracotta-dark">
            Resolvemos dudas
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-pine md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Todo sobre la guía: cómo publicar, cómo buscar y cómo contactar a
            tus vecinos.
          </p>
        </motion.div>

        {/* ── Buscador + tabs de categoría ────────────────────── */}
        <motion.div {...reveal(0.08)} className="mt-8 md:mt-10">
          <div className="relative mx-auto max-w-xl">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busca en las preguntas: publicar, costos, WhatsApp…"
              aria-label="Buscar en las preguntas frecuentes"
              className="h-12 rounded-2xl border-border bg-card pl-11 text-base shadow-xs md:text-sm"
            />
          </div>

          <div
            role="group"
            aria-label="Filtrar preguntas por categoría"
            className="scrollbar-fina -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible"
          >
            {tabs.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                    active
                      ? "border-brand-pine bg-brand-pine text-brand-cream"
                      : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {t.label}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold leading-none",
                      active
                        ? "bg-white/15 text-brand-cream"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {t.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Contador (anunciado a lectores de pantalla) ─────── */}
        <p
          aria-live="polite"
          className="mt-4 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground"
        >
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "pregunta" : "preguntas"}
          {searching ? ` para «${query.trim()}»` : ""}
        </p>

        {/* ── Lista de preguntas o estado vacío ───────────────── */}
        <motion.div {...reveal(0.14)} className="mt-4">
          {filteredItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="mb-3 rounded-2xl border border-border/80 bg-card px-4 shadow-xs last:mb-0 last:border-b md:px-5"
                >
                  <AccordionTrigger className="gap-3 py-4 text-left">
                    <span className="min-w-0 flex-1 pr-1 text-[15px] font-medium leading-snug">
                      {item.question}
                    </span>
                    {/* Mini badge de categoría (neutral, no bg-cat-*) */}
                    <span className="hidden shrink-0 rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:inline-flex">
                      {FAQ_CATEGORY_LABELS[item.category]}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pr-2 text-[15px] leading-relaxed text-muted-foreground md:pr-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-12 text-center">
              <span
                className="animate-floaty mx-auto flex size-14 items-center justify-center rounded-full bg-brand-terracotta-soft text-brand-terracotta-dark"
                aria-hidden="true"
              >
                <HelpCircle className="size-7" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-pine">
                No encontramos esa pregunta.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Escríbenos y la respondemos enseguida.
              </p>
              <a
                href={waHref(
                  SITE.admin.whatsapp,
                  "Hola, tengo una pregunta sobre la guía de vecinos:",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-teal-dark px-6 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-teal-dark/90"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Escríbenos por WhatsApp
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
