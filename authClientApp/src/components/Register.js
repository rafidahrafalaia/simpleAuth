import { useState, useEffect } from "react";
// import Axios from "axios";

import api from '../api/api.js';
import {fetchToken, setToken, setUser} from './Auth.js'
import { Link, useNavigate } from "react-router-dom"; // Import Link component and useNavigate hook
// import "./Register.css"; // Import CSS file for styling

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook

    useEffect(() => {
        if (fetchToken()) {
            navigate('/'); 
        }
    }, [navigate]);

    const register = (e) => {
        e.preventDefault();
        api.post("/register", {
            email: email,
            username: name,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.token && response.data.user) {
                setToken(response.data.token);
                setUser(response.data.user.username);
                navigate('/');
            } else {
                setError(response.data.message);
            }
        });
    };

    return (
        
        <div className="login-container">
            <div className="login-form-container">
                    {/* <h2 className="login-title">Login to your account</h2> */}
            <h2 className="login-title">Create Your Account</h2>
                <form onSubmit={register}>
                    <div className="form-group">
                        <label htmlFor="name">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            // placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            // placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            pattern=".{5,}" // Minimum length of 5 characters
                            // placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                     Already have an account? <Link to="/login">Login here</Link>
                    <button type="submit" className="login-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
