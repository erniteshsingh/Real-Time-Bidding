import "./Login.css";

const Login = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
       
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Welcome Back</h2>
        <p>Login to continue bidding on cars</p>

        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button type="submit">Login</button>
        </form>

        <div className="modal-footer">
          <span>Don’t have an account? Register</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
