"use client";

import { useEffect, useState } from "react";
import { MoviesList } from "@/components/MoviesList/MoviesList";
import { Feedback } from "@/components/Feedback/Feedback";
import { useFavorites } from "@/lib/FavoritesContext";
import { ReturnButton } from "@/components/ReturnButton/ReturnButton";
import { MovieSearchItem } from "@/helpers/types/types";
import { ITEMS_PER_PAGE } from "@/helpers/constants/constants";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<MovieSearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      if (!favorites.length) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      const res = await fetch(`/api/favorites?ids=${favorites.join(",")}`);
      const data = await res.json();

      setMovies(data);
      setLoading(false);
    })();
  }, []);

  const removeFromFavorite = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.imdbID !== id));
  };

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const max = totalPages === 0 ? 1 : totalPages;

    if (page > max) {
      setTimeout(() => setPage(max), 0);
    }
  }, [page, totalPages]);

  const pageMovies = movies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) return <Feedback text="Loading your favorites…" />;

  if (!movies.length)
    return (
      <div className="flex flex-col justify-center w-52 mx-auto">
        <Feedback text="No favorite movies yet." />
        <ReturnButton />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 mt-2">
      <ReturnButton />
      <MoviesList
        movies={pageMovies}
        currentPage={page}
        totalPages={totalPages}
        onLocalPageChange={(p) => setPage(p)}
        onRemoveFavorite={removeFromFavorite}
      />
    </div>
  );
}
