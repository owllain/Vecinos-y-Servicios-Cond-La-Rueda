"use client";

import { useState, type FormEvent } from "react";
import {
  Clock,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
} from "lucide-react";

import { Logo, LogoMark } from "@/components/brand/logo";
import { WhatsappIcon } from "@/components/layout/mobile-sticky-bar";
import { OpenNowBadge } from "@/components/sections/open-now-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { site } from "@/lib/site";

const serviciosPie = [
  { label: "Consulta geriátrica", href: "#servicios" },
  { label: "Manejo del dolor", href: "#servicios" },
  { label: "Odontología", href: "#servicios" },
  { label: "Laboratorio", href: "#servicios" },
  { label: "Cuidado paliativo", href: "#servicios" },
] as const;

const explorarPie = [
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Programa Senior", href: "#programa-senior" },
  { label: "Equipo", href: "#equipo" },
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Agendar cita", href: "#agendar" },
] as const;

const distintivos = ["Fear Free", "Certificación AHTA", "+12 años"] as const;

const redesSociales = [
  { label: "Facebook de LONGIVET", href: site.social.facebook, Icon: Facebook },
  { label: "Instagram de LONGIVET", href: site.social.instagram, Icon: Instagram },
  { label: "TikTok de LONGIVET", href: site.social.tiktok, Icon: Music2 },
] as const;

/* Enlace con subrayado animado y foco blanco, sobre zonas oscuras del pie */
const enlacePie =
  "relative inline-flex min-h-11 items-center text-[15px] font-medium text-white/90 transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-white/80 after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 focus-visible:outline-white";

const tituloColumna =
  "text-sm font-bold uppercase tracking-[0.16em] text-white";

/**
 * Footer · Patrón TRIANGULAR que va de tono CLARO (izquierda) hacia OSCURO
 * (derecha) mediante capas con clip-path diagonales, según pedido del cliente.
 *
 * Accesibilidad AA verificada por zona:
 * - Col. 1 (claro): texto brand-navy sobre panel brand-sand translúcido
 *   (garantiza AA en cualquier ancho de viewport, incluido ultrawide).
 * - Cols. 2-4 (oscuro): texto blanco; la banda teal usa brand-teal-dark
 *   (#1f7a70) porque blanco sobre brand-teal (#2a9d8f) da 3.3:1 y falla AA.
 * - Móvil: fondo sólido brand-navy-deep con texto blanco (capas ocultas).
 */
export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  function manejarSuscripcion(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    toast({
      title: "¡Gracias!",
      description: "Te avisaremos de novedades para el cuidado de tu mascota senior.",
    });
    setEmail("");
  }

  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden bg-brand-navy-deep text-white"
    >
      {/* ── Capas diagonales claro → oscuro (solo tablet/desktop) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div
          className="absolute inset-0 bg-brand-navy"
          style={{ clipPath: "polygon(0 0, 82% 0, 66% 100%, 0 100%)" }}
        />
        {/* brand-teal-dark: blanco sobre brand-teal daría 3.3:1 (falla AA) */}
        <div
          className="absolute inset-0 bg-brand-teal-dark"
          style={{ clipPath: "polygon(0 0, 56% 0, 42% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 bg-brand-teal-soft"
          style={{ clipPath: "polygon(0 0, 30% 0, 18% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-0 bg-brand-sand"
          style={{ clipPath: "polygon(0 0, 13% 0, 5% 100%, 0 100%)" }}
        />
      </div>

      {/* ── Decoración: patrón de puntos + pata gigante (zona derecha) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div
          className="patron-puntos absolute inset-y-0 right-0 w-[46%] text-white/10"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 12% 100%)" }}
        />
        <div className="absolute -bottom-16 -right-16 opacity-5">
          <LogoMark className="h-80 w-80 rotate-12" />
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        {/* Columna 1 · Misión (zona clara → texto oscuro) */}
        <div className="lg:col-span-4">
          {/* Panel claro translúcido: asegura contraste del texto oscuro
              sobre las bandas diagonales en cualquier ancho de pantalla */}
          <div className="md:rounded-3xl md:bg-brand-sand/95 md:p-6 md:shadow-lg md:shadow-brand-navy/10 md:ring-1 md:ring-brand-navy/10 md:backdrop-blur-sm">
            <Logo tone="light" className="md:hidden" />
            <Logo tone="dark" className="hidden md:inline-flex" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90 md:text-brand-navy">
              Acompañamos la última etapa de la vida de tu mascota con medicina
              geriátrica basada en evidencia y mucho cariño.
            </p>
            <ul
              aria-label="Distintivos de la clínica"
              className="mt-5 flex flex-wrap gap-2"
            >
              {distintivos.map((distintivo) => (
                <li
                  key={distintivo}
                  className="rounded-full border border-white/35 px-3 py-1 text-xs font-semibold text-white md:border-brand-navy/25 md:text-brand-navy"
                >
                  {distintivo}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna 2 · Servicios (zona oscura → texto blanco) */}
        <nav aria-label="Servicios" className="lg:col-span-2">
          <h3 className={tituloColumna}>Servicios</h3>
          <ul className="mt-4">
            {serviciosPie.map((servicio) => (
              <li key={servicio.label}>
                <a href={servicio.href} className={enlacePie}>
                  {servicio.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 3 · Explora (zona oscura → texto blanco) */}
        <nav aria-label="Explorar el sitio" className="lg:col-span-2">
          <h3 className={tituloColumna}>Explora</h3>
          <ul className="mt-4">
            {explorarPie.map((enlace) => (
              <li key={enlace.label}>
                <a href={enlace.href} className={enlacePie}>
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Columna 4 · Contacto, horarios, redes y boletín */}
        <div className="lg:col-span-4">
          <h3 className={tituloColumna}>Contacto</h3>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex items-start gap-3">
              <MapPin
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-gold"
              />
              <span className="text-white/90">
                {site.addressFull}
                <br />
                {site.address.countryName}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-gold"
              />
              <a
                href={site.phoneHref}
                aria-label={`Llamar al ${site.phone}`}
                className="text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <WhatsappIcon className="mt-0.5 size-5 shrink-0 text-brand-emerald" />
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
                className="text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                WhatsApp directo
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-gold"
              />
              <a
                href={`mailto:${site.email}`}
                className="text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {site.email}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
            <h3 className={tituloColumna}>Horarios</h3>
            {/* Fondo blanco translúcido: sobre el navy del pie garantiza AA
                para el texto del badge en cualquiera de sus 3 estados. */}
            <OpenNowBadge className="border-white/30 bg-white/10 text-white" />
          </div>
          <ul className="mt-4 space-y-2 text-[15px]">
            {site.hours.map((horario) => (
              <li key={horario.days} className="flex items-start gap-3">
                <Clock
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-brand-gold"
                />
                <p className="text-white/90">
                  <span className="font-semibold text-white">
                    {horario.days}:
                  </span>{" "}
                  {horario.time}
                </p>
              </li>
            ))}
          </ul>

          {/* Redes sociales · botones circulares de 44 px */}
          <ul aria-label="Redes sociales" className="mt-8 flex gap-3">
            {redesSociales.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (se abre en una pestaña nueva)`}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-brand-navy focus-visible:outline-white"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mini-formulario boletín */}
          <form
            onSubmit={manejarSuscripcion}
            className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-4"
          >
            <h3 className="text-base font-bold text-white">Boletín senior</h3>
            <p className="mt-1 text-sm text-white/75">
              Consejos de cuidado geriátrico, una vez al mes.
            </p>
            <label htmlFor="boletin-correo" className="sr-only">
              Correo electrónico para el boletín
            </label>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Input
                id="boletin-correo"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu@correo.cr"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                className="h-11 flex-1 rounded-full border-white/25 bg-white/10 text-white placeholder:text-white/60"
              />
              <Button
                type="submit"
                className="h-11 shrink-0 rounded-full bg-brand-gold px-5 font-bold text-brand-navy shadow-sm transition-colors hover:bg-brand-gold/85 focus-visible:outline-white"
              >
                Suscribirme
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* ── Barra inferior legal ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-t border-white/15 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName} · Escazú, Costa Rica
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a
                href="#"
                aria-label="Política de privacidad de LONGIVET"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-label="Términos de atención de LONGIVET"
                className="underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Términos de atención
              </a>
            </li>
          </ul>
          <p className="inline-flex items-center gap-1.5">
            Hecho con
            <Heart
              aria-hidden="true"
              className="size-4 fill-rose-300 text-rose-300"
            />
            en Costa Rica
          </p>
        </div>
      </div>
    </footer>
  );
}
