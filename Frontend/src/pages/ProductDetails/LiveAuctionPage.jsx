import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./LiveAuctionPage.css";

const LiveAuctionPage = () => {
  const { id } = useParams();

  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.emit("join-auction", id);

    newSocket.on("bid-updated", (data) => {
      setCurrentBid(data.currentBid);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id]);

  const placeBid = () => {
    if (!bidAmount || bidAmount <= 0) return;

    console.log("car Id at Frontend", id);

    socket.emit("place-bid", {
      productId: id,
      amount: Number(bidAmount),
      userId: "USER_123", // later from auth
    });

    setBidAmount("");
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
          <h3>₹{currentBid.toLocaleString()}</h3>
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
      </div>
    </div>
  );
};

export default LiveAuctionPage;
