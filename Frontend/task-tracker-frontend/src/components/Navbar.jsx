// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import "./Navbar.css"; // optional if you're styling it

const Navbar = ({ token, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-title">Task Tracker</Link>
      </div>
      <div className="nav-right">
        <Link to="/about" className="nav-link">Why Task Tracker</Link>
        {token ? (
          <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
