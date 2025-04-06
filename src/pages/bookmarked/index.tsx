import { useState, useEffect } from "react";
import MovieGrid from "../../components/moviegrid";
import { Movie } from "../../types/type";
import { useSearch } from "../home";
import "./style.scss";
import { mockBookmarkedItems } from "../../components/data";

const Bookmarked = () => {
  const [allBookmarked, setAllBookmarked] = useState<Movie[]>([]);
  const [filteredBookmarked, setFilteredBookmarked] = useState<Movie[]>([]);
  const [bookmarkedMovies, setBookmarkedMovies] = useState<Movie[]>([]);
  const [bookmarkedTvSeries, setBookmarkedTvSeries] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setAllBookmarked(mockBookmarkedItems);
    setFilteredBookmarked(mockBookmarkedItems);

    const movies = mockBookmarkedItems.filter((item) => item.type === "movie");
    const tvSeries = mockBookmarkedItems.filter((item) => item.type === "tv");

    setBookmarkedMovies(movies);
    setBookmarkedTvSeries(tvSeries);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBookmarked(allBookmarked);
      setBookmarkedMovies(
        allBookmarked.filter((item) => item.type === "movie")
      );
      setBookmarkedTvSeries(allBookmarked.filter((item) => item.type === "tv"));
    } else {
      const filtered = allBookmarked.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBookmarked(filtered);
      setBookmarkedMovies(filtered.filter((item) => item.type === "movie"));
      setBookmarkedTvSeries(filtered.filter((item) => item.type === "tv"));
    }
  }, [searchQuery, allBookmarked]);

  return (
    <div className="bookmarked-container">
      <div className="bookmarked-section">
        <h2 className="section-title">Bookmarked Movies</h2>
        {searchQuery && bookmarkedMovies.length === 0 ? (
          <p className="no-results">
            No bookmarked movies found for "{searchQuery}"
          </p>
        ) : bookmarkedMovies.length === 0 ? (
          <p className="no-results">No bookmarked movies yet</p>
        ) : (
          <MovieGrid movies={bookmarkedMovies} />
        )}
      </div>

      <div className="bookmarked-section">
        <h2 className="section-title">Bookmarked TV Series</h2>
        {searchQuery && bookmarkedTvSeries.length === 0 ? (
          <p className="no-results">
            No bookmarked TV series found for "{searchQuery}"
          </p>
        ) : bookmarkedTvSeries.length === 0 ? (
          <p className="no-results">No bookmarked TV series yet</p>
        ) : (
          <MovieGrid movies={bookmarkedTvSeries} />
        )}
      </div>
    </div>
  );
};

export default Bookmarked;
