import { render, screen } from "@testing-library/react";
import DisplayMovies from "./DisplayMovies";

test("displays movies when provided with a list", () => {
  const movies = [
    {
      imdbID: "tt0111161",
      Title: "The Shawshank Redemption",
      Year: "1994",
      Poster: "...",
    },
    // Add more mock movie data here
  ];

  render(<DisplayMovies movies={movies} />);

  expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
  // Assert that all movies are rendered
});

test("displays no movies found message when list is empty", () => {
  render(<DisplayMovies movies={[]} />);
  expect(
    screen.getByText("Inga filmer hittades. Försök en annan sökning.")
  ).toBeInTheDocument();
});
