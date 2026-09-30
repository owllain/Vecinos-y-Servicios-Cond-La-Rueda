"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Maximize2,
  Minimize2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal Lightbox a pantalla completa para visualizar imágenes con su tamaño y proporción
 * original completa, sin recortes, con soporte para zoom, navegación entre imágenes y teclado.
 */
export function ImageLightbox({
  images,
  initialIndex = 0,
  title,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sincronizar índice inicial al abrir
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex]);

  const handleNext = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setIsZoomed(false);
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Soporte de atajos de teclado (Esc, Flechas)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        handleNext();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, handleNext, handlePrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || "/images/placeholder.svg";

  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
    setZoomLevel((prev) => (prev === 1 ? 1.6 : 1));
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
    setIsZoomed(true);
  };

  const zoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.3, 1);
      if (next === 1) setIsZoomed(false);
      return next;
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualizador de imagen: ${title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 backdrop-blur-md transition-opacity duration-300 md:p-6"
      onClick={onClose}
    >
      {/* Barra superior de controles */}
      <div
        className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 px-3.5 py-1.5 backdrop-blur-md">
            <p className="text-xs font-semibold text-white/90 md:text-sm">
              {title}
              {images.length > 1 && (
                <span className="ml-2 font-normal text-white/60">
                  ({currentIndex + 1} de {images.length})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Controles de Zoom */}
          <div className="hidden items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-md sm:flex">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoomLevel <= 1}
              aria-label="Alejar"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="px-1 text-xs font-mono font-medium text-white/80">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoomLevel >= 2.5}
              aria-label="Acercar"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/20 hover:text-white disabled:opacity-40"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleZoom}
            aria-label={isZoomed ? "Restaurar tamaño" : "Ampliar"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 sm:hidden"
          >
            {isZoomed ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>

          {/* Abrir en pestaña nueva */}
          <a
            href={currentImage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver imagen original en pestaña nueva"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
          >
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar visor de imagen"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/35 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Contenedor central de la imagen */}
      <div
        className="relative flex h-full w-full items-center justify-center overflow-auto p-2"
        onClick={(e) => {
          // Si hace clic en la zona vacía alrededor de la imagen, cerrar
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className={cn(
            "relative transition-transform duration-200 select-none",
            isZoomed ? "cursor-grab" : "cursor-zoom-in",
          )}
          style={{ transform: `scale(${zoomLevel})` }}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage}
            alt={`${title} - Imagen completa`}
            className="max-h-[82vh] max-w-[90vw] rounded-lg object-contain shadow-2xl transition-all"
            draggable={false}
          />
        </div>
      </div>

      {/* Flechas de navegación (solo si hay más de 1 imagen) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 active:scale-95"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30 active:scale-95"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Miniaturas o indicadores inferiores */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-2 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Ver foto ${idx + 1}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  idx === currentIndex ? "w-6 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
