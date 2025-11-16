export type MovieSearchParams = {
  query?: string;
  year?: string;
  type?: "movie" | "series" | "episode" | "";
  page?: string;
};

export type MovieSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie" | "series" | "episode";
  Poster: string;
};

export type MovieSearchResponse = {
  Search: MovieSearchItem[];
  totalResults: string;
  Response: "True";
  tooMany?: boolean;
};

export type MovieErrorResponse = {
  Response: "False";
  Error: string;
};

type MovieRating = {
  Source: string;
  Value: string;
};

export type ResourceDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True" | "False";
  Error?: string;
};
