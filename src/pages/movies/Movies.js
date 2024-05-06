// import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Movies() {

    // const movies = useLoaderData();
    const [movies, setMovies] = useState([]);

    const colRef = collection(db, 'movies');

    // useCallback ..... useMemo.....

    useEffect(() => {
        let dbMovies = [];
        getDocs(colRef)
            .then((snapshot) => {
                snapshot.docs.forEach((movie) => {
                    dbMovies.push({ ...movie.data(), id: movie.id});
                })
                setMovies([...dbMovies]);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [movies]);

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
                        <img alt="" height={150} width={150}/>
                    </div>
                </Link>
            ))}
        </div>
    )
}

// Loader Function to fetch data
// export const MoviesLoader = async () => {
//     const res = await fetch('http://localhost:4000/movies');

//     if(!res.ok) {
//         throw Error('Could not Fetch Movies Data');
//     }

//     return res.json();
// }