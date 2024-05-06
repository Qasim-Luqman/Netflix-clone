import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovies } from "../../state/actions";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getAuth } from "firebase/auth";

const Movies = ({ movies, fetchMovies }) => {
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleAddToFavorites = async (movie) => {
    const user = getAuth();
    try {
      // Add the movie to the "Favorites" collection in Firebase
      await addDoc(collection(db, "favourites"), {
        movie: movie,
        userId: user.currentUser.uid,
      });
      console.log("Movie added to favorites:", movie);
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  return (
    <div className="movies">
      {movies.map((movie) => (
        <Link to={movie.id.toString()} key={movie.id}>
          <div className="movie-name">
            <p>{movie.name}</p>
            <p>Based in {movie.description}</p>
            <p>Release Date: {movie.release_date}</p>
          </div>
          <div className="movie-image">
            <img src={`${movie.poster_link}`} alt="" height={200} width={150} />
          </div>
          <button onClick={() => handleAddToFavorites(movie)}>
            Add to Favorites
          </button>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movies,
});

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
