import { Award, Heart, PawPrint, Stethoscope } from "lucide-react";
import { stats } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

const iconMap = {
  award: Award,
  paw: PawPrint,
  heart: Heart,
  stethoscope: Stethoscope,
} as const;

export function StatsStrip() {
  return (
    <section
      aria-label="Indicadores de confianza de LONGIVET"
      className="relative overflow-hidden bg-primary"
    >
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
              <p className="text-3xl font-extrabold text-white md:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-white/75">{s.label}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
