import { useState, useEffect, useContext } from "react";
import {
  Outlet,
  NavLink,
  useOutletContext,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import "./style.scss";
import {
  Bookmark,
  MoviesIcon,
  MenuIcon,
  SearchIcon,
  TVIcon,
  CutIcon,
} from "../../components/iconsholder";
import Img from "../../imgs/Oval.png"
type ContextType = { searchQuery: string };

const Home = () => {
  const { updateFn } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAvatarClick = () => {
    if (updateFn) {
      if (window.confirm("Are you sure you want to logout?")) {
        updateFn();
      }
    }
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="app-logo">
          <div>
            <img src={CutIcon} alt="" />
          </div>
        </div>

        <nav className="navigation">
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src={MenuIcon} alt="Home" className="nav-icon" />
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src={MoviesIcon} alt="Movies" className="nav-icon" />
          </NavLink>

          <NavLink
            to="/tv-series"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src={TVIcon} alt="TV Series" className="nav-icon" />
          </NavLink>

          <NavLink
            to="/bookmarked"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src={Bookmark} alt="Bookmarked" className="nav-icon" />
          </NavLink>
        </nav>

        <div className="avatar" onClick={handleAvatarClick}>
          <img src={Img} alt="" />
        </div>
      </div>
      <div className="main-content">
        <div className="search-container">
          <form onSubmit={handleSearch} className="search-form">
            <span className="search-icon">
              <img src={SearchIcon} alt="Search" />
            </span>
            <input
              type="text"
              placeholder={
                location.pathname === "/movies"
                  ? "Search for movies"
                  : location.pathname === "/tv-series"
                  ? "Search for TV series"
                  : location.pathname === "/bookmarked"
                  ? "Search for bookmarked shows"
                  : "Search for movies or TV series"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
        </div>
        <div className="content-area">
          <Outlet context={{ searchQuery } as ContextType} />
        </div>
      </div>
    </div>
  );
};

export function useSearch() {
  return useOutletContext<ContextType>();
}

export default Home;
