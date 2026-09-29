"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  BookOpen,
  HeartHandshake,
  LayoutGrid,
  MapPin,
  Phone,
  Search,
  Star,
} from "lucide-react";
import { SafeImage } from "@/components/safe-image";
import { CATEGORIES, SERVICES } from "@/lib/data/services";
import { scrollToSection } from "@/lib/search-store";

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

  const stats = [
    { icon: BookOpen, value: `${SERVICES.length} anuncios`, label: "publicados en la guía" },
    { icon: LayoutGrid, value: `${CATEGORIES.length} categorías`, label: "para encontrar rápido" },
    { icon: HeartHandshake, value: "100% vecinos", label: "proveedores de confianza" },
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
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/40 bg-brand-teal-soft px-3.5 py-1.5 text-xs font-semibold text-brand-teal-dark"
          >
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            Guía comunitaria · Condominio La Rueda
          </motion.p>

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
            condominio: pan caliente, plomero de confianza, clases, uñas, mascotas y
            más. Como una guía turística, pero de nuestra comunidad.
          </motion.p>

          {/* Hick: máximo 2 CTAs principales */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToSection("buscador")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-terracotta-dark px-7 text-base font-semibold text-white shadow-lg shadow-brand-terracotta/25 transition-all duration-200 hover:brightness-90 active:scale-[0.98]"
            >
              <Search className="h-5 w-5" aria-hidden />
              Buscar servicios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("categorias")}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-brand-pine/25 px-7 text-base font-semibold text-brand-pine transition-colors duration-200 hover:border-brand-teal hover:text-brand-teal-dark"
            >
              <LayoutGrid className="h-5 w-5" aria-hidden />
              Explorar categorías
            </button>
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

        {/* ── Columna derecha: tarjeta guía con píldoras flotantes ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
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

          {/* Tarjeta flotante: servicio de vecino (oculta en móvil para no desbordar) */}
          <div className="animate-floaty absolute -left-4 top-8 hidden items-center gap-3 rounded-2xl bg-white p-3 shadow-xl sm:flex">
            <SafeImage
              src="/images/svc-mascotas.png"
              alt="Pet Spa Guau & Miau"
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-brand-ink">Pet Spa Guau &amp; Miau</p>
              <p className="text-[10px] text-muted-foreground">Servicio de vecino</p>
            </div>
            <Star className="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden />
          </div>

          {/* Píldora flotante: teléfono de un vecino */}
          <div
            className="animate-floaty absolute -right-3 bottom-10 hidden items-center gap-2 rounded-full bg-brand-pine px-4 py-2.5 text-xs text-brand-cream shadow-xl sm:flex"
            style={{ animationDelay: "1.5s" }}
          >
            <Phone className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            <span className="font-semibold">+506 8888-1001</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
