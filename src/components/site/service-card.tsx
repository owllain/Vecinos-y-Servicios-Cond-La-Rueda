"use client";

import { useState, type KeyboardEvent } from "react";
import { Eye, Heart, Phone, Star } from "lucide-react";

import { categoryUi, type ServiceListing } from "@/lib/data/services";
import { telHref } from "@/lib/site-config";
import { useSearchStore } from "@/lib/search-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useViewCounts } from "@/lib/views-store";
import { SafeImage } from "@/components/safe-image";
import { HighlightText } from "@/components/site/highlight-text";
import { ServiceDialog } from "@/components/site/service-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Tamaños de la imagen según el grid de resultados */
const CARD_IMAGE_SIZES = "(min-width: 1280px) 25vw, (min-width: 640px) 33vw, 100vw";

/** Quita el prefijo "+506 " para mostrar el número abreviado */
function shortPhone(phone: string): string {
  return phone.replace(/^\+506\s*/, "").trim();
}

/**
 * Tarjeta de anuncio tipo guía turística: toda la tarjeta es clickeable
 * y abre la ficha completa (ServiceDialog). El pie mantiene accesos
 * rápidos de teléfono y "Ver detalles" sin disparar la ficha dos veces.
 */
export function ServiceCard({
  service,
  priority,
}: {
  service: ServiceListing;
  priority?: boolean;
}) {
  const [selected, setSelected] = useState<ServiceListing | null>(null);
  const query = useSearchStore((state) => state.query);
  const viewCounts = useViewCounts();
  const isFavorite = useFavoritesStore((state) =>
    state.favorites.includes(service.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const views = viewCounts[service.id];

  const ui = categoryUi(service.category);
  const CategoryIcon = ui.icon;
  const image = service.images[0] ?? "/images/placeholder.svg";

  const openDialog = () => setSelected(service);
  const closeDialog = (nextOpen: boolean) => {
    if (!nextOpen) setSelected(null);
  };

  // Enter/Space sobre la tarjeta (no sobre los controles internos) abre la ficha
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDialog();
    }
  };

  return (
    <article className="group text-left flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-pine/10">
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`Ver detalles de ${service.title}`}
        onClick={openDialog}
        onKeyDown={handleKeyDown}
        className="flex h-full cursor-pointer flex-col"
      >
        {/* Zona de imagen */}
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-pine-soft">
          <SafeImage
            src={image}
            alt={service.title}
            fill
            priority={priority}
            sizes={CARD_IMAGE_SIZES}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {/* Badge de categoría sobre la imagen */}
          <span
            className={cn(
              "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
              ui.classes.solid,
            )}
          >
            <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {ui.label}
          </span>

          {/* Píldora dorada de destacado */}
          {service.featured && (
            <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-pine shadow-sm">
              <Star className="h-3 w-3 fill-brand-pine" aria-hidden="true" />
              Destacado
            </span>
          )}

          {/* Favorito: corazón sobre la imagen (esquina inferior derecha) */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite(service.id);
            }}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Quitar ${service.title} de favoritos`
                : `Guardar ${service.title} en favoritos`
            }
            className={cn(
              "absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-all active:scale-90",
              isFavorite
                ? "bg-brand-terracotta text-white"
                : "bg-white/90 text-brand-terracotta hover:bg-white",
            )}
          >
            <Heart
              className={cn("h-5 w-5", isFavorite && "fill-current")}
              aria-hidden="true"
            />
          </button>

          {/* Contador de vistas del anuncio */}
          {typeof views === "number" && views > 0 && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {views}
            </span>
          )}
        </div>

        {/* Cuerpo */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-display text-lg leading-snug text-brand-pine">
            <HighlightText text={service.title} query={query} />
          </h3>

          {service.tagline && (
            <p className="line-clamp-1 text-sm text-muted-foreground">
              <HighlightText text={service.tagline} query={query} />
            </p>
          )}

          <p className="line-clamp-2 text-sm text-foreground/80">
            <HighlightText text={service.description} query={query} />
          </p>

          {/* Palabras clave (primeras 3; ocultas en pantallas muy pequeñas) */}
          {service.keywords.length > 0 && (
            <div className="hidden flex-wrap gap-1.5 md:flex">
              {service.keywords.slice(0, 3).map((keyword, index) => (
                <span
                  key={`${keyword}-${index}`}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-medium",
                    ui.classes.badge,
                  )}
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          {/* Pie: acceso rápido al teléfono + ficha completa */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-2">
            <a
              href={telHref(service.phone)}
              onClick={(event) => event.stopPropagation()}
              aria-label={`Llamar al ${service.phone}`}
              className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Phone
                className="h-4 w-4 shrink-0 text-brand-teal-dark"
                aria-hidden="true"
              />
              <span className="tabular-nums">{shortPhone(service.phone)}</span>
            </a>

            <Button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openDialog();
              }}
              className="h-11 rounded-full bg-brand-pine px-4 text-sm font-semibold text-brand-cream shadow-sm hover:bg-brand-pine-deep"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </div>

      {/* Ficha completa (portaled por Radix; una instancia por tarjeta) */}
      <ServiceDialog
        service={selected}
        open={selected !== null}
        onOpenChange={closeDialog}
      />
    </article>
  );
}
