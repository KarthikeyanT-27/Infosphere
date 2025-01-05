import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";



function Login() {
    const [credential,setCredential]= useState({
      email:"",
      password:"",
    });
    const navigate = useNavigate();
    
    const handleChange=(e)=>{
      setCredential({...credential,[e.target.name]:e.target.value});
   
    };

    const handleLogin = async (e) => {
      e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',{ email:credential.email, password:credential.password, },
              {
                headers:{
                  'Content-Type':'application/json',
                },
              }
            );
           const {token,role}=response.data;
           
           localStorage.setItem('token',token);
          
           //navigate portal
           if(role==="viewers") navigate("/viewers");
           else if(role==="admin") navigate("/admin");
           else if (role==="informater") navigate("/informater");
        } catch (error) {
            console.log(error);
        }
    };
   

    return (
        <div className="fullportal">
          <h2>INFOSPHERE WELCOME YOU!</h2>
            <div className="login">
              <h2>Welcome to login page!</h2>
            <form onSubmit={handleLogin}>
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
