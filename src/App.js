import "./App.css";
import React, { useState, useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const App = () => {
  const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=12988167";
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = (title) => {
    fetch(`${API_URL}&s=${title}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMovies(data.Search);
        console.log(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchMovies("avengers");
  }, []);

  return (
    <div className="app">
      <h1>Movie Search App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;

