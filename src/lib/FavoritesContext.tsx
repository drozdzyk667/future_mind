"use client";

import { useFavoritesState } from "@/helpers/hooks/useFavoritesState";
import { createContext, useContext, ReactNode } from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { favorites, toggleFavorite, loaded } = useFavoritesState();

  if (!loaded) {
    return <div className="text-gray-400 p-4">Loading favorites…</div>;
  }

  const isFavorite = (id: string) => (loaded ? favorites.includes(id) : false);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
};
