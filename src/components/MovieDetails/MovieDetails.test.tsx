import { render, screen, fireEvent } from "@testing-library/react";
import { MovieDetails } from "./MovieDetails";
import { ResourceDetails } from "@/helpers/types/types";

// Mocking Image component from next/image
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...props} />;
});

jest.mock("../ReturnButton/ReturnButton", () => ({
  ReturnButton: () => <div data-testid="return-btn" />,
}));

jest.mock("../FavoritesLink/FavoritesLink", () => ({
  FavoritesLink: () => <div data-testid="favorites-link" />,
}));

jest.mock("../FavoriteButton/FavoriteButton", () => ({
  FavoriteButton: () => <div data-testid="favorite-btn" />,
}));

const mockMovie = {
  imdbID: "tt1234567",
  Title: "Test Movie",
  Poster: "http://example.com/poster.jpg",
  Plot: "Some plot here",
  Ratings: [{ Source: "IMDB", Value: "7.5/10" }],
  Year: "2020",
  Released: "10 Jan 2020",
  Runtime: "120 min",
  Country: "USA",
  Language: "English",
  Genre: "Action",
  Director: "John Doe",
  Writer: "Jane Doe",
  Actors: "Actor A, Actor B",
  Production: "Test Studio",
  Awards: "None",
  BoxOffice: "$100M",
} as ResourceDetails;

describe("MovieDetails", () => {
  it("renders the movie title", () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("renders the movie plot", () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText("Some plot here")).toBeInTheDocument();
  });

  it("renders the image with correct src", () => {
    render(<MovieDetails movie={mockMovie} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockMovie.Poster);
  });

  it("falls back to `/no-image.png` when image error occurs", () => {
    render(<MovieDetails movie={mockMovie} />);

    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(img).toHaveAttribute("src", "/no-image.png");
  });

  it("renders ReturnButton, FavoritesLink, and FavoriteButton", () => {
    render(<MovieDetails movie={mockMovie} />);

    expect(screen.getByTestId("return-btn")).toBeInTheDocument();
    expect(screen.getByTestId("favorites-link")).toBeInTheDocument();
    expect(screen.getByTestId("favorite-btn")).toBeInTheDocument();
  });

  it("renders ratings list", () => {
    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText("IMDB:")).toBeInTheDocument();
    expect(screen.getByText("7.5/10")).toBeInTheDocument();
  });
});
