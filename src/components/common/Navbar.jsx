import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-[var(--royal-blue)] to-[var(--royal-blue-dark)] border-b-4 border-red-700 shadow-lg">
      <div className=" px-4 md:px-8 lg:px-24 mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="bg-red-600 p-3 rounded-lg shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13.6L5.5 13 12 9.4l6.5 3.6-6.5 3.6zM7 14.5v3.6c0 1.4 2.2 2.4 5 2.4s5-1 5-2.4v-3.6l-5 2.7-5-2.7z" />
            </svg>
          </div>

          {/* Text */}
          <div className="leading-tight">
            <h1 className="text-white text-lg font-extrabold tracking-wide">
              ARMED FORCES SHTS
            </h1>
            
          </div>
        </div>

        <p className="text-white/90 text-sm md:text-xl lg:text-2xl font-medium">
              Terminal Report Management System
            </p>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavItem label="Features">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </NavItem>

          <NavItem label="About">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </NavItem>

          <NavItem label="Contact">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </NavItem>
        </div>
      </div>
    </nav>
  );
};

/* Reusable Nav Item */
const NavItem = ({ label, children }) => (
  <a
    href={`#${label.toLowerCase()}`}
    className="flex items-center gap-2 text-white font-medium hover:text-blue-200 transition duration-200 group"
  >
    <svg
      className="w-5 h-5 group-hover:scale-110 transition"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
    {label}
  </a>
);

export default Navbar;
