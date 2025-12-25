import { useContext } from "react";
import "./Profile.css";
import { FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";

const user = {
  username: "coder",
  email: "coder@gmail.com",
  role: "user",
};

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <h2>{user.username}</h2>

        <div className="profile-info">
          <p>
            <FaEnvelope /> {user.email}
          </p>
          <p>
            <FaPhone /> {user.role}
          </p>
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
