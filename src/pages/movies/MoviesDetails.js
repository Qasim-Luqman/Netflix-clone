import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchMovie } from "../../state/actions";
import { useParams } from "react-router-dom";

const MovieDetails = ({ movie, fetchMovie }) => {
  const { id } = useParams();
  const [ isPending, setIsPending ] = useState(false);

  useEffect(() => {
    // setIsPending(true);
    fetchMovie(id);
    setIsPending(false);
  }, [fetchMovie, id]);

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="movie-details">
        {isPending && <div>Loading...</div>}
        {!isPending && 
        <div>
        <h2><strong>Movie: </strong>{movie.name}</h2>
        <p><strong>Release Date: </strong>{movie.release_date}</p>
        <p><strong>Genre: </strong>{movie.genre.join(', ')}</p>
        <div className="details">
          <strong>Details: </strong> {movie.description}
        </div>
        </div>
    }   
      </div>
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
