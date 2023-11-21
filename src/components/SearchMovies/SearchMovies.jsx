import React, { useState } from "react";
import DisplayMovies from "../DisplayMovies/DisplayMovies";
import "./SearchMovies.css";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const API_KEY = "37fe945a";

  const searchMovies = async (e) => {
    e.preventDefault();
    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="search-movies">
      <form className="form" onSubmit={searchMovies}>
        <input
          className="input"
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök efter en film"
        />
        <button className="button" type="submit">
          Sök
        </button>
      </form>
      <DisplayMovies movies={movies} />
    </div>
  );
};

export default SearchMovies;
