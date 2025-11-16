import { getMovieDetails } from "@/lib/omdb";
import { Feedback } from "@/components/Feedback/Feedback";
import { MovieDetails } from "@/components/MovieDetails/MovieDetails";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    return <Feedback text={"No results found for your input"} />;
  }

  return <MovieDetails movie={movie} />;
}
