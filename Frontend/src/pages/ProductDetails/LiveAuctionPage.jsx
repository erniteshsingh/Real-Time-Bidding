import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import "./LiveAuctionPage.css";
import { useProduct } from "../../context/ProductContext";
import { AuthContext } from "../../context/AuthContext";

const LiveAuctionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products } = useProduct();
  const { user } = useContext(AuthContext);

  const product = products.find((p) => p._id === id);

  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (product) {
      setCurrentBid(product.currentBid);
    }
  }, [product]);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit("join-auction", id);

    newSocket.on("bid-updated", (data) => {
      setCurrentBid(data.currentBid);
    });

    newSocket.on("auction-ended", (data) => {
      alert(
        ` Auction Ended!\nWinner: ${data.username}\nFinal Bid: ₹${data.finalBid}`,
      );
      navigate("/");
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, navigate]);

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

  const leaveAuction = () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave the auction?",
    );

    if (!confirmLeave) return;

    if (socket) socket.disconnect();
    navigate(-1);
  };

  return (
    <div className="auction-container">
      <div className="auction-card">
        <div className="auction-header">
          <h1>Live Auction</h1>
          <div className="live-indicator">
            <span className="dot"></span>
            LIVE
          </div>
        </div>

        <div className="current-bid-box">
          <span>Current Bid</span>
          <h2>₹{currentBid.toLocaleString()}</h2>
        </div>

        <div className="bid-section">
          <input
            type="number"
            placeholder="Enter your bid amount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <button onClick={placeBid}>Place Bid</button>
        </div>

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
