import { http } from "msw";

const movies = [
  {
    Title: "The Shawshank Redemption",
    Year: "1994",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
  },
  {
    Title: "Batman",
    Year: "1989",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
  },
  {
    Title: "War",
    Year: "2007",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNTIwMjE2Mjc1MF5BMl5BanBnXkFtZTYwNzI0OTI3._V1_SX300.jpg",
  },
];

export const handlers = [
  http.get("http://www.omdbapi.com/", (req, res, ctx) => {
    console.log("Intercepted URL:", req.url.href);
    const query = req.url.searchParams.get("s");
    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(query.toLowerCase())
    );
    return res(ctx.json({ Search: filteredMovies }));
  }),
];
