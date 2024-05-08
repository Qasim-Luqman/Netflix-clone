import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { getAuth } from "firebase/auth";

export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIE_SUCCESS = "FETCH_MOVIE_SUCCESS";
export const FETCH_FAVMOVIE_SUCCESS = "FETCH_FAVMOVIE_SUCCESS";
export const ADD_FAVMOVIE_SUCCESS = "ADD_FAVMOVIE_SUCCESS";

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
  const user = getAuth();
  const userId = user.currentUser.uid;
  return async (dispatch) => {
    try {
      const colRef = collection(db, "favorites");
      const dbMovies = [];
      const snapshot = await getDocs(colRef);
      snapshot.forEach((movie) => {
        const data = movie.data();
        if (data.userId === userId) {
          dbMovies.push({ ...movie.data(), id: movie.id });
        }
      });
      dispatch({ type: FETCH_FAVMOVIE_SUCCESS, payload: dbMovies });
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
};

export const addFavMovie = (movie) => {
  return async (dispatch, getState) => {
    const state = getState();
    const fav = state.favourite;
    const isDuplicate = fav.some((favMovie) => favMovie.movie.id === movie.id);

    if (isDuplicate) {
      alert("This movie is already in your favorites!");
      return;
    }
    const user = getAuth();
    try {
      await addDoc(collection(db, "favorites"), {
        movie: movie,
        userId: user.currentUser.uid,
      });
      dispatch({
        type: ADD_FAVMOVIE_SUCCESS,
        payload: { movie, userId: user.currentUser.uid },
      });
      console.log("Movie added to favorites:", movie);
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };
};
