import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Movies() {

    const movies = useLoaderData();

    return (
        <div className="movies">
            {movies.map(movie => (
                <Link to={movie.id.toString()} key={movie.id}>
                    <div className="movie-name">
                        <p>{movie.name}</p>
                        <p>Based in {movie.description}</p>
                        <p>Release Date: {movie.release_date}</p>
                    </div>
                    <div className="movie-image">
                        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI%40._V1_.jpg&tbnid=VyYtlaOsYFK4TM&vet=12ahUKEwj33ai98vOFAxWYVKQEHTUuBxYQMygAegQIARBB..i&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0111161%2F&docid=on9f6ny-GzmbEM&w=1200&h=1800&q=shawshank%20redemption%20official%20poster&client=safari&ved=2ahUKEwj33ai98vOFAxWYVKQEHTUuBxYQMygAegQIARBB" alt="" height={150} width={150}/>
                    </div>
                </Link>
            ))}
        </div>
    )
}

// Loader Function to fetch data
export const MoviesLoader = async () => {
    const res = await fetch('http://localhost:4000/movies');

    if(!res.ok) {
        throw Error('Could not Fetch Movies Data');
    }

    return res.json();
}