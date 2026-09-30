import { create } from "zustand";
import type { CategoryFilter } from "@/lib/data/services";

/**
 * Estado global de búsqueda: el buscador principal, los filtros del
 * directorio y las categorías comparten la misma consulta y filtro,
 * para que toda la página reaccione en sincronía.
 */
interface SearchState {
  query: string;
  category: CategoryFilter;
  setQuery: (query: string) => void;
  setCategory: (category: CategoryFilter) => void;
  clear: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  category: "todas",
  setQuery: (query) => set({ query }),
  setCategory: (category) => set({ category }),
  clear: () => set({ query: "", category: "todas" }),
}));

/** Desplaza la vista hasta una sección con margen para el navbar fijo */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
