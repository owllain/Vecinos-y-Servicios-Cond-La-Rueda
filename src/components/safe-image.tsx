"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/images/placeholder.svg";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Imagen con respaldo automático: si la foto de un servicio no existe
 * todavía (o falla), muestra el placeholder de la guía en su lugar.
 * Así el sitio nunca se ve roto mientras los vecinos suben sus fotos.
 */
export function SafeImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill,
}: SafeImageProps) {
  const [current, setCurrent] = useState<string>(src || FALLBACK);
  const [lastSrc, setLastSrc] = useState<string>(src || FALLBACK);

  // Ajuste en render (patrón React "previous props"): cuando cambia `src`
  // se reinicia la imagen mostrada sin necesidad de un efecto.
  if ((src || FALLBACK) !== lastSrc) {
    setLastSrc(src || FALLBACK);
    setCurrent(src || FALLBACK);
  }

  return (
    <Image
      src={current}
      alt={alt}
      className={className}
      sizes={sizes ?? "100vw"}
      priority={priority}
      fill={fill}
      width={fill ? undefined : 1344}
      height={fill ? undefined : 768}
      onError={() => setCurrent(FALLBACK)}
    />
  );
}
