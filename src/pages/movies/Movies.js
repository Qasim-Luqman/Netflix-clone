import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovies } from "../../state/actions";

const Movies = ({ movies, fetchMovies }) => {
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if(!movies) {
    return (
      <div className="loading">Loading...</div>
    )
  }

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
