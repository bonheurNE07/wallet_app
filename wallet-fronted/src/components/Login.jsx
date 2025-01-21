import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../services/api";
import "./Auth.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        api.post("login/", { username, password })
        .then((response) => {
            localStorage.setItem("accessToken", response.data.access);
            alert("Login successfully!");
            navigate("/");
        })
        .catch((error) => console.error("Error during login:", error));
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin} className="auth-form">
                <h2 className="auth-title">Login</h2>
                <label>
                    Username:
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username"
                        required
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required 
                    />
                </label>
                <button type="submit" className="auth-button">
                    Login
                </button>
                <p>
                    Don't have an account?{" "}
                    <span
                        className="auth-link"
                        onClick={() => navigate("/signup")}>
                            Signup here
                    </span> 
                </p>
            </form>
        </div>
    );
};

export default Login;