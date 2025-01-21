import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Auth.css";

const Signup = () => {
    const [username, setUsername] = useState(""); // state for name
    const [password, setPassword] = useState(""); // state for password
    const [confirmPassword, setConfirmPassword] = useState(""); // state for confirm password
    const navigate = useNavigate(); // defining reaact router navigation

    // handle signup form submission
    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not much!")
            return;
        }

        api.post("signup/", { username, password }) // send signup request
        .then(() => {
            alert("User created successfully.");
            navigate("/login"); // redirect to login page
        })
        .catch((error) => console.error("Error during signup:", error));
    };


    return (
        <div className="auth-container">
        <form onSubmit={handleSignup} className="auth-form">
            <h2 className="auth-title">Signup</h2>
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
            <label>
                Confirm Password:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                />
            </label>
            <button type="submit" className="auth-button">
                Signup
            </button>
            <p>
                Already have n account?{" "}
                <span
                        className="auth-link"
                        onClick={() => navigate("/login")}>
                            Login here
                        </span>
            </p>
        </form>
        </div>
    );
};

export default Signup;