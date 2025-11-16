import { getMovieDetails } from "@/lib/omdb";
import { Feedback } from "@/components/Feedback/Feedback";
import { MovieDetails } from "@/components/MovieDetails/MovieDetails";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return {
      title: "Movie not found",
      description: "Movie details are unavailable.",
    };
  }

  const canonical = `/movie/${movie.imdbID}`;

  return {
    title: `${movie.Title} (${movie.Year}) — Movie Details`,
    description: movie.Plot || "Movie details and information.",
    alternates: {
      canonical,
    },
    openGraph: {
      title: movie.Title,
      description: movie.Plot,
      url: canonical,
      images: movie.Poster && movie.Poster !== "N/A" ? [movie.Poster] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: movie.Title,
      description: movie.Plot,
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return <Feedback text={"No results found for your input"} />;
  }

  return <MovieDetails movie={movie} />;
}
