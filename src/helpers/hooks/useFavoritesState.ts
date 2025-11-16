"use client";

import { useEffect, useState } from "react";

export const useFavoritesState = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
    } finally {
      setLoaded(true);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    if (!loaded) return;

    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite, loaded };
};
