import { NavLink, Outlet } from "react-router-dom"

export default function MoviesLayout() {
  return (
    <div className="movies-layout">
      <div className="movie-layout">
        <h2>Movies</h2>
        <NavLink className="fav-button" to="favourite">Favourite Movies</NavLink>
      </div>
      {/* Add NavLink to faviroute Movies */}
      
      <Outlet />
    </div>
  )
}