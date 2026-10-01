import { useEffect } from "react";
import { create } from "zustand";

/**
 * Contador de vistas de los anuncios: se carga una vez por sesión de
 * página (GET /api/views) y se actualiza en vivo cuando un vecino abre
 * una ficha (POST /api/views/[serviceId]). El estado vive en zustand
 * para que tarjetas, carrusel y ficha compartan los mismos números.
 */
interface ViewsState {
  counts: Record<string, number>;
  loaded: boolean;
  registerView: (serviceId: string) => Promise<void>;
}

export const useViewsStore = create<ViewsState>()((set) => ({
  counts: {},
  loaded: false,
  registerView: async (serviceId) => {
    try {
      const res = await fetch(`/api/views/${serviceId}`, { method: "POST" });
      if (!res.ok) return;
      const data = (await res.json()) as { serviceId: string; views: number };
      set((state) => ({
        counts: { ...state.counts, [data.serviceId]: data.views },
      }));
    } catch {
      // Silencioso: el contador es un detalle, nunca debe romper la ficha
    }
  },
}));

/** Carga única de los contadores (patrón singleton de promesa) */
let countsPromise: Promise<void> | null = null;

function useLoadViewCounts(): void {
  useEffect(() => {
    if (!countsPromise) {
      countsPromise = fetch("/api/views")
        .then((res) => (res.ok ? res.json() : { counts: {} }))
        .then((data: { counts?: Record<string, number> }) => {
          useViewsStore.setState({ counts: data.counts ?? {}, loaded: true });
        })
        .catch(() => {
          // Sin métricas la guía sigue funcionando igual
        });
    }
  }, []);

}

/** Suscripción al contador de un solo anuncio, sin escuchar los demás. */
export function useServiceViewCount(serviceId: string): number | undefined {
  const count = useViewsStore((state) => state.counts[serviceId]);
  useLoadViewCounts();
  return count;
}

/** Todos los contadores para ordenar el directorio por vistas. */
export function useViewCounts(): Record<string, number> {
  const counts = useViewsStore((state) => state.counts);
  useLoadViewCounts();
  return counts;
}
