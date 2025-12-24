import "./Register.css";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useState } from "react";

import axios from "axios";
const Register = ({ onClose, onOpenLogin }) => {
  const [user, Setuser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    Setuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        user
      );

      toast.success("User Register Successfully");
      Setuser({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        onClose();
        onOpenLogin();
      }, 1500);
    } catch (error) {
      if (error.status === 400) {
        toast.warn(
          "Invalid input  Please check your email format and ensure password has at least 6 characters."
        );
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>
        <h2>Create Account</h2>
        <p>Join the car auction platform</p>

        <form onSubmit={submitHandler}>
          <input
            name="username"
            value={user.username}
            onChange={handleChange}
            type="text"
            placeholder="username"
          />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
          />

          <button type="submit">Register</button>
        </form>

        <div className="modal-footer">
          <span>
            Already have an account?{" "}
            <button
              className="link-btn"
              onClick={() => {
                onClose();
                onOpenLogin();
              }}
            >
              Login
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
