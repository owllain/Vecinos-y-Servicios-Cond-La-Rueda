"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BookOpen,
  HeartHandshake,
  LayoutGrid,
  MessageCircle,
  Search,
  SearchX,
  Star,
} from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { CATEGORIES, SERVICES } from "@/lib/data/services";
import { scrollToSection, useSearchStore } from "@/lib/search-store";
import { useNativeInputSync } from "@/hooks/use-native-input-sync";
import { Input } from "@/components/ui/input";
import { groupHref } from "@/lib/site-config";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Portada estilo guía turística: titular grande, dos CTAs (Hick),
 * mini-estadísticas y una "tarjeta guía" con píldoras flotantes.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);
  const clear = useSearchStore((state) => state.clear);
  const inputRef = useNativeInputSync(setQuery);
  
  const hasQuery = query.trim().length > 0;

  const stats = [
    { icon: BookOpen, value: `${SERVICES.length} anuncios`, label: "publicados por vecinos" },
    { icon: LayoutGrid, value: `${CATEGORIES.length} categorías`, label: "para encontrar rápido" },
    { icon: HeartHandshake, value: "100% vecinal", label: "hecha y administrada por vecinos" },
  ];

  return (
    <section
      id="inicio"
      aria-label="Inicio"
      className="relative overflow-hidden bg-brand-cream py-16 md:py-24"
    >
      {/* Fondo decorativo: blobs difusos + patrón de puntos */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand-teal-soft opacity-60 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-brand-terracotta-soft opacity-60 blur-3xl" />
        <div className="patron-puntos absolute inset-0 text-brand-pine/10" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        {/* ── Columna izquierda: mensaje + CTAs + stats ── */}
        <motion.div
          variants={stagger}
          initial={reduce ? false : "hidden"}
          animate="show"
        >


          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-brand-pine sm:text-5xl xl:text-6xl"
          >
            Todo lo que buscas, lo tiene tu <span className="texto-marca">vecino</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Descubre los productos y servicios que ofrecen los propios vecinos del
            condominio: pan caliente, plomero de confianza, clases, uñas, mascotas y más.
            La guía la escriben los vecinos, y puedes contactar a cada proveedor directamente
            por WhatsApp.
          </motion.p>

          {/* Buscador integrado en Hero */}
          <motion.div variants={fadeUp} className="mt-8 relative max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-[28px] h-6 w-6 -translate-y-1/2 text-brand-teal" aria-hidden />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query) {
                  document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="relative w-full"
            >
              <Input
                ref={inputRef}
                type="search"
                autoComplete="off"
                enterKeyHint="search"
                placeholder="Busca pan, plomero, uñas, taxi..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-14 rounded-2xl border-2 border-brand-pine/15 bg-card pl-14 pr-12 text-lg shadow-lg focus-visible:border-brand-teal md:h-14 w-full"
              />
              {hasQuery && (
                <button
                  type="button"
                  onClick={clear}
                  aria-label="Borrar búsqueda"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <SearchX className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </form>
            {/* Sugerencias */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Sugerencias:</span>
              {["pan", "plomero", "uñas", "yoga"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex h-8 items-center rounded-full border border-border bg-card/60 px-3 text-xs text-foreground/80 hover:border-brand-teal hover:text-brand-teal-dark"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Mini-estadísticas */}
          <motion.dl variants={fadeUp} className="mt-10 flex flex-wrap gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal-soft text-brand-teal-dark">
                  <stat.icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="leading-tight">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl text-brand-pine">{stat.value}</dd>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ── Columna derecha: tarjeta guía con píldoras flotantes (Oculta en móvil) ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/3] rotate-1 overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
            <SafeImage
              src="/images/hero-guia.png"
              alt="Ilustración de la comunidad del Condominio La Rueda con tiendas de vecinos"
              fill
              priority
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
            <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-pine backdrop-blur">
              Edición 2026 · La Rueda
            </p>
          </div>



          {/* Píldora flotante: contacto directo */}
          <div
            className="animate-floaty absolute -right-3 bottom-10 hidden items-center gap-2 rounded-full bg-brand-teal-dark px-4 py-2.5 text-xs text-white shadow-xl sm:flex"
            style={{ animationDelay: "1.5s" }}
          >
            <MessageCircle className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            <span className="font-semibold">Contacta directamente al vecino</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
