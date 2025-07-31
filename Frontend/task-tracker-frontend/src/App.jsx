import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import TodoList from "./components/TodoList";
import WelcomePage from "./pages/WelcomePage";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar token={token} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={<WelcomePage token={token} handleLogout={handleLogout} />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/tasks" /> : <LoginForm setToken={setToken} />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/tasks" /> : <RegisterForm />}
          />
          <Route
            path="/tasks"
            element={token ? <TodoList token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/about"
            element={<About />} // ✅ use About component instead of inline JSX
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
