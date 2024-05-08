import { useEffect } from "react";
import { connect } from "react-redux";
import { addFavMovie, fetchMovie } from "../../state/actions";
import { useParams } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getAuth } from "firebase/auth";

const MovieDetails = ({ movie, fetchMovie, addFavMovie }) => {
  const { id } = useParams();

  useEffect(() => {
    fetchMovie(id);
  }, [fetchMovie, id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleAddToFavorites = async (movie) => {
    addFavMovie(movie);
  };

  return (
    <div>
      <div className="movie-details">
        <div>
          <h2>
            <strong>Movie: </strong>
            {movie.name}
          </h2>
          <p>
            <strong>Release Date: </strong>
            {movie.release_date}
          </p>
          <p>
            <strong>Genre: </strong>
            {movie.genre.join(", ")}
          </p>
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
  addFavMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
