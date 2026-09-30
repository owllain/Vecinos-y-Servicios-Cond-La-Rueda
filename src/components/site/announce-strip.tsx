"use client";

import { BookMarked, MessageCircle, Sparkles } from "lucide-react";
import { groupHref } from "@/lib/site-config";

/** Mini chips con los 6 datos que debe preparar el vecino (Ley de Miller) */
const DATOS_ANUNCIO = [
  "Título",
  "Categoría",
  "Palabras clave",
  "Imágenes",
  "Teléfono",
  "Descripción",
] as const;

/**
 * Sección "Anúnciate": panel dorado con los 3 pasos para publicar
 * un servicio en la guía, con envío directo por WhatsApp.
 */
export function AnnounceStrip() {
  return (
    <section id="anunciate" aria-label="Anúnciate" className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-gold/50 bg-gradient-to-br from-brand-gold-soft via-card to-brand-teal-soft p-8 shadow-xl shadow-brand-pine/5 md:p-12">


          <div className="relative text-center">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-terracotta-soft px-4 py-1.5 text-xs font-semibold text-brand-terracotta-dark">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              ¿Tienes un negocio o vendes algo?
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-pine md:text-4xl">
              Anúnciate gratis en la guía
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              La guía la hacemos entre vecinos: publican los vecinos, la administran
              los vecinos. Publica tu servicio o producto y que todo el condominio
              te encuentre en segundos.
            </p>
          </div>

          {/* 3 pasos (Ley de Miller) */}
          <ol aria-label="Pasos para publicar tu anuncio" className="relative mt-8 grid gap-4 sm:grid-cols-3">
            {/* Paso 1 */}
            <li className="rounded-2xl border border-border bg-white/80 p-5">
              <span
                className="font-display text-4xl font-semibold leading-none text-brand-terracotta"
                aria-hidden
              >
                1
              </span>
              <h3 className="mt-3 text-base font-semibold text-brand-pine">
                Prepara tu información
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Reúne estos datos de tu servicio o producto:
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Datos del anuncio">
                {DATOS_ANUNCIO.map((dato) => (
                  <li
                    key={dato}
                    className="rounded-full bg-brand-pine-soft px-2 py-0.5 text-[10px] font-semibold text-brand-pine"
                  >
                    {dato}
                  </li>
                ))}
              </ul>
            </li>

            {/* Paso 2 */}
            <li className="flex flex-col rounded-2xl border border-border bg-white/80 p-5">
              <span
                className="font-display text-4xl font-semibold leading-none text-brand-terracotta"
                aria-hidden
              >
                2
              </span>
              <h3 className="mt-3 text-base font-semibold text-brand-pine">
                Comunícate con un administrador
              </h3>
              <p className="mb-4 mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Envía tu información a un vecino administrador y el equipo vecinal
                la revisará contigo.
              </p>
            </li>

            {/* Paso 3 */}
            <li className="rounded-2xl border border-border bg-white/80 p-5">
              <span
                className="font-display text-4xl font-semibold leading-none text-brand-terracotta"
                aria-hidden
              >
                3
              </span>
              <h3 className="mt-3 text-base font-semibold text-brand-pine">
                Aparece en la guía
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Los vecinos administradores la publican y queda visible para todo
                el condominio.
              </p>
              <p className="mt-3 inline-flex items-center rounded-full bg-brand-gold-soft px-3 py-1 text-xs font-semibold text-brand-pine">
                100% gratis
              </p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
