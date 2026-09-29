/**
 * Utilidades de texto para el buscador (ignora tildes, mayúsculas y signos).
 * La normalización conserva 1 caracter por letra, por lo que los índices
 * del texto normalizado corresponden 1:1 con el texto original.
 */

/** Normaliza: minúsculas, sin tildes, sin espacios redundantes */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Divide una consulta en tokens útiles (palabras de 2+ letras) */
export function tokenize(value: string): string[] {
  return normalizeText(value)
    .split(/[^a-z0-9ñ]+/)
    .filter((word) => word.length >= 2);
}

export interface HighlightPart {
  text: string;
  hit: boolean;
}

/**
 * Divide un texto en partes marcando las palabras que coinciden con la
 * consulta (para resaltar resultados del buscador).
 */
export function highlightParts(text: string, query: string): HighlightPart[] {
  const tokens = tokenize(query);
  if (tokens.length === 0 || !text) return [{ text, hit: false }];

  const normalized = normalizeText(text);
  const isHit = new Array<boolean>(normalized.length).fill(false);

  for (const token of tokens) {
    let from = normalized.indexOf(token);
    while (from !== -1) {
      const wordStart = from === 0 || normalized[from - 1] === " ";
      if (wordStart) {
        for (let i = from; i < from + token.length; i++) isHit[i] = true;
      }
      from = normalized.indexOf(token, from + 1);
    }
  }

  const parts: HighlightPart[] = [];
  let buffer = "";
  let currentHit = isHit[0] ?? false;

  for (let i = 0; i < text.length; i++) {
    if (isHit[i] === currentHit) {
      buffer += text[i];
    } else {
      if (buffer) parts.push({ text: buffer, hit: currentHit });
      buffer = text[i];
      currentHit = isHit[i];
    }
  }
  if (buffer) parts.push({ text: buffer, hit: currentHit });

  return parts;
}
