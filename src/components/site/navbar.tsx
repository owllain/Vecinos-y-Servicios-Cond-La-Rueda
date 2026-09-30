"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  CircleHelp,
  Home,
  HeartHandshake,
  LayoutGrid,
  LucideIcon,
  Map,
  MapPin,
  Megaphone,
  Menu,
  MessageCircle,
  Search,
  Star,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { scrollToSection } from "@/lib/search-store";
import { SITE, groupHref } from "@/lib/site-config";
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
 * barra principal transparente que se vuelve sólida al hacer scroll,
 * scroll-spy que resalta la sección visible y menú lateral (Sheet)
 * para móvil con todas las secciones.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta en el nav la sección actualmente visible
  useEffect(() => {
    const sections = SITE.anchors
      .map((anchor) => document.getElementById(anchor.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      // Franja de detección centrada bajo el navbar fijo
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const mainLinks = SITE.anchors.filter((a) => NAV_IDS.includes(a.id));

  return (
    <header className="sticky top-0 z-50">
      {/* ── Barra superior fina: identidad vecinal + grupo de WhatsApp ── */}
      <div className="hidden bg-brand-pine-deep text-brand-cream/90 sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 text-xs">
          <p className="flex items-center gap-1.5">
            <HeartHandshake className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Guía hecha por y para los vecinos · Condominio La Rueda
          </p>
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

          {/* Nav central (escritorio): 5 enlaces con scroll-spy */}
          <nav aria-label="Secciones de la guía" className="hidden items-center gap-1 lg:flex">
            {mainLinks.map((link) => {
              const active = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200 hover:text-brand-teal-dark",
                    active ? "text-brand-teal-dark" : "text-brand-ink",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-4 bottom-1.5 h-0.5 rounded-full bg-brand-teal transition-all duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              );
            })}
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
                    Todas las secciones de la guía y el grupo de WhatsApp de los vecinos del Condominio La Rueda.
                  </SheetDescription>
                  <Logo tone="dark" />
                </SheetHeader>

                <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 py-4 scrollbar-fina">
                  <ul className="space-y-1">
                    {SITE.anchors.map((anchor) => {
                      const Icon = ANCHOR_ICONS[anchor.id] ?? MapPin;
                      const active = activeSection === anchor.id;
                      return (
                        <li key={anchor.id}>
                          <a
                            href={`#${anchor.id}`}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "true" : undefined}
                            className={cn(
                              "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-200 hover:bg-brand-pine-soft hover:text-brand-pine",
                              active
                                ? "bg-brand-pine-soft text-brand-pine"
                                : "text-brand-ink",
                            )}
                          >
                            <Icon className="h-5 w-5 shrink-0 text-brand-teal-dark" aria-hidden />
                            {anchor.label}
                            {active && (
                              <span
                                aria-hidden="true"
                                className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-teal"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>


              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
