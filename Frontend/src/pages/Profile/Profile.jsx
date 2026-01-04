import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { FaUserCircle, FaEnvelope, FaTrophy } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);

  const [wonAuctions, setWonAuctions] = useState([]);
  const [auctionLoading, setAuctionLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchWonAuctions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/auth/won-auctions",
          { withCredentials: true }
        );
        setWonAuctions(res.data.data);
      } catch (err) {
        console.error("Failed to fetch won auctions", err);
      } finally {
        setAuctionLoading(false);
      }
    };

    fetchWonAuctions();
  }, [user]);

  if (loading) return <p className="loading">Loading profile...</p>;
  if (!user) return <p>User not logged in</p>;

  return (
    <div className="profile-layout">
      {/* ================= USER CARD ================= */}
      <aside className="profile-card">
        <FaUserCircle className="avatar-icon" />
        <h2>{user.username}</h2>
        <p className="email">
          <FaEnvelope /> {user.email}
        </p>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </aside>

      {/* ================= WON AUCTIONS ================= */}
      <section className="won-section">
        <h3>
          <FaTrophy /> Auctions You Won
        </h3>

        {auctionLoading ? (
          <p className="loading">Loading auctions...</p>
        ) : wonAuctions.length === 0 ? (
          <p className="empty-text">You haven’t won any auctions yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="auction-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Start Price</th>
                  <th>Final Bid</th>
                  <th>Total Bids</th>
                  <th>Started</th>
                  <th>Ended</th>
                  <th>Total Pay</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {wonAuctions.map((item) => (
                  <tr key={item._id}>
                    <td className="product-cell">
                      <img
                        src={`http://localhost:3000/uploads/${item.images[0]}`}
                        alt={item.title}
                      />
                      <div>
                        <strong>{item.title}</strong>
                        <span>
                          {item.brand} • {item.model}
                        </span>
                      </div>
                    </td>

                    <td>₹{item.price?.toLocaleString()}</td>

                    <td className="final-price">
                      ₹{item.finalPrice.toLocaleString()}
                    </td>

                    <td>{item.totalBids}</td>

                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                    <td>
                      {new Date(item.auctionEndTime).toLocaleDateString()}
                    </td>

                    <td className="total-pay">
                      ₹
                      {(
                        Number(item.finalPrice || 0) + Number(item.price || 0)
                      ).toLocaleString()}
                    </td>

                    <td>
                      <button className="buy-btn"> Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
