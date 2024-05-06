import { useLoaderData } from "react-router-dom"
import { db } from "../../config/firebase-config";

export default function MovieDetails () {

    const movie = useLoaderData();

    return (
        <div>
            <div className="movie-details">
                <h2><strong>Movie: </strong>{movie.name}</h2>
                <p><strong>Release Date: </strong>{movie.release_date}</p>
                <p><strong>Genre: </strong>{movie.genre.join(', ')}</p>
                <div className="details">
                    <strong>Details: </strong> {movie.description}
                </div>
            </div>
        </div>
    )
}

//Movie details loader function
export const MovieDetailsLoader = async ({ params }) => {
    const { id } = params;
    const res = await fetch(`http://localhost:4000/movies/` + id);
    if(!res.ok) {
        throw Error('Could not find the Movie');
    }
    return res.json();
}