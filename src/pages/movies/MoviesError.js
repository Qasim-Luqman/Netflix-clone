import { Link, useRouteError } from "react-router-dom"

export default function MoviesError() {

    const error = useRouteError();

    return (
        <div className="movie-error">
            <h2>Error!</h2>
            <p>OOPS! Cannot Fetch Movie Data</p>
            <p>Error Message: {error.message}</p>
            <Link to='/home'>
                <button>Back to the Homepage</button>
            </Link>
        </div>
    )
}