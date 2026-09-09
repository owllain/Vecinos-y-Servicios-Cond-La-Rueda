import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const testimonios = [
  {
    cita:
      "Con Kiara (golden, 11 años) creíamos que ya no caminaba por «vieja». La Dra. Solís encontró artritis con dolor real y hoy vuelve a acompañarnos al parque. No tienen idea de lo que eso significa para nosotros.",
    nombre: "Familia Ureña",
    mascota: "Kiara · golden retriever, 11 años",
    estrellas: 5,
  },
  {
    cita:
      "Mi gato paniqué toda la vida en veterinarias. Con la sala felina y las feromonas, Simba se quedó dormido en la consulta. Es la primera vez en 13 años que lo veo tranquilo en una clínica.",
    nombre: "Carlos M.",
    mascota: "Simba · gato mestizo, 13 años",
    estrellas: 5,
  },
  {
    cita:
      "Nos acompañaron en lo más difícil con mimo y honestidad: nunca nos vendieron esperanza falsa, pero Rocko pasó sus últimos meses sin dolor y nos despedimos en casa. Eternamente agradecidos.",
    nombre: "Ana Gabriela R.",
    mascota: "Rocko · beagle, 15 años",
    estrellas: 5,
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="titulo-testimonios"
      className="relative overflow-hidden bg-primary py-20 md:py-24 dark:bg-brand-navy"
    >
      <div aria-hidden className="patron-puntos absolute inset-0 text-white/10" />
      <div aria-hidden className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
            <Star className="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden />
            4,9 / 5 · 412 reseñas verificadas
          </p>
          <h2
            id="titulo-testimonios"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Historias que nos hacen levantarnos cada mañana
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonios.map((t, i) => (
            <Reveal as="li" key={t.nombre} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl bg-white/[0.07] p-7 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/[0.12]">
                <Quote className="h-8 w-8 text-brand-gold" aria-hidden />
                <div
                  className="mt-3 flex items-center gap-1"
                  role="img"
                  aria-label={`Calificación: ${t.estrellas} de 5 estrellas`}
                >
                  {Array.from({ length: t.estrellas }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-brand-gold text-brand-gold" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white/85">
                  «{t.cita}»
                </blockquote>
                <figcaption className="mt-5 border-t border-white/15 pt-4">
                  <p className="text-sm font-bold text-white">{t.nombre}</p>
                  <p className="text-xs text-white/60">{t.mascota}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
