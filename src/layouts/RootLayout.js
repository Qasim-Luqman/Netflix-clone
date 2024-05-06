import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default function RootLayout() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="root-layout">
            <header>
                <nav>
                    <h1>Netflix</h1>
                    <NavLink to='home'>Home</NavLink>
                    <NavLink to='movies'>Movies</NavLink>
                    <button onClick={logout}>Logout</button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )
}