import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import "./LiveAuctionPage.css";
import { useProduct } from "../../context/ProductContext";
import { AuthContext } from "../../context/AuthContext";

const LiveAuctionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product context
  const { products } = useProduct();

  // Auth context
  const { user } = useContext(AuthContext);

  const product = products.find((p) => p._id === id);

  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [socket, setSocket] = useState(null);

  // Set initial bid from product
  useEffect(() => {
    if (product) {
      setCurrentBid(product.currentBid);
    }
  }, [product]);

  // Socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit("join-auction", id);

    newSocket.on("bid-updated", (data) => {
      console.log("Data Printed at Frontend", data);
      setCurrentBid(data.currentBid);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  // Place bid
  const placeBid = () => {
    if (!socket) return;

    const amount = Number(bidAmount);

    if (!amount || amount <= currentBid) {
      alert("Bid must be higher than current bid");
      return;
    }

    socket.emit("place-bid", {
      productId: id,
      amount,
      userId: user._id,
      username: user.username,
    });

    setBidAmount("");
  };

  // Leave auction
  const leaveAuction = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave the auction?"
    );

    if (!confirmLeave) return;

    if (socket) {
      socket.disconnect();
    }

    navigate(-1);
  };

  return (
    <div className="auction-container">
      <div className="auction-card">
        <div className="auction-header">
          <h1>Live Auction</h1>
          <span className="status live">LIVE</span>
        </div>

        <div className="current-bid-box">
          <span>Current Bid</span>
          <h3>₹{currentBid}</h3>
        </div>

        <div className="bid-section">
          <input
            type="number"
            placeholder="Enter your bid"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={placeBid}>Place Bid</button>
        </div>

        {/* Leave Auction Button */}
        <div className="leave-section">
          <button className="leave-btn" onClick={leaveAuction}>
            Leave Auction
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveAuctionPage;
