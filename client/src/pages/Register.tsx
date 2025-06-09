import '../login.css';
import '../App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/register';
import { useAuth } from '../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [registerUser] = useMutation(REGISTER); // This sends the registration info to the server
    const navigate = useNavigate();
    const localLogin = useAuth().login // This stores the token returned

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }

        try {
            const response = await registerUser({ variables: {
                username,
                password
            } })
            const token = response.data.register
            localLogin(token)
            navigate("/Home")
        } catch (err) {
            console.error(err);
            setError("Registration failed");
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
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                />
                <p>Password must be at least 8 characters</p>
                <button className='button' type="submit">Register</button>
                {error && <p className="error">{error}</p>}
                <p><Link to="/">Login</Link></p>
            </div>

        </form>
    </div>
    );
};

export default Register;
