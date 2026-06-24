import React, { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import Swal from "sweetalert2";
import "./../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const API_URL = import.meta.env.REACT_BACKEND_URL || "https://improved-telegram-g99qjrgjq4wcpp96-56067.app.github.dev"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const loginUser = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/api/Login/User`,
                {
                    email,
                    password
                }
            );

            if(response.data.error == true){
                Swal.fire({
                    text: response.data.message,
                    icon: 'error'
                }).then(() => {
                    setEmail("")
                    setPassword("")
                });

            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'success'
                }).then(() => {
                    setEmail("")
                    setPassword("")
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.details)
                );
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h3 style={{marginBottom : "10px"}}>Employeement Portal </h3>
                {/* <p> Welcome Back</p> */}

                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                {/* <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input> */}
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span
                        className="password-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button onClick={loginUser}>Login</button>
                <p style={{marginTop : "10px"}}>Don't have an account ? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login
