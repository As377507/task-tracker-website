import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/computer picture.jpg";

const WelcomePage = ({ token, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-cyan-400 to-blue-700 min-h-screen text-white py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to <span className="text-yellow-300">Task Tracker</span>
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Enhance productivity, track your progress, and achieve your goals with clarity.
          </p>
          <button
            className="bg-white text-blue-700 font-bold py-2 px-6 rounded-full shadow-md hover:bg-gray-200 transition duration-200"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-white/70 text-black font-semibold py-1 px-3 rounded-full">
              Be Better
            </span>
            <span className="bg-white/70 text-black font-semibold py-1 px-3 rounded-full">
              Be Smarter
            </span>
            <span className="bg-white/70 text-black font-semibold py-1 px-3 rounded-full">
              Be Productive
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Task Efficiency"
            className="w-full max-h-[450px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
