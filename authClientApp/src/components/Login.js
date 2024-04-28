import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToken, fetchToken, setUser } from './Auth.js';
import api from '../api/api.js';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchToken()) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                username,
                password,
            });
            if (response.data.token && response.data.user) {
                setToken(response.data.token);
                setUser(response.data.user.username);
                navigate('/');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Failed to log in. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <form onSubmit={handleLogin}>
                    <h2 className="login-title">Login to your account</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-options">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                            <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
                        </div>
                    </div>
                    <div className="text-center text-lg-start">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                    <div className="small fw-bold mt-2 pt-1 mb-0">
                        <button type="submit" className="login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
