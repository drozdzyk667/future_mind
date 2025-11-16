import { Feedback } from "@/components/Feedback/Feedback";
import { MoviesList } from "@/components/MoviesList/MoviesList";
import { searchMovies } from "@/lib/omdb";
import {
  clampPageToTotal,
  validateInitialPage,
} from "@/helpers/validators/validatePage";
import { MovieSearchParams } from "@/helpers/types/types";
import { ITEMS_PER_PAGE } from "@/helpers/constants/constants";
import { FavoritesLink } from "@/components/FavoritesLink/FavoritesLink";

type Props = {
  searchParams?: Promise<MovieSearchParams>;
};

export async function generateMetadata({ searchParams }: Props) {
  const params = await searchParams;

  const query = params?.query || "";
  const page = params?.page || "1";
  const type = params?.type || "";
  const year = params?.year || "";

  const title = query
    ? `Search results for "${query}" – Page ${page}`
    : "Search movies";

  const description = query
    ? `Browse movie search results for "${query}"${
        year ? ` from year ${year}` : ""
      }${type ? ` (${type})` : ""}.`
    : "Search for movies, series, and episodes.";

  const search = new URLSearchParams(params || {}).toString();
  const canonical = `/movies${search ? `?${search}` : ""}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Movies({ searchParams }: Props) {
  const params = await searchParams;
  const { query, page = "1", type, year } = params || {};

  if (!query) {
    return <Feedback text={"Type something above to search"} />;
  }

  const currentPage = validateInitialPage(page, params);

  const results = await searchMovies({
    query,
    page: currentPage.toString(),
    type,
    year,
  });

  if (results?.tooMany) {
    return <Feedback text={"Too many results. Please refine your search"} />;
  }

  if (!results?.Search?.length) {
    return <Feedback text={"No results found for your input"} />;
  }

  const uniqueSearch = Array.from(
    new Map(results.Search.map((m) => [m.imdbID, m])).values()
  );

  const totalPages = Math.ceil(Number(results.totalResults) / ITEMS_PER_PAGE);

  const safePage = clampPageToTotal(currentPage, totalPages, params);

  return (
    <main>
      <header className="flex justify-between items-center">
        <div className="p-2">
          <span className="italic text-xs">
            Total results: {results.totalResults}
          </span>
        </div>
        <FavoritesLink />
      </header>

      <MoviesList
        movies={uniqueSearch}
        currentPage={safePage}
        totalPages={totalPages}
      />
    </main>
  );
}
