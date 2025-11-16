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
  const [imgSrc, setImgSrc] = useState(
    movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"
  );

  return (
    <div className="max-w-5xl mx-auto p-8 text-white">
      <div className="flex justify-between items-center">
        <ReturnButton />
        <FavoritesLink />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative w-full md:w-1/3">
          <FavoriteButton id={movie.imdbID} />
          <Image
            src={imgSrc}
            alt={movie.Title}
            width={400}
            height={600}
            onError={() => setImgSrc("/no-image.png")}
            className="rounded-lg shadow-lg object-cover w-full"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-300 mb-4">{movie.Plot}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <span className="font-semibold text-gray-400">Year:</span>{" "}
                {movie.Year}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Released:</span>{" "}
                {movie.Released}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Runtime:</span>{" "}
                {movie.Runtime}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Country:</span>{" "}
                {movie.Country}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Language:</span>{" "}
                {movie.Language}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold text-gray-400">Genre:</span>{" "}
                {movie.Genre}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Director:</span>{" "}
                {movie.Director}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Writer:</span>{" "}
                {movie.Writer}
              </p>
              <p>
                <span className="font-semibold text-gray-400">Actors:</span>{" "}
                {movie.Actors}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Ratings</h2>
            <div className="flex flex-wrap gap-3">
              {movie.Ratings?.map((rate: { Source: string; Value: string }) => (
                <div
                  key={rate.Source}
                  className="border border-gray-600 rounded px-3 py-1"
                >
                  {rate.Source}: <span className="font-bold">{rate.Value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Additional information</h2>

        <p>
          <span className="font-semibold text-gray-400">Production:</span>{" "}
          {movie.Production}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Awards:</span>{" "}
          {movie.Awards}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Box Office:</span>{" "}
          {movie.BoxOffice}
        </p>
      </div>
    </div>
  );
};
