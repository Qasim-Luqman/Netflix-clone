import { NavLink } from "react-router-dom"

export default function SignupLoginNav () {
    return (
        <div>
            <header>
                <nav>
                    <h1>Netflix</h1>
                    <NavLink to='/login'>Login</NavLink>
                    <NavLink to='/signup'>Signup</NavLink>
                </nav>
            </header>
        </div>
    )
}