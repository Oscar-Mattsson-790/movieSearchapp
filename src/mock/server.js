import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.get("http://www.omdbapi.com/", (req) => {
    const apiKey = req.url.searchParams.get("apikey");
    const query = req.url.searchParams.get("s");

    if (apiKey === "37fe945a" && query === "Batman") {
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

export { server };
