"use client";

import Image from "next/image";
import Link from "next/link";
import { MovieSearchItem } from "@/helpers/types/types";
import { useState } from "react";
import { FavoriteButton } from "@/components/FavoriteButton/FavoriteButton";

type MovieCardProps = {
  movie: MovieSearchItem;
  onRemoveFavorite?: () => void;
};

export const MovieCard = ({ movie, onRemoveFavorite }: MovieCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"
  );

  return (
    <div className="block">
      <Link href={`/movie/${movie.imdbID}`} className="group cursor-pointer">
        <div
          className="
          relative w-32 h-50 overflow-hidden
          md:w-56 md:h-80
          bg-[#1f1f23] border border-transparent
          transition-all duration-200
          group-hover:-translate-y-1 group-hover:translate-x-1
          group-hover:border-[#94ffd4]
          group-hover:border-l-8 border-b-8
          "
        >
          <FavoriteButton id={movie.imdbID} onRemove={onRemoveFavorite} />
          <Image
            loading="eager"
            src={imgSrc}
            alt={movie.Title}
            className="object-cover"
            fill
            sizes="192px"
            onError={() => setImgSrc("/no-image.png")}
          />
        </div>
      </Link>

      <div className="mt-2">
        <h3
          className="cursor-default font-semibold text-[#EFEFF1] truncate md:w-48 w-32 group-hover:text-white"
          title={movie.Title}
        >
          {movie.Title}
        </h3>

        <p className="text-sm text-[#ADADB8]">{movie.Year}</p>
      </div>
    </div>
  );
};
