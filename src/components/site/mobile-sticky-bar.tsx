"use client";

import { useEffect, useRef } from "react";
import { LayoutGrid, MessageCircle, Search } from "lucide-react";
import { scrollToSection } from "@/lib/search-store";
import { groupHref } from "@/lib/site-config";

/**
 * Barra de acciones rápidas para móvil: buscar, directorio y WhatsApp.
 * Fija abajo, con respaldo del área segura en iPhone (safe-area).
 */
export function MobileStickyBar() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Limpieza del temporizador de foco si el componente se desmonta
  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const handleBuscar = () => {
    scrollToSection("buscador");
    timer.current = setTimeout(() => {
      document.getElementById("input-buscador")?.focus({ preventScroll: true });
    }, 450);
  };

  const actionClass =
    "flex min-h-[56px] w-full flex-col items-center justify-center gap-0.5 text-brand-pine transition-colors duration-200 active:bg-accent";

  return (
    <nav
      aria-label="Barra de acciones rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-border">
        {/* Buscar */}
        <button
          type="button"
          onClick={handleBuscar}
          aria-label="Buscar servicios: ir al buscador"
          className={actionClass}
        >
          <Search className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium text-brand-ink">Buscar</span>
        </button>

        {/* Directorio */}
        <button
          type="button"
          onClick={() => scrollToSection("servicios")}
          aria-label="Ver el directorio de servicios"
          className={actionClass}
        >
          <LayoutGrid className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium text-brand-ink">Directorio</span>
        </button>

        {/* WhatsApp: grupo de los vecinos (solicitudes) */}
        <a
          href={groupHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir el grupo de WhatsApp de los vecinos (se abre en una pestaña nueva)"
          className={actionClass}
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span className="text-[11px] font-medium text-brand-ink">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
