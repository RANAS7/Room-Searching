import React from "react";
import "../Styles/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="all">
      <footer className="footer">
        <div className="footer-logo">
          <img src="./../Logo.png" alt="Company Logo" />
          <span className="footer-logo-text">Room Hunt</span>
        </div>
        <div className="footer-links">
          <span className="footer-title">Pages</span>
          <NavLink to="/" className="link link-hover">
            Home
          </NavLink>
          <NavLink to="/contact" className="link link-hover">
            Contact Us
          </NavLink>
          <NavLink to="/about" className="link link-hover">
            About Us
          </NavLink>
        </div>
        <div className="footer-text">
          <p className="footer-rights">© Online Room Searching System</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
