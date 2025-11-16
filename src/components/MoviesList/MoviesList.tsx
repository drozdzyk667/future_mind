"use client";

import { MovieSearchItem } from "@/helpers/types/types";
import { MovieCard } from "./components/MovieCard/MovieCard";
import { Pagination } from "../Pagination/Pagination";
import { MoviesSkeleton } from "./components/MoviesSkeleton/MoviesSkeleton";
import { useUI } from "@/lib/UITransitionContext";

type MoviesListProps = {
  movies: MovieSearchItem[];
  currentPage: number;
  totalPages: number;
  onLocalPageChange?: (newPage: number) => void;
  isFavoritePage?: boolean;
  onRemoveFavorite?: (id: string) => void;
};

export const MoviesList = ({
  movies,
  currentPage,
  totalPages,
  onLocalPageChange,
  onRemoveFavorite,
}: MoviesListProps) => {
  const { isPending, startTransition } = useUI();

  const handlePageChange = (
    page: number,
    routerPush: (page: number) => void
  ) => {
    startTransition(() => {
      if (onLocalPageChange) {
        onLocalPageChange(page);
      } else {
        routerPush(page);
      }
    });
  };

  return (
    <section className="mt-8">
      {isPending ? (
        <MoviesSkeleton />
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {movies.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${index}`}
              movie={movie}
              onRemoveFavorite={() => onRemoveFavorite?.(movie.imdbID)}
            />
          ))}
        </div>
      )}

      <div className="p-6 border-b w-xs md:w-lg mx-auto border-amber-300" />

      <Pagination
        isPending={isPending}
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </section>
  );
};
