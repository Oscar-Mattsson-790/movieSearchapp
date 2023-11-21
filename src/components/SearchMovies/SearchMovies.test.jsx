import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import SearchMovies from "./SearchMovies";
import { beforeAll, afterAll } from "vitest";

// Create a mock server
const server = setupServer(
  http.get("http://www.omdbapi.com/", (req) => {
    // Accessing query parameters here
    const query = req.url.searchParams.get("s");

    if (query === "Batman") {
      return HttpResponse.json({
        Search: [
          {
            imdbID: "tt0096895",
            Title: "Batman",
            Year: "1989",
          },
        ],
      });
    } else {
      return HttpResponse.json({ Search: [] });
    }
  })
);

// Start the server before all tests
beforeAll(() => server.listen());

// Close the server after all tests
afterAll(() => server.close());

describe("SearchMovies", () => {
  it("searches for movies and displays results", async () => {
    render(<SearchMovies />);

    fireEvent.change(screen.getByPlaceholderText("Sök efter en film"), {
      target: { value: "Batman" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sök/i }));

    // Wait for the movie card to be displayed
    await waitFor(() => {
      const movieTitle = screen.getByText("Batman");
      expect(movieTitle).toBeInTheDocument();
    });
  });
});
