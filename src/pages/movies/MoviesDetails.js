import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchMovie } from "../../state/actions";
import { useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getAuth } from "firebase/auth";

const MovieDetails = ({ movie, fetchMovie }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchMovie(id);
  }, [fetchMovie, id]);

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
    <div>
        <div className="movie-details">
            <div>
                <h2><strong>Movie: </strong>{movie.name}</h2>
                <p><strong>Release Date: </strong>{movie.release_date}</p>
                <p><strong>Genre: </strong>{movie.genre.join(', ')}</p>
                <div className="details">
                <strong>Details: </strong> {movie.description}
                </div>
            </div>
        </div>
        <button onClick={() => handleAddToFavorites(movie)}>
            Add to Favorites
        </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movie: state.movie,
});

const mapDispatchToProps = {
  fetchMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
