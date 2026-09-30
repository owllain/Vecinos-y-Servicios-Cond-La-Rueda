"use client";

import { Check, Coffee, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { CATEGORIES, categoryCounts } from "@/lib/data/services";
import { useSearchStore, scrollToSection } from "@/lib/search-store";
import { SITE, groupHref } from "@/lib/site-config";

/**
 * Pie de página con la firma visual del proyecto: una banda de
 * triángulos que va del crema (izquierda) al pino profundo (derecha),
 * como las montañas de una guía turística al atardecer.
 */
export function Footer() {
  const setCategory = useSearchStore((s) => s.setCategory);
  const counts = categoryCounts();

  return (
    <footer className="bg-brand-pine-deep">
      {/* ── (A) Banda decorativa triangular: claro → oscuro ── */}
      <div
        aria-hidden
        className="relative h-14 overflow-hidden md:h-20"
      >
        {/* Capa 1: gradiente base crema → dorado → teal → pino → pino profundo */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-cream) 0%, var(--brand-gold) 28%, var(--brand-teal) 58%, var(--brand-pine) 85%, var(--brand-pine-deep) 100%)",
          }}
        />
        {/* Capa 2: primeros triángulos (dorado → teal → pino) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-gold) 0%, var(--brand-gold) 18%, var(--brand-teal) 45%, var(--brand-teal) 62%, var(--brand-pine) 100%)",
            clipPath:
              "polygon(0 100%, 10% 30%, 20% 100%, 30% 45%, 42% 100%, 52% 25%, 63% 100%, 74% 40%, 85% 100%, 93% 35%, 100% 100%, 0 100%)",
          }}
        />
        {/* Capa 3: contrafrente de picos más agudos (teal → pino → pino profundo) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-teal) 0%, var(--brand-teal) 22%, var(--brand-pine) 52%, var(--brand-pine) 78%, var(--brand-pine-deep) 100%)",
            clipPath:
              "polygon(0 100%, 6% 60%, 14% 100%, 24% 68%, 34% 100%, 45% 58%, 56% 100%, 66% 62%, 77% 100%, 88% 58%, 100% 92%, 100% 100%, 0 100%)",
          }}
        />
      </div>

      {/* ── (B) Cuerpo del pie sobre pino profundo ── */}
      <div className="bg-brand-pine-deep text-brand-cream/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-3">
          {/* 1 · Marca */}
          <div className="space-y-3">
            <Logo tone="light" />
            <p className="font-display text-lg text-brand-cream">{SITE.tagline}</p>
            <p className="max-w-xs text-sm text-brand-cream/70">
              Hecha por y para los vecinos del condominio: la escriben, administran
              y actualizan los propios vecinos.
            </p>
          </div>

          {/* 2 · Explora: las 8 secciones */}
          <nav aria-label="Secciones de la guía en el pie">
            <h3 className="font-display text-lg text-brand-gold">Explora</h3>
            <ul className="mt-3 space-y-0.5">
              {SITE.anchors.map((anchor) => (
                <li key={anchor.id}>
                  <a
                    href={`#${anchor.id}`}
                    className="flex min-h-11 items-center text-sm text-brand-cream/80 transition-colors duration-200 hover:text-brand-gold"
                  >
                    {anchor.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 3 · Categorías: filtra el directorio con un clic */}
          <div>
            <h3 className="font-display text-lg text-brand-gold">Categorías</h3>
            <ul className="mt-3 space-y-0.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      scrollToSection("servicios");
                    }}
                    className="flex min-h-11 w-full items-center justify-between gap-3 text-left text-sm text-brand-cream/80 transition-colors duration-200 hover:text-brand-gold"
                    aria-label={`Ver ${cat.label} (${counts[cat.id]} anuncios) en el directorio`}
                  >
                    {cat.label}
                    <span
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-brand-cream"
                      aria-hidden
                    >
                      {counts[cat.id]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>


        </div>

        {/* ── Barra inferior ── */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs md:flex-row md:items-center md:justify-between">
            <div className="space-y-1.5">
              <p className="text-brand-cream/80">
                © {new Date().getFullYear()} Condominio La Rueda · Vecinos y Servicios
              </p>
              <p className="max-w-md text-brand-cream/60">
                La guía es informativa: precios y transacciones se acuerdan
                directamente entre vecinos.
              </p>
              <p className="max-w-md text-brand-cream/60 flex items-center gap-1.5 pt-1">
                Elaborado con <Coffee className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" /> por{" "}
                <a
                  href="https://www.linkedin.com/in/enrique-cascante/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-brand-gold hover:underline transition-colors"
                >
                  Ing. Enrique Cascante
                </a>
              </p>
            </div>
            <nav aria-label="Enlaces de ayuda" className="flex items-center gap-6">
              <a
                href="/faq"
                className="flex min-h-11 items-center py-3 text-brand-cream/80 transition-colors duration-200 hover:text-brand-gold md:py-0"
              >
                Preguntas frecuentes
              </a>
              <a
                href="#mapa"
                className="flex min-h-11 items-center py-3 text-brand-cream/80 transition-colors duration-200 hover:text-brand-gold md:py-0"
              >
                Mapa del sitio
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
