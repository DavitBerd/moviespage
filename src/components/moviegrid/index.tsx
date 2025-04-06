import { Movie } from "../../types/type";
import { Bookmark, MoviesIcon, TVIcon } from "../iconsholder";
import "./style.scss";

type MovieGridProps = {
  movies: Movie[];
};

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
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

            <span className="movie-rating">PG</span>
          </div>
          <h3 className="movie-title">{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
