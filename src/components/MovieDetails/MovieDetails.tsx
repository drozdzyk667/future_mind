"use client";

import Image from "next/image";
import { ResourceDetails } from "@/helpers/types/types";
import { ReturnButton } from "../ReturnButton/ReturnButton";
import { useState } from "react";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { FavoritesLink } from "../FavoritesLink/FavoritesLink";

type MovieDetailsProps = {
  movie: ResourceDetails;
};

export const MovieDetails = ({ movie }: MovieDetailsProps) => {
  const fallbackImg = "/no-image.png";

  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" ? movie.Poster : fallbackImg
  );

  const altText =
    imgSrc === fallbackImg
      ? `No poster of movie ${movie.Title}`
      : `Poster of ${movie.Title}`;

  return (
    <article className="max-w-5xl mx-auto p-8 text-white">
      <header className="flex justify-between items-center">
        <ReturnButton />
        <FavoritesLink />
      </header>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/3">
          <FavoriteButton id={movie.imdbID} />
          <Image
            loading="lazy"
            src={imgSrc}
            alt={altText}
            width={400}
            height={600}
            onError={() => setImgSrc("/no-image.png")}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-300 mb-4">{movie.Plot}</p>

          <ul className="grid grid-cols-2 gap-4 text-sm">
            <li>
              <span className="font-semibold text-gray-400">Year:</span>{" "}
              {movie.Year}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Released:</span>{" "}
              {movie.Released}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Runtime:</span>{" "}
              {movie.Runtime}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Country:</span>{" "}
              {movie.Country}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Language:</span>{" "}
              {movie.Language}
            </li>

            <li>
              <span className="font-semibold text-gray-400">Genre:</span>{" "}
              {movie.Genre}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Director:</span>{" "}
              {movie.Director}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Writer:</span>{" "}
              {movie.Writer}
            </li>
            <li>
              <span className="font-semibold text-gray-400">Actors:</span>{" "}
              {movie.Actors}
            </li>
          </ul>

          <section aria-labelledby="ratings-heading" className="mt-6">
            <h2 id="ratings-heading" className="text-xl font-semibold mb-2">
              Ratings
            </h2>
            <ul className="flex flex-wrap gap-3">
              {movie.Ratings?.map((rate: { Source: string; Value: string }) => (
                <li
                  key={rate.Source}
                  className="border border-gray-600 rounded px-3 py-1"
                >
                  {rate.Source}: <span className="font-bold">{rate.Value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section aria-labelledby="additional-info-heading" className="mt-10">
        <h2 id="additional-info-heading" className="text-2xl font-bold mb-3">
          Additional information
        </h2>

        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-gray-400">Production:</span>{" "}
            {movie.Production}
          </li>
          <li>
            <span className="font-semibold text-gray-400">Awards:</span>{" "}
            {movie.Awards}
          </li>
          <li>
            <span className="font-semibold text-gray-400">Box Office:</span>{" "}
            {movie.BoxOffice}
          </li>
        </ul>
      </section>
    </article>
  );
};
