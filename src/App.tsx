import { useContext, lazy } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./components/AuthProvider";

const Home = lazy(() => import("./pages/home"));
const LogIn = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const Movies = lazy(() => import("./pages/movies"));
const TvSeries = lazy(() => import("./pages/tvseries"));
const Bookmarked = lazy(() => import("./pages/bookmarked"));
const Main = lazy(() => import("./pages/main"));

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route path="/" element={<Home />}>
            <Route index element={<Navigate to="/trending" replace />} />
            <Route path="trending" element={<Main />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tv-series" element={<TvSeries />} />
            <Route path="bookmarked" element={<Bookmarked />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
