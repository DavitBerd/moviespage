import { useState, useEffect } from "react";
import MovieGrid from "../../components/MovieGrid";
import { Movie } from "../../types/type";
import { useSearch } from "../home";
import "./style.scss";
import { mockTvSeries } from "../../components/data";

const TvSeries = () => {
  const [allTvSeries, setAllTvSeries] = useState<Movie[]>([]);
  const [filteredTvSeries, setFilteredTvSeries] = useState<Movie[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    setAllTvSeries(mockTvSeries);
    setFilteredTvSeries(mockTvSeries);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTvSeries(allTvSeries);
    } else {
      const filtered = allTvSeries.filter((tvShow) =>
        tvShow.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTvSeries(filtered);
    }
  }, [searchQuery, allTvSeries]);

  return (
    <div className="tvseries-container">
      <h2 className="section-title">TV Series</h2>
      {searchQuery && filteredTvSeries.length === 0 ? (
        <p className="no-results">No results found for "{searchQuery}"</p>
      ) : (
        <MovieGrid movies={filteredTvSeries} />
      )}
    </div>
  );
};

export default TvSeries;
