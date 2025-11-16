import {
  MovieErrorResponse,
  MovieSearchParams,
  MovieSearchResponse,
} from "@/helpers/types/types";

const API_URL = "https://www.omdbapi.com/";

export const searchMovies = async ({
  query,
  year,
  type,
  page = "1",
}: MovieSearchParams): Promise<MovieSearchResponse | null> => {
  const params = new URLSearchParams({
    apikey: process.env.OMDB_API_KEY!,
    s: query || "",
    page,
  });
  if (year) params.set("y", year);
  if (type) params.set("type", type);

  const res = await fetch(`${API_URL}?${params}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Network error while fetching resources");
  }

  const data: MovieSearchResponse | MovieErrorResponse = await res.json();

  if (data.Response === "False") {
    if (data.Error.includes("not found")) {
      return { Search: [], totalResults: "0", Response: "True" };
    }

    if (data.Error.includes("Too many results")) {
      return { Search: [], totalResults: "0", Response: "True", tooMany: true };
    }

    throw new Error(data.Error || "Resources not found");
  }

  return data;
};

export const getMovieDetails = async (id: string) => {
  const params = new URLSearchParams({
    apikey: process.env.OMDB_API_KEY!,
    i: id,
    plot: "full",
  });
  console.log(`${API_URL}?${params}`);
  const res = await fetch(`${API_URL}?${params}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Network error while fetching details");
  }

  const data = await res.json();

  if (data.Response === "False") {
    if (data.Error.includes("not found")) {
      return { Search: [], totalResults: "0", Response: "True" };
    }

    throw new Error(data.Error || "Resource not found");
  }

  return data;
};
