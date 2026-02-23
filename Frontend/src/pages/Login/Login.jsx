import { useContext, useState } from "react";
import "./Login.css";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import axiosInstance from "../../utils/axiosInstance";
const Login = ({ onClose, onOpenRegister }) => {
  const navigate = useNavigate();

  const [loginuser, Setloginuser] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const changeHandle = (e) => {
    const { name, value } = e.target;

    Setloginuser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", loginuser);
      login(res.data.user, res.data.token); // token optional if backend sends
      toast.success("User Login Successful");

      setTimeout(() => {
        Setloginuser({ email: "", password: "" });
        onClose();
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else if (error.response?.status === 403) {
        toast.error("Your account has been blocked. Contact admin");
      } else {
        toast.error("Facing some issues right now!!");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          <RxCross2 />
        </button>

        <h2>Welcome Back</h2>
        <p>Login to continue bidding on cars</p>

        <form onSubmit={submithandler}>
          <input
            name="email"
            value={loginuser.email}
            onChange={changeHandle}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={loginuser.password}
            onChange={changeHandle}
            type="password"
            placeholder="Password"
          />

          <button type="submit">Login</button>
        </form>

        <div className="modal-footer">
          <span>
            Don’t have an account?{" "}
            <button
              className="link-btn"
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
            >
              Register
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
