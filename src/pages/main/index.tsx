import { useState, useEffect } from "react";
import MovieGrid from "../../components/moviegrid";
import { Movie } from "../../types/type";
import { useSearch } from "../home";
import "./style.scss";
import { mockTrendingMovies } from "../../components/data";
import { Bookmark, MoviesIcon, TVIcon } from "../../components/iconsholder";

const Main = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setAllMovies(mockTrendingMovies);
    setFilteredMovies(mockTrendingMovies);
    setRecommendedMovies(mockTrendingMovies);
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
    <div className="trending-container">
      <div className="trending-section">
        <h2 className="section-title">Trending</h2>
        {searchQuery && filteredMovies.length === 0 ? (
          <p className="no-results">No results found for "{searchQuery}"</p>
        ) : (
          <div className="trending-scroll">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="trending-card"
                onMouseOver={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = "translateY(-5px)";
                }}
                onMouseOut={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.transform = "translateY(0)";
                }}
              >
                <div className="poster-container">
                  <img
                    src={movie.posterUrl || "/api/placeholder/200/300"}
                    alt={movie.title}
                    className="poster-image"
                  />
                  <div className="bookmark-icon">
                    <img src={Bookmark} alt="" />
                  </div>
                </div>
                <div className="movie-meta">
                  <span className="movie-year">{movie.year}</span>
                  <span className="movie-type">
                    <img
                      src={movie.type === "movie" ? MoviesIcon : TVIcon}
                      alt={movie.type === "movie" ? "Movie" : "TV Series"}
                      className="type-icon"
                    />
                    {movie.type === "movie" ? "* Movie *" : "* TV Series *"}
                  </span>
                  <span className="movie-rating">{movie.rating}</span>
                </div>
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="recommended-section">
        <h2 className="section-title">Recommended for you</h2>
        <MovieGrid movies={recommendedMovies} />
      </div>
    </div>
  );
};

export default Main;
