import '../login.css';
import '../App.css';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/login';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [serverLogin] = useMutation(LOGIN); // This sends the login info to the server
    const navigate = useNavigate();
    const localLogin = useAuth().login // This stores the token

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await serverLogin({ variables: {
                username,
                password
            } })
            const token = response.data.login
            localLogin(token)
            navigate("/Home")
        } catch (err) {
            console.error(err);
        }
    };
 
    return (
    <div className="login-container">
        <form onSubmit={handleSubmit}>
            <div className="login-form">
                <label>Username</label>
                <input
                    type="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className='button' type="submit">Login</button>
                <p>First time here? Click HERE to sign up</p>
            </div>

        </form>
    </div>
    );
};

export default Login;
