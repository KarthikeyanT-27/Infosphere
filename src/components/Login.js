import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";



function Login() {
    const [credential,setCredential]= useState({
      email:"",
      password:"",
    });
    const [userType,setUserType]= useState("viewers");
    const navigate = useNavigate();
    
    const handleChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value});
   
    };

    const handleLogin = async (e) => {
      e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login/${userType}`,{ email:credential.email, password:credential.password, },
              {
                headers:{
                  'Content-Type':'application/json',
                },
              }
            );
           const {token}=response.data;
           localStorage.setItem('token',token);

           //navigate portal
           if(userType==="viewers") navigate("/viewers");
           else if (userType==="informater") navigate("/informater");
        } catch (error) {
            console.log(error);
        }
    };
   

    return (
        <div className="fullportal">
            <h3>Choose login mode</h3>
            <div className="portal">
              <button onClick={()=> setUserType("informater")}>Reporter</button>
              <button onClick={()=> setUserType("viewers")}> viewers</button>
            </div>
            <div className="login">
            <form onSubmit={handleLogin}>
              <h2>{userType.charAt(0).toUpperCase()+userType.slice(1)} login mode </h2>
            <label >Enter your E-mail</label>
            <input type="email" name="email"  value={credential.email} onChange={handleChange} />
            <label >Enter your password</label>
            <input type="password" name="password"  value={credential.password} onChange={handleChange} />
            <button  className="loginbutton">Login</button>
            <button className="registerbutton" onClick={() => navigate("/register")}>Register</button>
              </form>
            </div> 
               
            </div>
        
    );
}

export default Login;
