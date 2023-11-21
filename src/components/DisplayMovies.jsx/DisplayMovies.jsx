import React from "react";
import MovieCard from "../MovieCard.jsx/MovieCard";
import "./DisplayMovies.css";

const DisplayMovies = ({ movies }) => {
  return (
    <div className="movies-container">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
      ) : (
        <p className="no-movies">
          Inga filmer hittades. Försök en annan sökning.
        </p>
      )}
    </div>
  );
};

export default DisplayMovies;
