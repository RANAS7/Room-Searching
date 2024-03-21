import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Components/Authentication";
import "../Styles/Navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="navbar">
      <div>
        <NavLink to="/" className="logo">
          ROOM HUNT
        </NavLink>
      </div>
      <div className="right-menu">
        <NavLink to="/contact" className="nav-link">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About Us
        </NavLink>

        {console.log(isAuthenticated)}
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
            <NavLink to="/" onClick={logout} className="logout-button">
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </>
        )}
        <div className="add-btn">
          <NavLink to="/addRoom" className="nav-link add-room">
            Add Room
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
