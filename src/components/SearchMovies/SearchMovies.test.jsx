import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import SearchMovies from "./SearchMovies";
import App from "../../App";

// Set up mock server
const server = setupServer(
  http.get("http://www.omdbapi.com/", (req, res, ctx) => {
    return res(
      ctx.json({
        Search: [
          {
            imdbID: "tt0111161",
            Title: "The Shawshank Redemption",
            Year: "1994",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads and displays movies", async () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Sök efter en film"), {
    target: { value: "shawshank" },
  });

  fireEvent.click(screen.getByText("Sök"));

  await waitFor(() => {
    expect(screen.getByText("The Shawshank Redemption")).toBeInTheDocument();
  });
});

test("handles server error", async () => {
  server.use(
    http.get("http://www.omdbapi.com/", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<SearchMovies />);

  fireEvent.click(screen.getByText("Sök"));

  await waitFor(() => {
    expect(
      screen.getByText("Inga filmer hittades. Försök en annan sökning.")
    ).toBeInTheDocument();
  });
});
