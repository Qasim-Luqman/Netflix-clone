import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFavMovies } from "../../state/actions";

const Movies = ({ favourite, fetchFavMovies }) => {
  useEffect(() => {
    fetchFavMovies();
  }, [fetchFavMovies]);

  return (
    <div className="movies">
      {favourite?.map((movies) => (
        <Link to={movies.movie.id.toString()} key={movies.movie.id}>
          <div className="movie-name">
            <p>{movies.movie.name}</p>
            <p>Based in {movies.movie.description}</p>
            <p>Release Date: {movies.movie.release_date}</p>
          </div>
          <div className="movie-image">
            <img src={`${movies.movie.poster_link}`} alt="" height={200} width={150} />
          </div>
        </Link>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  favourite: state.favourite,
});

const mapDispatchToProps = {
  fetchFavMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);