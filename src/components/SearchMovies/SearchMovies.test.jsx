import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { server } from "../../mock/server";
import SearchMovies from "./SearchMovies";
import { beforeAll, afterEach, afterAll, expect } from "vitest";

// Use the server from server.js
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SearchMovies", () => {
  it("searches for movies and displays results", async () => {
    render(<SearchMovies />);

    fireEvent.change(screen.getByPlaceholderText("Sök efter en film"), {
      target: { value: "Batman" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sök/i }));

    await waitFor(() => {
      const movieTitle = screen.getByText("Batman");
      expect(movieTitle).toBeInTheDocument();
    });
  });
});
