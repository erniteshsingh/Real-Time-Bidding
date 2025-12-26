import { useContext } from "react";
import "./Profile.css";
import { FaUserCircle, FaEnvelope, FaPhone } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not logged in</p>;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        </div>

        <div className="profile-actions">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
