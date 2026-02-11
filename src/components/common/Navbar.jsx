import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 shadow-lg">
      <div className="px-4 md:px-8 lg:px-24 mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + Title */}
       <Link to='/'>
        <div className="flex items-center gap-4">
          <div className="bg-red-600 p-3 rounded-lg shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.6L5.5 13 12 9.4l6.5 3.6-6.5 3.6zM7 14.5v3.6c0 1.4 2.2 2.4 5 2.4s5-1 5-2.4v-3.6l-5 2.7-5-2.7z" />
            </svg>
          </div>

          <div className="leading-tight">
            <h1 className="text-white text-lg font-extrabold tracking-wide">
              ARMED FORCES SHTS
            </h1>
          </div>
        </div>
       </Link>

        <p className="text-white/90 text-sm md:text-xl lg:text-2xl font-medium">
          Terminal Report Management System
        </p>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                `text-white font-medium transition duration-200 ${
                  isActive ? "text-blue-200" : "hover:text-blue-200"
                }`
              }
            >
              Features
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white font-medium transition duration-200 ${
                  isActive ? "text-blue-200" : "hover:text-blue-200"
                }`
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-white font-medium transition duration-200 ${
                  isActive ? "text-blue-200" : "hover:text-blue-200"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
