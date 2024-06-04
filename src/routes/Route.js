// Importing react-router-dom
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Importing Layouts
import RootLayout from "../layouts/RootLayout";
import MoviesLayout from "../layouts/MoviesLayout";

// Importing Pages
import Home from "../pages/Home";
import Movies from "../pages/movies/Movies";
import MoviesError from "../pages/movies/MoviesError";
import MovieDetails from "../pages/movies/MoviesDetails";
import FavMovies from "../pages/movies/FavMovies";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Importing Loader Functions
import { authenticatedLoader } from "../pages/auth/authenticator";

export const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

      <Route path="/" element={<RootLayout />} loader={authenticatedLoader}>
        <Route path="home" element={<Home />} />

        <Route
          path="movies"
          element={<MoviesLayout />}
          errorElement={<MoviesError />}
        >
          <Route index element={<Movies />} />

          <Route
            path=":id"
            element={<MovieDetails />}
          />
          
          <Route
            path="favourite"
            element={<FavMovies />}
          />
        </Route>
      </Route>
    </Route>
  )
);
