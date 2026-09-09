"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Brain,
  CalendarCheck,
  CircleCheck,
  Droplets,
  Flame,
  MessageCircle,
  Phone,
  RotateCcw,
  Siren,
  Stethoscope,
  Waves,
} from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/sections/reveal";

type Nivel = "critico" | "moderado" | "leve";

interface Sintoma {
  id: string;
  label: string;
  nivel: Nivel;
  icon: typeof Siren;
}

const sintomas: Sintoma[] = [
  { id: "respiratoria", label: "Dificultad respiratoria", nivel: "critico", icon: Waves },
  { id: "intoxicacion", label: "Sospecha de intoxicación", nivel: "critico", icon: Flame },
  { id: "convulsiones", label: "Convulsiones o temblores", nivel: "critico", icon: Siren },
  { id: "orina", label: "No orina o le cuesta mucho", nivel: "critico", icon: Droplets },
  { id: "vomitos", label: "Vómitos o diarrea persistentes", nivel: "moderado", icon: Activity },
  { id: "letargo", label: "Letargo profundo, no se levanta", nivel: "moderado", icon: AlertTriangle },
  { id: "cojera", label: "Cojera o dolor al moverse", nivel: "moderado", icon: Stethoscope },
  { id: "desorientacion", label: "Desorientación o confusión", nivel: "moderado", icon: Brain },
];

type Veredicto =
  | null
  | { tipo: "critico"; titulo: string; texto: string }
  | { tipo: "moderado"; titulo: string; texto: string };

export function Triage() {
  const [seleccion, setSeleccion] = useState<string[]>([]);

  const veredicto: Veredicto = useMemo(() => {
    const activos = sintomas.filter((s) => seleccion.includes(s.id));
    if (activos.some((s) => s.nivel === "critico")) {
      return {
        tipo: "critico",
        titulo: "Riesgo vital: acude ahora mismo",
        texto:
          "Los signos seleccionados pueden indicar una emergencia. No administres medicamentos humanos ni esperes a ver si mejora: llámanos y te guiamos durante el traslado.",
      };
    }
    if (activos.length > 0) {
      return {
        tipo: "moderado",
        titulo: "Requiere evaluación en las próximas 24 horas",
        texto:
          "Los signos que describes ameritan consulta programada. Agenda cuanto antes: en mascotas senior, adelantarse 24 horas puede evitar complicaciones serias.",
      };
    }
    return null;
  }, [seleccion]);

  const toggle = (id: string) =>
    setSeleccion((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const reset = () => setSeleccion([]);

  return (
    <section id="triage" aria-labelledby="titulo-triage" className="py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-coral/10 px-4 py-1.5 text-sm font-bold text-brand-coral">
            <Siren className="h-4 w-4" aria-hidden />
            Triaje digital gratuito
          </p>
          <h2
            id="titulo-triage"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            ¿Es urgencia o puede esperar?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Marca los signos que estás observando y recibe una orientación
            inmediata. Esta guía no reemplaza la valoración médica.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <fieldset className="rounded-[2rem] border bg-card p-6 shadow-sm md:p-8">
            <legend className="sr-only">Selección de síntomas de tu mascota</legend>
            <p className="text-center text-base font-semibold text-brand-navy dark:text-foreground">
              Selecciona todos los signos que observas en tu mascota
            </p>
            <div role="group" aria-label="Signos clínicos" className="mt-6 grid gap-3 sm:grid-cols-2">
              {sintomas.map((s) => {
                const activo = seleccion.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggle(s.id)}
                    aria-pressed={activo}
                    className={
                      activo
                        ? "flex min-h-[52px] items-center gap-3 rounded-2xl border-2 border-brand-teal bg-brand-teal-soft px-4 py-3 text-left text-sm font-bold text-accent-foreground transition focus-visible:outline-2"
                        : "flex min-h-[52px] items-center gap-3 rounded-2xl border bg-card px-4 py-3 text-left text-sm font-semibold text-foreground transition hover:border-brand-teal/60 focus-visible:outline-2"
                    }
                  >
                    <s.icon className={activo ? "h-5 w-5 shrink-0 text-brand-teal-dark" : "h-5 w-5 shrink-0 text-muted-foreground"} aria-hidden />
                    <span className="flex-1">{s.label}</span>
                    {activo && <CircleCheck className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden />}
                  </button>
                );
              })}
            </div>

            {/* Resultado accesible */}
            <div aria-live="polite" className="mt-6">
              {veredicto === null ? (
                <p className="rounded-2xl bg-muted p-4 text-center text-sm text-muted-foreground">
                  {seleccion.length === 0
                    ? "Selecciona uno o más signos para recibir una orientación inmediata."
                    : ""}
                </p>
              ) : veredicto.tipo === "critico" ? (
                <div
                  role="alert"
                  className="rounded-2xl border-2 border-brand-coral bg-brand-coral/5 p-5"
                >
                  <p className="flex items-center gap-2 text-lg font-extrabold text-brand-coral">
                    <Siren className="h-6 w-6" aria-hidden />
                    {veredicto.titulo}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{veredicto.texto}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={site.emergencyPhoneHref}
                      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-coral px-5 text-sm font-bold text-white transition hover:bg-brand-coral-dark focus-visible:outline-2"
                      aria-label={`Llamar ya a la línea de urgencias al ${site.emergencyPhone}`}
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      Llamar urgencias ya
                    </a>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-brand-coral px-5 text-sm font-bold text-brand-coral transition hover:bg-brand-coral hover:text-white focus-visible:outline-2"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Guía por WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-brand-gold bg-brand-gold/10 p-5">
                  <p className="flex items-center gap-2 text-lg font-extrabold text-brand-navy dark:text-foreground">
                    <AlertTriangle className="h-6 w-6 text-brand-gold" aria-hidden />
                    {veredicto.titulo}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{veredicto.texto}</p>
                  <a
                    href="#agendar"
                    className="mt-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-secondary px-6 text-sm font-bold text-secondary-foreground transition hover:bg-brand-teal-dark focus-visible:outline-2"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden />
                    Agendar consulta
                  </a>
                </div>
              )}
            </div>

            {seleccion.length > 0 && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-2"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Limpiar selección
                </button>
              </div>
            )}
          </fieldset>
        </Reveal>
      </div>
    </section>
  );
}
