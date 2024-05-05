import { Outlet } from "react-router-dom"

export default function MoviesLayout() {
  return (
    <div className="movies-layout">
      <h2>Movies</h2>
      {/* Add NavLink to faviroute Movies */}
      
      <Outlet />
    </div>
  )
}