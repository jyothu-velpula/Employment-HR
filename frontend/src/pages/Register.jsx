import React, { useState , useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import "./../styles/auth.css"
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getCodeIdData } from "../services/masterData.service"

const API_URL = import.meta.env.REACT_BACKEND_URL || "https://improved-telegram-g99qjrgjq4wcpp96-56067.app.github.dev"

const validatePassword = (password) => {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
};

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        userType: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [allGender, setAllGender] = useState([])
    const [allUserType, setAllUserType] = useState([])
    const [allRole, setAllRole] = useState([])
    const [loading, setLoading] = useState([])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        getAllGender();
        getAlluserType();
        getAllRole();
    },[])

    const getAllGender = async()=> {
        try{
            const response = await getCodeIdData({codeId : "GEN"})
            setAllGender(response.data.result)
        } catch(err){
            console.log(err)
        }
    }

    const getAlluserType = async()=> {
        try{
            const response = await getCodeIdData({codeId : "USE"})
            setAllUserType(response.data.result)
        } catch(err){
            console.log(err)
        }
    }

    const getAllRole = async()=> {
        try{
            const response = await getCodeIdData({codeId : "DES"})
            setAllRole(response.data.result)
        } catch(err){
            console.log(err)
        }
    }

    const registerUser = async () => {

        if (!validatePassword(formData.password)) {
            toast.warning(
                "Password must contain 8+ characters, 1 uppercase, 1 lowercase, 1 number and 1 special character."
            );

            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/Register/User`,
                formData
            )
            if (response.data.error == true) {
                Swal.fire({
                    text: response.data.message,
                    icon: 'error'
                }).then(() => {
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        role: "",
                        gender: "",
                        userType: ""
                    });
                });
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: 'success'
                }).then(() => {
                    setFormData({
                        name: "",
                        email: "",
                        password: "",
                        role: "",
                        gender: "",
                        userType: ""
                    });
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
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <h3 style={{ marginBottom: "10px" }}>Employeement Portal </h3>
                    {/* <p> Welcome Back</p> */}

                    <input name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} ></input>
                    <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} ></input>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span
                            className="password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <select name="gender" value="{employee.gender}" onChange={handleChange}>
                        <option value="">Select Gender</option>
                        {
                            allGender.map((item)=> (
                                <option key={item.id} value={item.systemCode}>{item.systemCodeDsesc}</option>
                            ))
                        }
                    </select>
                    <select name="userType" value={formData.userType} onChange={handleChange}>
                        <option value="">Select User Type</option>
                        {
                            allUserType.map((item)=> (
                                <option key={item.id} value={item.systemCode}>{item.systemCodeDsesc}</option>
                            ))
                        }
                    </select>
                    <select name="userType" value={formData.userType} onChange={handleChange}>
                        <option value="">Select User Type</option>
                        {
                            allRole.map((item)=> (
                                <option key={item.id} value={item.systemCode}>{item.systemCodeDsesc}</option>
                            ))
                        }
                    </select>
                    {/* <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="">Select Role</option>
                        <option value="Employee">Employee</option>
                        <option value="HR">HR</option>
                        <option value="Admin">Admin</option>
                    </select> */}

                    <button onClick={registerUser}>Register</button>

                    <p style={{ marginTop: "10px" }}>Already had an account ? <Link to='/'>Login</Link></p>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default Register