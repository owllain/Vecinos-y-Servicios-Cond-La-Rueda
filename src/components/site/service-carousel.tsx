"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 *  CARRUSEL DE DESTACADOS — estilo portada de guía turística
 *  Vecinos y Servicios · Condominio La Rueda
 * ═══════════════════════════════════════════════════════════════════
 *  · Embla con autoplay (se desactiva si el usuario prefiere menos
 *    movimiento, vía prefers-reduced-motion con matchMedia).
 *  · Accesible: region "carrusel", slides "diapositiva", dots con
 *    aria-current, flechas del teclado y botones prev/next.
 *  · Toca una tarjeta → ServiceDialog (contrato del agente 2-b).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Map, Phone, Star } from "lucide-react";

import { SafeImage } from "@/components/safe-image";
import { ServiceDialog } from "@/components/site/service-dialog";
import {
  categoryUi,
  SERVICES,
  type ServiceListing,
} from "@/lib/data/services";
import { telHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/** Quita el prefijo "+506 " para mostrar el teléfono de forma compacta */
function telefonoCorto(phone: string): string {
  return phone.replace("+506 ", "");
}

/** Tamaños de imagen acordes al ancho real de cada slide */
const IMAGEN_SIZES =
  "(min-width: 1280px) 38vw, (min-width: 640px) 72vw, 100vw";

// Los anuncios nuevos se agregan al final de services.json.
const RECENT_SERVICES = SERVICES.slice(-6).reverse();

export function ServiceCarousel() {
  const featured = RECENT_SERVICES;

  const [reducedMotion, setReducedMotion] = useState(false);
  const [selected, setSelected] = useState<ServiceListing | null>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  /* prefers-reduced-motion: si está activo, el carrusel no avanza solo */
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const options = useMemo(
    () => ({ loop: true, align: "start" as const, slidesToScroll: 1 }),
    [],
  );

  /* Autoplay SOLO si el usuario no pidió menos movimiento */
  const plugins = useMemo(
    () =>
      reducedMotion
        ? []
        : [
            Autoplay({
              delay: 4500,
              stopOnMouseEnter: true,
              stopOnInteraction: false,
            }),
          ],
    [reducedMotion],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  /* Dots sincronizados con el slide visible */
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const abrirDetalles = useCallback((service: ServiceListing) => {
    setSelected(service);
    setOpen(true);
  }, []);

  /* Flechas del teclado: anterior/siguiente (si el diálogo está
     cerrado; el diálogo usa portal y maneja sus propias teclas) */
  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (open) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [open, scrollPrev, scrollNext],
  );

  if (featured.length === 0) return null;

  return (
    <section id="destacados" aria-label="Servicios destacados" className="relative overflow-hidden">
      <motion.div
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8"
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
      >
        {/* ── Encabezado: título a la izquierda, controles a la derecha ── */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gold-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-pine">
              <Map className="h-3.5 w-3.5" aria-hidden="true" />
              Explora nuestra comunidad
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-brand-pine md:text-4xl">
              Lo que nuestros vecinos ofrecen
            </h2>
            <p className="mt-2 max-w-xl text-balance text-muted-foreground">
              Descubre los últimos anuncios de la comunidad. Desliza, toca y
              contacta directo.
            </p>
          </div>

          <div className="flex shrink-0 gap-2 pb-1">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-brand-teal hover:text-brand-teal-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Siguiente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-brand-teal hover:text-brand-teal-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Carrusel (region accesible + navegación por flechas) ── */}
        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label="Servicios destacados de los vecinos"
          onKeyDown={handleKeyDown}
          className="mt-8 md:mt-10"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 md:gap-6">
              {featured.map((service, index) => {
                const ui = categoryUi(service.category);
                const IconoCategoria = ui.icon;
                return (
                  <div
                    key={service.id}
                    role="group"
                    aria-roledescription="diapositiva"
                    aria-label={`Servicio ${index + 1} de ${featured.length}: ${service.title}`}
                    className="min-w-0 shrink-0 basis-full pl-[2px] sm:basis-[72%] lg:basis-[55%] xl:basis-[38%]"
                  >
                    <article className="group relative h-[430px] overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-xl md:h-[480px]">
                      <SafeImage
                        src={service.images[0] ?? ""}
                        alt={`${service.title} — ${service.tagline ?? ui.label}`}
                        fill
                        priority={index === 0}
                        sizes={IMAGEN_SIZES}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Velo para legibilidad del texto sobre la foto */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-black/10"
                      />

                      {/* Botón invisible que vuelve clicable toda la tarjeta
                          (evita un botón anidado dentro de otro) */}
                      <button
                        type="button"
                        onClick={() => abrirDetalles(service)}
                        aria-label={`Ver detalles de ${service.title}`}
                        className="absolute inset-0 z-10 cursor-pointer rounded-[1.75rem] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-gold"
                      />

                      {/* Insignias superiores */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-5 md:p-6">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
                            ui.classes.solid,
                          )}
                        >
                          <IconoCategoria
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          {ui.label}
                        </span>
                      </div>

                      {/* Información inferior sobre la foto */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
                        <h3 className="font-display text-2xl leading-tight text-white drop-shadow-md md:text-[1.7rem]">
                          {service.title}
                        </h3>
                        {service.tagline && (
                          <p className="mt-1.5 text-sm leading-snug text-white/90 line-clamp-2">
                            {service.tagline}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <a
                            href={telHref(service.phone)}
                            aria-label={`Llamar a ${service.title} al ${service.phone}`}
                            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          >
                            <Phone
                              className="h-3.5 w-3.5"
                              aria-hidden="true"
                            />
                            {telefonoCorto(service.phone)}
                          </a>
                          <span
                            aria-hidden="true"
                            className="inline-flex h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-brand-pine transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-brand-pine-deep"
                          >
                            Ver detalles
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Dots + contador + hint móvil ── */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div
                role="group"
                aria-label="Elegir un destacado"
                className="flex items-center justify-center gap-2"
              >
                {featured.map((service, index) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => scrollTo(index)}
                    aria-label={`Ir al servicio ${index + 1}`}
                    aria-current={index === current ? "true" : undefined}
                    className={cn(
                      "relative h-2.5 rounded-full transition-all after:absolute after:-inset-2 after:content-['']",
                      index === current
                        ? "w-8 bg-brand-teal"
                        : "w-2.5 bg-brand-pine/20 hover:bg-brand-pine/40",
                    )}
                  />
                ))}
              </div>
              <span
                aria-hidden="true"
                className="font-display text-sm tabular-nums text-brand-pine"
              >
                {current + 1} / {featured.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground md:hidden">
              Desliza para explorar →
            </p>
          </div>
        </div>

        {/* Diálogo de detalles (contrato compartido con el agente 2-b) */}
        <ServiceDialog
          service={selected}
          open={open}
          onOpenChange={setOpen}
        />
      </motion.div>
    </section>
  );
}
