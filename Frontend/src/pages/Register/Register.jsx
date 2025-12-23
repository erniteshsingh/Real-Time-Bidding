import "./Register.css";

const Register = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>Create Account</h2>
        <p>Join the car auction platform</p>

        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <button type="submit">Register</button>
        </form>

        <div className="modal-footer">
          <span>Already have an account? Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
