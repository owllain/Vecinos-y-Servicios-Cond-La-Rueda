"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Award, Heart, PawPrint, Stethoscope } from "lucide-react";
import { stats } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

const iconMap = {
  award: Award,
  paw: PawPrint,
  heart: Heart,
  stethoscope: Stethoscope,
} as const;

/** Configuración de animación por indicador (target, prefijo y sufijo). */
const animacionPorIndice = [
  { target: 12, prefix: "+", suffix: "" },
  { target: 8500, prefix: "", suffix: "+" },
  { target: 94, prefix: "", suffix: " %" },
  { target: 5, prefix: "", suffix: "" },
] as const;

// Formato tico: 8500 → «8.500» (CLDR es-CR usa espacio fino; lo normalizamos a punto)
const formato = {
  format: (n: number) =>
    new Intl.NumberFormat("es-CR").format(n).replace(/[\s\u00a0\u202f]/g, "."),
};

function StatNumero({ indice, valor }: { indice: number; valor: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const enVista = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const { target, prefix, suffix } = animacionPorIndice[indice];
  const [actual, setActual] = useState(0);

  useEffect(() => {
    if (!enVista) return;
    const controls = animate(0, target, {
      duration: reduce ? 0.01 : 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setActual(Math.round(v)),
    });
    return () => controls.stop();
  }, [enVista, target, reduce]);

  return (
    <p
      ref={ref}
      className="text-3xl font-extrabold text-white md:text-4xl"
      aria-hidden="true"
    >
      {prefix}
      {formato.format(actual)}
      {suffix}
    </p>
  );
}

export function StatsStrip() {
  return (
    <section
      aria-label="Indicadores de confianza de LONGIVET"
      className="relative overflow-hidden bg-primary"
    >
      {/* Texto accesible equivalente para lectores de pantalla */}
      <ul className="sr-only">
        {stats.map((s) => (
          <li key={s.label}>
            {s.value} {s.label}
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="patron-puntos absolute inset-0 text-white/10"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                <Icon className="h-6 w-6 text-brand-gold" aria-hidden />
              </span>
              <StatNumero indice={i} valor={s.value} />
              <p className="mt-1 text-sm text-white/75">{s.label}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
