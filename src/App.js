import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Viewers from "./components/Viewers";
import Informater from "./components/Informater";
import './App.css';
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/viewers" element={<Viewers />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/informater" element={<Informater />} />
            </Routes>
        </Router>
  );
}

export default App;
