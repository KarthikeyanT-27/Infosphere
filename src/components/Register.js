import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("viewers");
    const [name, setName] = useState("");
    const[district,setDistrict]=useState("");
    const[mobilenumber,setMobilenumber]=useState("");
    const[empid,setEmpid]=useState("");
    const[designation,setDesignation]=useState("viewers");

    const navigate = useNavigate();

   

    const handleRegister = async () => {
        console.log(password);
   

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {email,password,name,role,district,mobilenumber,empid,designation}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
           
            navigate("/");
           
        } catch (error) {
            alert( "Failed to register");
        }
    };

    return (
        <div className="fullportal">
            <h2>Register</h2>
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="viewers">viewers</option>
                <option value="admin">admin</option>
                <option value="informater">Employers</option>
                
            </select>
            <label >Enter your name</label>
            <input type="text"  value={name} onChange={(e) => setName(e.target.value)} />
            <label >enter Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Enter strong password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label >Enter your contact number</label>
            <input type="number" placeholder="Number" value={mobilenumber} onChange={(e)=>setMobilenumber(e.target.value)}/>
            {role === "informater" && (
                <>
                <label >district</label>
                <input type="text" value={district} placeholder="distriict" onChange={(e)=>setDistrict(e.target.value)} />
                <label >Enter your enmployment id</label>
                <input type="number" placeholder="employment id" value={empid}onChange={(e)=>setEmpid(e.target.value)} required />
                <select value={designation} onChange={(e) => setDesignation(e.target.value)}>
                <option value="Reporter">Reporter</option>
                <option value="Verifier">News verifier</option>
                </select>
                </>
            )}
           
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
