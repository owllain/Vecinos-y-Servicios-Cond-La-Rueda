"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CircleHelp,
  Home,
  LayoutGrid,
  LucideIcon,
  Map,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Star,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { scrollToSection } from "@/lib/search-store";
import { SITE, telHref, waHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** Enlaces del nav de escritorio (máx. 7 opciones — Ley de Miller): 5 */
const NAV_IDS = ["destacados", "categorias", "servicios", "faq", "mapa"];

/** Icono por sección para el menú móvil */
const ANCHOR_ICONS: Record<string, LucideIcon> = {
  inicio: Home,
  buscador: Search,
  destacados: Star,
  categorias: LayoutGrid,
  servicios: BookOpen,
  faq: CircleHelp,
  mapa: Map,
  anunciate: Megaphone,
};

/**
 * Navbar fija de la guía: barra superior con datos de la comunidad,
 * barra principal transparente que se vuelve sólida al hacer scroll
 * y menú lateral (Sheet) para móvil con todas las secciones.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainLinks = SITE.anchors.filter((a) => NAV_IDS.includes(a.id));

  return (
    <header className="sticky top-0 z-50">
      {/* ── Barra superior fina: identidad + administración ── */}
      <div className="hidden bg-brand-pine-deep text-brand-cream/90 sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Guía comunitaria · Condominio La Rueda
          </p>
          <a
            href={telHref(SITE.admin.phone)}
            className="-my-1 inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors duration-200 hover:bg-white/10 hover:text-brand-gold"
            aria-label={`Llamar a la administración de la guía al ${SITE.admin.phone}`}
          >
            <Phone className="h-3.5 w-3.5" aria-hidden />
            Administración: {SITE.admin.phone}
          </a>
        </div>
      </div>

      {/* ── Barra principal: transparente → sólida al hacer scroll ── */}
      <div
        className={cn(
          "transition-all duration-200",
          scrolled
            ? "border-b border-border bg-card/90 shadow-sm backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <a
            href="#inicio"
            aria-label="Vecinos y Servicios — ir al inicio de la guía"
            className="rounded-2xl"
          >
            <Logo tone="dark" />
          </a>

          {/* Nav central (escritorio): 5 enlaces */}
          <nav aria-label="Secciones de la guía" className="hidden items-center gap-1 lg:flex">
            {mainLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-brand-ink transition-colors duration-200 hover:text-brand-teal-dark"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            {/* Buscador */}
            <button
              type="button"
              onClick={() => scrollToSection("buscador")}
              aria-label="Ir al buscador"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-pine transition-colors duration-200 hover:bg-brand-pine-soft hover:text-brand-teal-dark"
            >
              <Search className="h-5 w-5" aria-hidden />
            </button>

            {/* CTA principal (Hick: un solo CTA en la barra) */}
            <button
              type="button"
              onClick={() => scrollToSection("anunciate")}
              className="hidden h-11 items-center gap-2 rounded-full bg-brand-terracotta-dark px-5 text-sm font-semibold text-white shadow-md shadow-brand-terracotta/25 transition-all duration-200 hover:brightness-90 active:scale-[0.98] sm:inline-flex"
            >
              <Megaphone className="h-4 w-4" aria-hidden />
              Anúnciate
            </button>

            {/* Menú móvil */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={open ? "Cerrar menú" : "Abrir menú"}
                  aria-expanded={open}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-pine transition-colors duration-200 hover:bg-brand-pine-soft lg:hidden"
                >
                  {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="flex w-full flex-col gap-0 sm:max-w-sm">
                <SheetHeader className="border-b border-border text-left">
                  <SheetTitle className="sr-only">Menú de la guía comunitaria</SheetTitle>
                  <SheetDescription className="sr-only">
                    Todas las secciones de la guía y contactos de la administración del Condominio La Rueda.
                  </SheetDescription>
                  <Logo tone="dark" />
                </SheetHeader>

                <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 py-4 scrollbar-fina">
                  <ul className="space-y-1">
                    {SITE.anchors.map((anchor) => {
                      const Icon = ANCHOR_ICONS[anchor.id] ?? MapPin;
                      return (
                        <li key={anchor.id}>
                          <a
                            href={`#${anchor.id}`}
                            onClick={() => setOpen(false)}
                            className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-brand-ink transition-colors duration-200 hover:bg-brand-pine-soft hover:text-brand-pine"
                          >
                            <Icon className="h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
                            {anchor.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="space-y-2.5 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <a
                    href="#anunciate"
                    onClick={() => setOpen(false)}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-terracotta-dark text-sm font-semibold text-white shadow-md shadow-brand-terracotta/25 transition-all duration-200 hover:brightness-90 active:scale-[0.98]"
                  >
                    <Megaphone className="h-4 w-4" aria-hidden />
                    Anúnciate en la guía
                  </a>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={telHref(SITE.admin.phone)}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-pine-soft px-2 text-xs font-semibold text-brand-pine transition-colors duration-200 hover:bg-brand-pine hover:text-brand-cream"
                      aria-label={`Llamar a la administración al ${SITE.admin.phone}`}
                    >
                      <Phone className="h-4 w-4 shrink-0" aria-hidden />
                      Llamar
                    </a>
                    <a
                      href={waHref(SITE.admin.whatsapp, "Hola, quiero información de la guía comunitaria")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-teal-soft px-2 text-xs font-semibold text-brand-teal-dark transition-colors duration-200 hover:bg-brand-teal-dark hover:text-white"
                      aria-label="Escribir a la administración por WhatsApp (se abre en una pestaña nueva)"
                    >
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                  <p className="text-center text-[11px] text-muted-foreground">
                    {SITE.admin.label} · Lun a Vie
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
