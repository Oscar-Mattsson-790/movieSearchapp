import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";

describe("SearchMovies", () => {
  test("should display movies based on search query", async () => {
    render(<App />);

    // Simulera användarens inmatning
    fireEvent.change(screen.getByPlaceholderText("Sök efter en film"), {
      target: { value: "Batman" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sök" }));

    // Vänta på att filmerna visas
    screen.debug();
    await waitFor(() => {
      const findMovie = screen.findByText("Batman");
      expect(findMovie).toBeInTheDocument();
    });
    // Lägg till fler förväntningar här
  });
});
