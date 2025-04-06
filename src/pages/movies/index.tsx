import { useState, useEffect } from "react";
import MovieGrid from "../../components/moviegrid";
import { Movie } from "../../types/type";
import { useSearch } from "../home";
import "./style.scss";
import { mockMovies } from "../../components/data";

const Movies = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setAllMovies(mockMovies);
    setFilteredMovies(mockMovies);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMovies(allMovies);
    } else {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, allMovies]);

  return (
    <div className="movies-container">
      <h2 className="section-title">Movies</h2>
      {searchQuery && filteredMovies.length === 0 ? (
        <p className="no-results">No results found for "{searchQuery}"</p>
      ) : (
        <MovieGrid movies={filteredMovies} />
      )}
    </div>
  );
};

export default Movies;
