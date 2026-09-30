"use client";

import { Fragment } from "react";

import { highlightParts } from "@/lib/text";

/**
 * Resalta las coincidencias de la consulta del buscador dentro de un texto.
 * Si no hay consulta activa, devuelve el texto tal cual (sin marcas).
 * Se usa en títulos, taglines y descripciones de los resultados.
 */
export function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query || !query.trim()) {
    return <>{text}</>;
  }

  const parts = highlightParts(text, query);

  return (
    <>
      {parts.map((part, index) =>
        part.hit ? (
          <mark
            key={`${index}-${part.text}`}
            className="rounded px-0.5 bg-brand-gold/60 text-brand-ink"
          >
            {part.text}
          </mark>
        ) : (
          <Fragment key={`${index}-${part.text}`}>{part.text}</Fragment>
        ),
      )}
    </>
  );
}
