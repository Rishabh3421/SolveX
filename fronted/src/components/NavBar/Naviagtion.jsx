import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Navigation = ({ userName, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("session");
    navigate("/login", { replace: true });
  };


  return (
    <nav className="flex justify-between items-center relative bg-zinc-900 text-white" style={{ padding: '1vh' }}>
     
      <div className="text-2xl font-bold">SolveX</div>

      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-8 h-8 rounded-full bg-gray-600 flex right-2 justify-center items-center text-white text-lg hover:bg-gray-500 transition"
        >
          {userName ? userName.charAt(0).toUpperCase() : <FaUser />}
        </button>

        
        {dropdownOpen && (
          <div className="absolute top-1.5 h-6 right-12  mt-2 w-25 bg-gray-700 shadow-lg rounded-md py-2 z-50">
            <button
               onClick={handleLogout}
              className=" text-center w-25  h-6 px-4 py-2 text-sm text-white hover:bg-gray-600 rounded-md transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
