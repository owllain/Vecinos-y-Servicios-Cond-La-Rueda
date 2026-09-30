"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Eye,
  Facebook,
  Globe,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  X,
  ZoomIn,
} from "lucide-react";

import { categoryUi, type ServiceListing } from "@/lib/data/services";
import { SITE, telHref, groupHref } from "@/lib/site-config";
import { shareListing } from "@/lib/share";
import { useSearchStore } from "@/lib/search-store";
import { useFavoritesStore } from "@/lib/favorites-store";
import { useViewsStore } from "@/lib/views-store";
import { SafeImage } from "@/components/safe-image";
import { HighlightText } from "@/components/site/highlight-text";
import { ImageLightbox } from "@/components/site/image-lightbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/* Nota fija que acompaña a los botones de contacto de la ficha */
const NOTA_GRUPO =
  "Las solicitudes —secretaría incluida— se atienden escribiendo al grupo de WhatsApp de los vecinos.";

/* ────────────────────────────────────────────────────────────────────
 * Galería interna: carrusel embla (loop, sin autoplay) si hay varias
 * imágenes; imagen única si solo hay una. Siempre con SafeImage.
 * Con botón de zoom y clic para ver la imagen completa en el Lightbox.
 * ──────────────────────────────────────────────────────────────────── */

function ServiceGallery({
  images,
  title,
  onZoom,
}: {
  images: string[];
  title: string;
  onZoom: (index: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (images.length <= 1) {
    return (
      <div
        className="group relative aspect-[16/9] cursor-zoom-in overflow-hidden bg-brand-pine-soft"
        onClick={() => onZoom(0)}
      >
        <SafeImage
          src={images[0] ?? "/images/placeholder.svg"}
          alt={title}
          fill
          priority
          sizes="(min-width: 768px) 672px, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Botón flotante de Zoom */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onZoom(0);
          }}
          aria-label="Ver imagen completa en tamaño original"
          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105"
        >
          <ZoomIn className="h-3.5 w-3.5" />
          <span>Ver imagen completa</span>
        </button>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              onClick={() => onZoom(index)}
              className="relative aspect-[16/9] min-w-0 flex-[0_0_100%] cursor-zoom-in bg-brand-pine-soft"
            >
              <SafeImage
                src={image}
                alt={`${title} · imagen ${index + 1} de ${images.length}`}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botón flotante de Zoom */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onZoom(selected);
        }}
        aria-label="Ver imagen completa en tamaño original"
        className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-black/80 hover:scale-105"
      >
        <ZoomIn className="h-3.5 w-3.5" />
        <span>Ver imagen completa</span>
      </button>

      {/* Flechas */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        aria-label="Imagen anterior"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-pine shadow-md transition-colors hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
        aria-label="Imagen siguiente"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-pine shadow-md transition-colors hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Puntos clickeables */}
      <div
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/35 px-2 py-1 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            aria-current={index === selected ? "true" : undefined}
            className="flex h-4 w-4 items-center justify-center"
          >
            <span
              className={cn(
                "block h-2 rounded-full bg-white transition-all",
                index === selected ? "w-4 opacity-100" : "w-2 opacity-60",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────
 * Ficha completa del anuncio (contrato compartido del sitio).
 * La usan las tarjetas del buscador/directorio, el carrusel de
 * destacados y el mapa del sitio. Tolera service === null.
 * ──────────────────────────────────────────────────────────────────── */

export interface ServiceDialogProps {
  service: ServiceListing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceDialog({ service, open, onOpenChange }: ServiceDialogProps) {
  const { toast } = useToast();
  const query = useSearchStore((state) => state.query);
  const [copied, setCopied] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const registerView = useViewsStore((state) => state.registerView);
  const isFavorite = useFavoritesStore((state) =>
    service ? state.favorites.includes(service.id) : false,
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const views = useViewsStore((state) =>
    service ? state.counts[service.id] : undefined,
  );

  // Limpia el temporizador del botón copiar al desmontar
  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  // Reinicia el estado de "copiado" al (re)abrir la ficha,
  // comparando con el render anterior (sin efectos).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setCopied(false);
      // Cada apertura de ficha cuenta como una vista del anuncio
      if (service) void registerView(service.id);
    }
  }

  // Sin anuncio no se renderiza contenido (el padre controla `open`);
  // así el Dialog nunca crashea por campos de un objeto inexistente.
  if (!service) {
    return <Dialog open={open} onOpenChange={onOpenChange} />;
  }

  const ui = categoryUi(service.category);
  const CategoryIcon = ui.icon;
  const images =
    service.images.length > 0 ? service.images : ["/images/placeholder.svg"];

  const handleShare = async () => {
    if (!service) return;
    const result = await shareListing(service);
    if (result === "copied") {
      toast({
        title: "Enlace copiado",
        description: "Compártelo con tus vecinos por WhatsApp o correo.",
      });
    } else if (result === "failed") {
      toast({
        title: "No se pudo compartir",
        description: `Anota el número: ${service.phone}`,
      });
    }
    // "shared" y "cancelled" no requieren aviso
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(service.phone);
      setCopied(true);
      toast({ title: "Número copiado", description: service.phone });
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "No se pudo copiar",
        description: `Anota el número: ${service.phone}`,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-w-lg gap-0 overflow-hidden rounded-3xl p-0 md:max-w-2xl"
        >
          <div className="flex max-h-[90vh] flex-col">
            {/* Galería */}
            <div className="relative shrink-0">
              <ServiceGallery
                images={images}
                title={service.title}
                onZoom={(index) => {
                  setLightboxIndex(index);
                  setLightboxOpen(true);
                }}
              />
              {/* Favorito: corazón junto al cierre, sobre la imagen */}
              <button
                type="button"
                onClick={() => toggleFavorite(service.id)}
                aria-pressed={isFavorite}
                aria-label={
                  isFavorite
                    ? `Quitar ${service.title} de favoritos`
                    : `Guardar ${service.title} en favoritos`
                }
                className={cn(
                  "absolute right-16 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-colors",
                  isFavorite
                    ? "bg-brand-terracotta text-white hover:bg-brand-terracotta-dark"
                    : "bg-white/90 text-brand-terracotta hover:bg-white",
                )}
              >
                <Heart
                  className={cn("h-5 w-5", isFavorite && "fill-current")}
                  aria-hidden="true"
                />
              </button>
              {/* Contador de vistas del anuncio */}
              {typeof views === "number" && (
                <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {views} {views === 1 ? "vista" : "vistas"}
                </span>
              )}
              <DialogClose
                className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-pine shadow-md transition-colors hover:bg-white"
                aria-label="Cerrar ficha del anuncio"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </DialogClose>
            </div>

            {/* Cuerpo */}
            <div className="scrollbar-fina min-h-0 overflow-y-auto">
              <div className="flex flex-col gap-4 p-6 md:gap-5 md:p-8">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      className={cn(
                        "w-fit gap-1.5 rounded-full border-transparent px-3 py-1",
                        ui.classes.badge,
                      )}
                    >
                      <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      {ui.label}
                    </Badge>

                    {service.price && (
                      <Badge
                        variant="secondary"
                        className="w-fit rounded-full border-brand-gold/40 bg-brand-gold-soft px-3 py-1 text-xs font-bold text-brand-pine"
                      >
                        {service.price}
                      </Badge>
                    )}
                  </div>

                  <DialogTitle className="font-display text-2xl leading-tight text-brand-pine md:text-3xl">
                    <HighlightText text={service.title} query={query} />
                  </DialogTitle>

                  <DialogDescription className="text-base text-muted-foreground">
                    {service.tagline ?? `${ui.label} · ${SITE.community}`}
                  </DialogDescription>
                </div>

                {/* Horario y ubicación (opcionales) */}
                {(service.schedule || service.location) && (
                  <div className="flex flex-col gap-2 rounded-2xl bg-brand-cream-deep/50 p-4">
                    {service.schedule && (
                      <p className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <Clock
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-teal-dark"
                          aria-hidden="true"
                        />
                        <span>{service.schedule}</span>
                      </p>
                    )}
                    {service.location && (
                      <p className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <MapPin
                          className="mt-0.5 h-4 w-4 shrink-0 text-brand-terracotta-dark"
                          aria-hidden="true"
                        />
                        <span>{service.location}</span>
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm leading-relaxed text-foreground/90 md:text-base">
                  {service.description}
                </p>

                {/* Enlaces a Redes Sociales y Web */}
                {service.socialLinks && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {service.socialLinks.instagram && (
                      <a
                        href={service.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir perfil de Instagram"
                        className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1.5 text-xs font-medium text-pink-700 transition hover:bg-pink-100 dark:border-pink-900/40 dark:bg-pink-950/40 dark:text-pink-300"
                      >
                        <Instagram className="h-3.5 w-3.5" />
                        Instagram
                      </a>
                    )}
                    {service.socialLinks.facebook && (
                      <a
                        href={service.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Abrir página de Facebook"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-950/40 dark:text-blue-300"
                      >
                        <Facebook className="h-3.5 w-3.5" />
                        Facebook
                      </a>
                    )}
                    {service.socialLinks.website && (
                      <a
                        href={service.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visitar sitio web oficial"
                        className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-100 dark:border-teal-900/40 dark:bg-teal-950/40 dark:text-teal-300"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Sitio web
                      </a>
                    )}
                    {service.socialLinks.email && (
                      <a
                        href={`mailto:${service.socialLinks.email}`}
                        aria-label="Enviar correo electrónico"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        {service.socialLinks.email}
                      </a>
                    )}
                  </div>
                )}

                {/* Palabras clave (máx. 8; la primera resalta la búsqueda activa) */}
                {service.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {service.keywords.slice(0, 8).map((keyword, index) => (
                      <Badge
                        key={`${keyword}-${index}`}
                        variant="outline"
                        className="rounded-full px-3 py-1 font-normal text-foreground/75"
                      >
                        {index === 0 ? (
                          <HighlightText text={keyword} query={query} />
                        ) : (
                          keyword
                        )}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Contacto: pedir por el grupo (canal oficial) o llamar */}
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  <a
                    href={groupHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Pedir ${service.title} en el grupo de WhatsApp de los vecinos (se abre en una pestaña nueva)`}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-teal px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-teal-dark"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Pedir por WhatsApp
                  </a>

                  <a
                    href={telHref(service.phone)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Llamar {service.phone}
                  </a>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-12 rounded-xl px-4 font-semibold"
                  >
                    {copied ? (
                      <Check
                        className="h-4 w-4 text-brand-teal-dark"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? "¡Copiado!" : "Copiar número"}
                  </Button>

                  {/* Compartir: Web Share API con respaldo de portapapeles */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleShare}
                    className="h-12 rounded-xl px-4 font-semibold"
                    aria-label={`Compartir el anuncio de ${service.title}`}
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Compartir
                  </Button>
                </div>

                <p className="flex items-start gap-2 rounded-xl bg-brand-teal-soft/60 px-3.5 py-2.5 text-xs leading-relaxed text-brand-pine">
                  <MessageCircle
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-teal-dark"
                    aria-hidden="true"
                  />
                  {NOTA_GRUPO}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visor de imágenes en alta definición a pantalla completa */}
      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        title={service.title}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
