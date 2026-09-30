"use client";

import { useEffect, useRef } from "react";

/**
 * Respaldo para cambios de valor hechos "por fuera" del teclado:
 * autocompletado del navegador, gestores de contraseñas, form.reset()
 * y automatizaciones ajustan el value del input programáticamente y
 * React deduplica esos eventos con su value tracker (su onChange no
 * se dispara). Este hook escucha el evento `input` nativo del campo
 * y notifica el valor nuevo al estado, de modo que el valor visible
 * y el estado nunca quedan desincronizados.
 *
 * Devuelve un ref para asignar al <Input>; el callback debe ser
 * estable (useCallback / acción de zustand) para no resuscribir.
 */
export function useNativeInputSync(onValue: (value: string) => void) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleNative = (event: Event) => {
      const value = (event.target as HTMLInputElement).value;
      onValue(value);
    };
    node.addEventListener("input", handleNative);
    return () => node.removeEventListener("input", handleNative);
  }, [onValue]);

  return ref;
}
