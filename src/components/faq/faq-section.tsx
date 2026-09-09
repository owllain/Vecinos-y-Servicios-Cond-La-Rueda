"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Sección FAQ ultra completa
   Búsqueda en vivo + filtro por categorías + contador accesible
   + JSON-LD FAQPage (24 preguntas). Hidratación determinista.
   ───────────────────────────────────────────────────────────── */

import { useMemo, useRef, useState } from "react";
import {
  CalendarClock,
  ClipboardList,
  CreditCard,
  HeartPulse,
  MessageCircle,
  Search,
  SearchX,
  Siren,
  Stethoscope,
  X,
  type LucideIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  faqCategories,
  faqItems,
  type FaqCategory,
} from "@/data/faq";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/* Normaliza texto: minúsculas y sin tildes, para que «atención»
   coincida con «atencion» al buscar. Determinista y sin efectos. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const iconosCategoria: Record<FaqCategory, LucideIcon> = {
  "Citas y horarios": CalendarClock,
  "Geriatría: cuándo y por qué": HeartPulse,
  "Servicios y especialidades": Stethoscope,
  "Precios y pagos": CreditCard,
  "Urgencias 24/7": Siren,
  "Antes de tu visita": ClipboardList,
};

/* JSON-LD FAQPage con las 24 preguntas (válido dentro del body). */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: `Preguntas frecuentes · ${site.name}`,
  inLanguage: "es-CR",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
} as const;

type Filtro = "Todas" | FaqCategory;

export default function FaqSection() {
  const [consulta, setConsulta] = useState("");
  const [categoria, setCategoria] = useState<Filtro>("Todas");
  const inputRef = useRef<HTMLInputElement>(null);

  /* Resultados combinados: filtro por categoría + búsqueda en vivo
     sobre pregunta, respuesta y categoría (sin tildes). */
  const resultados = useMemo(() => {
    const termino = normalizar(consulta.trim());
    return faqItems
      .map((item, indice) => ({ item, indice }))
      .filter(({ item }) => {
        if (categoria !== "Todas" && item.cat !== categoria) return false;
        if (!termino) return true;
        return normalizar(`${item.q} ${item.a} ${item.cat}`).includes(termino);
      });
  }, [consulta, categoria]);

  const limpiarBusqueda = () => {
    setConsulta("");
    inputRef.current?.focus();
  };

  const filtros: Filtro[] = ["Todas", ...faqCategories];

  return (
    <section
      id="faq"
      aria-labelledby="titulo-faq"
      className="bg-brand-sand py-20 dark:bg-background md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Encabezado ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-brand-navy dark:bg-accent dark:text-accent-foreground">
            Resolvemos tus dudas
          </p>
          <h2
            id="titulo-faq"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy dark:text-foreground md:text-5xl"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Todo lo que los tutores de mascotas senior suelen preguntarnos
            antes de la primera visita.
          </p>
        </div>

        {/* ── Búsqueda ── */}
        <div className="mx-auto mt-10 max-w-xl">
          <label
            htmlFor="buscar-faq"
            className="mb-2 block text-sm font-semibold text-brand-navy dark:text-foreground"
          >
            Buscar en las preguntas
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              ref={inputRef}
              id="buscar-faq"
              type="text"
              autoComplete="off"
              value={consulta}
              onChange={(evento) => setConsulta(evento.target.value)}
              placeholder="Busca por palabra clave: artritis, precios, urgencias…"
              className="h-[52px] rounded-full border-border bg-card pl-12 pr-12 text-base text-foreground shadow-none"
            />
            {consulta.length > 0 && (
              <button
                type="button"
                onClick={limpiarBusqueda}
                aria-label="Limpiar búsqueda"
                className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            )}
          </div>
        </div>

        {/* ── Filtros por categoría ── */}
        <div
          role="group"
          aria-label="Filtrar preguntas por categoría"
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {filtros.map((filtro) => {
            const Icono =
              filtro === "Todas" ? null : iconosCategoria[filtro];
            const activa = categoria === filtro;
            return (
              <button
                key={filtro}
                type="button"
                aria-pressed={activa}
                onClick={() => setCategoria(filtro)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                  activa
                    ? "border-brand-navy bg-brand-navy text-white dark:border-brand-teal-dark dark:bg-brand-teal-dark dark:text-white"
                    : "border-border bg-card text-foreground hover:border-brand-teal hover:text-brand-teal dark:hover:border-accent-foreground dark:hover:text-accent-foreground"
                )}
              >
                {Icono && <Icono aria-hidden="true" className="size-4" />}
                {filtro}
              </button>
            );
          })}
        </div>

        {/* ── Contador accesible ── */}
        <p
          aria-live="polite"
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          Mostrando {resultados.length}{" "}
          {resultados.length === 1 ? "pregunta" : "preguntas"} de{" "}
          {faqItems.length}
        </p>

        {/* ── Lista de preguntas ── */}
        {resultados.length > 0 ? (
          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-6 max-w-3xl"
          >
            {resultados.map(({ item, indice }) => (
              <AccordionItem
                key={item.q}
                value={`faq-${indice}`}
                className="mb-3 rounded-2xl border bg-card px-5"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-brand-navy hover:no-underline dark:text-foreground md:text-lg">
                  <span className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                    <span>{item.q}</span>
                    <Badge
                      variant="outline"
                      className="hidden shrink-0 border-transparent bg-brand-teal-soft text-brand-navy sm:inline-flex dark:bg-accent dark:text-accent-foreground"
                    >
                      {item.cat}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          /* ── Estado vacío ── */
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border bg-card p-8 text-center md:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-teal-soft dark:bg-accent">
              <SearchX
                aria-hidden="true"
                className="size-7 text-brand-teal-dark dark:text-accent-foreground"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold text-brand-navy dark:text-foreground">
              No encontramos esa pregunta…
            </h3>
            <p className="mt-2 text-muted-foreground">
              Escríbenos y te respondemos el mismo día.
            </p>
            <Button
              asChild
              className="mt-6 h-11 bg-brand-teal-dark px-6 text-white hover:bg-brand-teal-dark/90 dark:bg-brand-teal-dark dark:text-white dark:hover:bg-brand-teal"
            >
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preguntar por WhatsApp: envíanos tu duda y te respondemos el mismo día"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Preguntar por WhatsApp
              </a>
            </Button>
          </div>
        )}

        {/* ── Cierre ── */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border bg-gradient-to-br from-brand-teal-soft to-background p-8 text-center dark:from-accent dark:to-card md:p-10">
          <h3 className="text-2xl font-extrabold text-brand-navy dark:text-foreground md:text-3xl">
            ¿Tu duda no está aquí?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Nuestro equipo te orienta con gusto antes de tu primera visita.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild className="h-11 px-6">
              <a href="#agendar">Agendar cita</a>
            </Button>
            <Button asChild variant="outline" className="h-11 bg-card px-6">
              <a href="#programa-senior">Ver el Programa Senior</a>
            </Button>
          </div>
        </div>

        {/* ── Datos estructurados FAQPage ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </div>
    </section>
  );
}
