import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./Navbar.css";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const { user, logout } = useContext(AuthContext);

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
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span>Car</span>Auction
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <CiMenuBurger />
        </div>

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

          {user ? (
            <span className="profile" onClick={() => navigate("/profile")}>
              <CgProfile size={22} />
            </span>
          ) : (
            <button className="login-btn" onClick={openLoginModal}>
              Login
            </button>
          )}
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
