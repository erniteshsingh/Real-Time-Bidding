import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const openRegisterModal = () => {
    setOpenLogin(false);
    setOpenRegister(true);
    closeMenu();
  };

  const openLoginModal = () => {
    setOpenRegister(false);
    setOpenLogin(true);
    closeMenu();
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span>Car</span>Auction
        </Link>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/sell" onClick={closeMenu}>
              Sell
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <input
            type="text"
            placeholder="Search cars..."
            className="navbar-search"
          />

          <button className="register-btn" onClick={openRegisterModal}>
            Register
          </button>

          <button className="login-btn" onClick={openLoginModal}>
            Login
          </button>
        </div>
      </nav>

      {openRegister && (
        <Register
          onClose={() => setOpenRegister(false)}
          onOpenLogin={openLoginModal}
        />
      )}

      {openLogin && (
        <Login
          onClose={() => setOpenLogin(false)}
          onOpenRegister={openRegisterModal}
        />
      )}
    </>
  );
};

export default Navbar;
