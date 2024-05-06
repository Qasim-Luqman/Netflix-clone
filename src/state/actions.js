import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_FAVMOVIE_SUCCESS = "FETCH_FAVMOVIE_SUCCESS";

export const fetchMovies = () => {
  return async (dispatch) => {
    try {
      const colRef = collection(db, "movies");
      const dbMovies = [];
      const snapshot = await getDocs(colRef);
      snapshot.forEach((movie) => {
        dbMovies.push({ ...movie.data(), id: movie.id });
      });
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: dbMovies });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
};

export const fetchMovie = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const movies = state.movies;
      const movie = movies.find((movie) => movie.id === id);
      if (movie) {
        console.log(movie);
        dispatch({ type: FETCH_MOVIE_SUCCESS, payload: movie });
      } else {
        throw new Error("Movie not found");
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };
};

export const fetchFavMovies = () => {
    return async (dispatch) => {
      try {
        const colRef = collection(db, "favourites");
        const dbMovies = [];
        const snapshot = await getDocs(colRef);
        snapshot.forEach((movie) => {
          dbMovies.push({ ...movie.data(), id: movie.id });
        });
        dispatch({ type: FETCH_FAVMOVIE_SUCCESS, payload: dbMovies });
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  };
