import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../../App";

describe("SearchMovies", () => {
  test("should display movies based on search query", async () => {
    render(<App />);

    // Simulera användarens inmatning
    fireEvent.change(screen.getByPlaceholderText("Sök efter en film"), {
      target: { value: "Batman" },
    });

    fireEvent.click(screen.getByText("Sök"));

    // Vänta på att filmerna visas
    await waitFor(() => {
      expect(screen.getByText("Batman")).toBeInTheDocument();
      // Lägg till fler förväntningar här
    });
  });
});
