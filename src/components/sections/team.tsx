import { GraduationCap, IdCard, Quote } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const equipo = [
  {
    iniciales: "MS",
    nombre: "Dra. Mariana Solís",
    cargo: "Directora médica · Geriatría y medicina interna",
    credenciales: [
      "Doctorado en Medicina Veterinaria, Universidad Nacional (UNA)",
      "Diplomada en Geriatría Canina y Felina (UAB, España)",
    ],
    registro: "CMVCR-10432",
    gradiente: "from-brand-navy to-brand-teal",
  },
  {
    iniciales: "AR",
    nombre: "Dr. Andrés Rojas",
    cargo: "Cirugía y rehabilitación física",
    credenciales: [
      "Cirujano veterinario con rotación hospitalaria en UCI",
      "Certificado internacional en rehabilitación y láser terapia",
    ],
    registro: "CMVCR-11288",
    gradiente: "from-brand-teal to-brand-emerald",
  },
  {
    iniciales: "LF",
    nombre: "Dra. Lucía Ferrara",
    cargo: "Medicina felina y manejo del dolor",
    credenciales: [
      "Posgrado en Medicina Felina y certificación Cat Friendly",
      "Especialista en protocolos Fear Free y analgesia multimodal",
    ],
    registro: "CMVCR-11876",
    gradiente: "from-brand-teal-dark to-brand-navy",
  },
];

export function Team() {
  return (
    <section id="equipo" aria-labelledby="titulo-equipo" className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-teal-soft px-4 py-1.5 text-sm font-semibold text-accent-foreground">
            <GraduationCap className="h-4 w-4" aria-hidden />
            Autoridad médica verificable
          </p>
          <h2
            id="titulo-equipo"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl md:text-5xl dark:text-foreground"
          >
            Especialistas que tu mascota <span className="texto-marca">merece</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Médicos colegiados, con formación de posgrado y en formación clínica
            continua. La credibilidad se demuestra: aquí están sus credenciales.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {equipo.map((m, i) => (
            <Reveal as="li" key={m.nombre} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-xl">
                <Quote
                  aria-hidden
                  className="absolute -top-3 -right-3 h-20 w-20 text-brand-teal-soft transition group-hover:scale-110"
                />
                <span
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${m.gradiente} text-xl font-extrabold text-white shadow-lg`}
                  role="img"
                  aria-label={`Fotografía de ${m.nombre} (disponible próximamente)`}
                >
                  {m.iniciales}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-brand-navy dark:text-foreground">
                  {m.nombre}
                </h3>
                <p className="mt-1 text-sm font-bold text-brand-teal-dark dark:text-brand-teal">
                  {m.cargo}
                </p>
                <ul className="mt-4 flex-1 space-y-2.5">
                  {m.credenciales.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-muted-foreground">
                  <IdCard className="h-4 w-4 text-brand-gold" aria-hidden />
                  Colegiada/o N.º {m.registro}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
