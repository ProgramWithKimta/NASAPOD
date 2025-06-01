import '../login.css';;
import '../App.css';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Logging in with:', { username, password });
        // Add real authentication logic here
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
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
    );
};

export default Login;
