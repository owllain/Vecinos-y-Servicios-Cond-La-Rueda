"use client";

/* ─────────────────────────────────────────────────────────────
   LONGIVET · Galería/slideshow interactiva ULTRA PRO (#galeria)
   - Crossfade + deslizamiento direccional (framer-motion)
   - Efecto Ken Burns sutil (1.0 → 1.07 en 6.5 s)
   - Autoplay 6 s con pausa por hover, foco, pestaña oculta,
     botón manual y prefers-reduced-motion (off por defecto)
   - Barra de progreso por slide (estilo zoomies mejorado):
     se congela al pausar y retoma el tiempo restante
   - Swipe táctil, teclado (←/→/Inicio/Fin), aria-live, skeleton
   ───────────────────────────────────────────────────────────── */

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { PanInfo, Variants } from "framer-motion";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, PawPrint, Pause, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { gallerySlides } from "@/data/gallery";

const AUTOPLAY_MS = 6000;
const KEN_BURNS_S = 6.5;
const SWIPE_THRESHOLD = 60;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -40 }),
};

export default function ShowcaseGallery() {
  const total = gallerySlides.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Preferencia del sistema (SSR-safe: instantánea de servidor = false).
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  // Estados que gobiernan el autoplay (sin lectura de APIs en el primer
  // render → sin desajustes de hidratación).
  // "default": autoplay activo, salvo con prefers-reduced-motion (opt-in manual).
  const [autoplayMode, setAutoplayMode] = useState<"default" | "on" | "off">(
    "default"
  );
  const [pointerPaused, setPointerPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  // Carga de imágenes por slide (skeleton) y refs para medidas.
  const [loadedSlides, setLoadedSlides] = useState<ReadonlySet<number>>(
    () => new Set<number>()
  );
  const fillRef = useRef<HTMLSpanElement | null>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const progress = useAnimationControls();

  const autoplayWanted =
    autoplayMode === "on" || (autoplayMode === "default" && !reducedMotion);
  const autoplayOn =
    autoplayWanted && !pointerPaused && !focusPaused && !pageHidden;

  /* ── Visibilidad de pestaña ── */
  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ── Navegación ── */
  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((current) => (current + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (target: number) => {
      if (target === index) return;
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [index]
  );

  /* ── Autoplay + barra de progreso sincronizados ──
     Un único temporizador: la barra anima el ancho 0→100 % con la misma
     duración restante; al pausar se congela y al reanudar retoma donde
     quedó (mid-cycle). Al cambiar de slide, el ciclo se reinicia. */
  useEffect(() => {
    const fill = fillRef.current;
    if (!autoplayOn || !fill) {
      progress.stop();
      return;
    }

    const track = fill.parentElement;
    const ratio =
      track && track.clientWidth > 0
        ? Math.min(1, Math.max(0, fill.clientWidth / track.clientWidth))
        : 0;

    if (ratio <= 0) progress.set({ width: "0%" });

    const remaining = Math.max(0.05, AUTOPLAY_MS / 1000 * (1 - ratio));
    void progress.start({
      width: "100%",
      transition: { duration: remaining, ease: "linear" },
    });

    const timer = window.setTimeout(goNext, remaining * 1000);

    return () => {
      window.clearTimeout(timer);
      progress.stop();
    };
  }, [autoplayOn, index, goNext, progress]);

  /* ── Skeleton: marcar slides cargados (incluye imágenes en caché) ── */
  const markLoaded = useCallback((slide: number) => {
    setLoadedSlides((current) => {
      if (current.has(slide)) return current;
      const next = new Set(current);
      next.add(slide);
      return next;
    });
  }, []);

  /* ── Miniatura activa siempre a la vista ── */
  useEffect(() => {
    const thumb = thumbRefs.current[index];
    thumb?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [index, reducedMotion]);

  /* ── Interacción: teclado y swipe ── */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(total - 1);
    }
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  const slide = gallerySlides[index];
  const slideLoaded = loadedSlides.has(index);
  const autoplayLabel = autoplayWanted
    ? "Pausar galería automática"
    : "Reproducir galería automática";

  return (
    <section
      id="galeria"
      aria-labelledby="titulo-galeria"
      className="bg-brand-sand py-20 sm:py-24 md:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Encabezado + control de autoplay ── */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-foreground">
              <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
              Conócenos por dentro
            </span>
            <h2
              id="titulo-galeria"
              className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl"
            >
              Cada rincón diseñado para la edad dorada
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Recorre nuestra clínica: espacios cálidos, tecnología al servicio
              del diagnóstico y un equipo que recibe a cada paciente senior como
              a uno más de la familia.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAutoplayMode(autoplayWanted ? "off" : "on")}
            aria-pressed={autoplayWanted}
            aria-label={autoplayLabel}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            {autoplayWanted ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* ── Visor ── */}
        <div
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Galería de fotos de LONGIVET"
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setPointerPaused(true)}
          onMouseLeave={() => setPointerPaused(false)}
          onFocus={() => setFocusPaused(true)}
          onBlur={() => setFocusPaused(false)}
          className="relative aspect-[4/3] w-full cursor-grab select-none overflow-hidden rounded-[2rem] bg-brand-navy-deep shadow-2xl ring-1 ring-border active:cursor-grabbing sm:aspect-video"
        >
          {/* Diapositiva activa + salida (crossfade direccional) */}
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                ease: [0.32, 0.72, 0, 1],
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`Imagen ${index + 1} de ${total}: ${slide.title}`}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={reducedMotion ? { scale: 1 } : { scale: 1.07 }}
                transition={{
                  duration: reducedMotion ? 0 : KEN_BURNS_S,
                  ease: "easeOut",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  draggable={false}
                  onLoad={() => markLoaded(index)}
                  onError={() => markLoaded(index)}
                  ref={(el) => {
                    // Imágenes en caché que completaron antes de hidratar:
                    // el evento onLoad no vuelve a dispararse.
                    if (el && el.complete && el.naturalWidth > 0) {
                      markLoaded(index);
                    }
                  }}
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Skeleton mientras carga la imagen activa */}
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-10 animate-pulse bg-muted transition-opacity duration-500",
              slideLoaded ? "pointer-events-none opacity-0" : "opacity-100"
            )}
          />

          {/* Overlay inferior: degradado, caption en vivo y progreso */}
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-brand-navy-deep/90 via-brand-navy/40 to-transparent pb-5 pt-24 sm:pb-8 sm:pl-20 sm:pr-20 sm:pt-28">
            <div aria-live="polite" className="p-5 sm:p-0">
              <span className="sr-only">{`Imagen ${index + 1} de ${total}. `}</span>
              <span className="inline-flex rounded-full bg-brand-gold/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-brand-navy-deep">
                {slide.tag}
              </span>
              <h3 className="mt-2 text-2xl font-extrabold text-white md:text-4xl">
                {slide.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                {slide.description}
              </p>
            </div>

            {/* Barra de progreso por slide (botones para saltar) */}
            <div className="mt-4 flex items-stretch gap-1.5 sm:mt-5 sm:gap-2">
              {gallerySlides.map((item, i) => {
                const isDone = i < index;
                const isActive = i === index;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Ir a la imagen ${i + 1}: ${item.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex h-11 min-w-0 flex-1 items-center focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "block h-1.5 w-full overflow-hidden rounded-full transition-colors",
                        isDone || isActive
                          ? "bg-white/30 group-hover:bg-white/50"
                          : "bg-white/40 group-hover:bg-white/60"
                      )}
                    >
                      {isDone && (
                        <span className="block h-full w-full rounded-full bg-white" />
                      )}
                      {isActive && (
                        <motion.span
                          ref={fillRef}
                          initial={{ width: "0%" }}
                          animate={progress}
                          className="block h-full rounded-full bg-white"
                        />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flechas prev/next (≥ sm; en móvil manda el swipe) */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:inline-flex"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:inline-flex"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* ── Miniaturas (scrollable, snap, siempre accesibles) ── */}
        <div className="mt-4 sm:mt-5">
          <div className="scrollbar-fina flex snap-x gap-3 overflow-x-auto pb-2">
            {gallerySlides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                onClick={() => goTo(i)}
                aria-label={`Ver imagen ${i + 1}: ${item.title}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative h-[72px] w-28 shrink-0 snap-center overflow-hidden rounded-xl transition focus-visible:outline-none",
                  i === index
                    ? "opacity-100 ring-2 ring-brand-teal ring-offset-2 ring-offset-background"
                    : "opacity-60 hover:opacity-90"
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={224}
                  height={144}
                  sizes="(max-width: 640px) 45vw, 112px"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
