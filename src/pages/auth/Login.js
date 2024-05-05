import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SignupLoginNav from '../../layouts/SignupLoginNav';

const auth = getAuth();

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitUser = async (e) => {
        e.preventDefault();
        const login = await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        console.log(auth.currentUser);
    }

    return (
        <div>
            <SignupLoginNav />
            <div className='signup-login-form'>
                <h2>Login</h2>
                <form onSubmit={submitUser}>
                    <label>Email: </label>
                    <input 
                        type="email"
                        required
                        value={email} 
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <label>Password: </label>
                    <input 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        autoComplete="on"
                    />
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}