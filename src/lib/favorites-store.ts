import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Favoritos del vecino: se guardan en el propio dispositivo
 * (localStorage) con la clave de la guía. El corazón de cada tarjeta
 * agrega o quita anuncios, y el directorio puede filtrar "solo
 * favoritos". Sin cuentas ni servidores: la lista vive en tu teléfono.
 */
interface FavoritesState {
  favorites: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (serviceId) =>
        set((state) => ({
          favorites: state.favorites.includes(serviceId)
            ? state.favorites.filter((id) => id !== serviceId)
            : [...state.favorites, serviceId],
        })),
      isFavorite: (serviceId) => get().favorites.includes(serviceId),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "vecinos-larueda-favoritos",
      version: 1,
    },
  ),
);
