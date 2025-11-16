"use client";

import { MouseEvent } from "react";
import { useFavorites } from "@/lib/FavoritesContext";

type FavoriteButtonProps = {
  id: string;
  onRemove?: () => void;
};

export const FavoriteButton = ({ id, onRemove }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFavorite(id);
    if (onRemove) onRemove();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`
        absolute top-2 right-2 z-11
        w-9 h-9 flex items-center justify-center
        rounded-full backdrop-blur bg-black/40 
        border border-white/20 
        transition-all duration-200 
        hover:bg-black/60 active:scale-90 cursor-pointer
      `}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
    >
      <span
        className={`text-lg transition-colors duration-200 ${
          active ? "text-red-500" : "text-gray-300"
        }`}
      >
        {active ? "❤️" : "🤍"}
      </span>
    </button>
  );
};
