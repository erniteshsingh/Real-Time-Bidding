import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetailsPage.css";

const formatDateTime = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="details-container">
      <div className="details-wrapper">
        {/* IMAGE */}
        <div className="image-section">
          <img
            src={`http://localhost:3000/uploads/${product.images[0]}`}
            alt={product.title}
          />
        </div>

        {/* INFO */}
        <div className="info-section">
          <h1>{product.title}</h1>

          <p className="brand">
            {product.brand} • {product.model}
          </p>

          <p className="price">₹{product.price.toLocaleString()}</p>

          {/* AUCTION INFO */}
          {product.isAuction && (
            <div className="auction-box">
              <div>
                <span>Current Bid:</span>
                <strong>
                  ₹{product.currentBid > 0 ? product.currentBid : product.price}
                </strong>
              </div>

              <div>
                <span>Total Bids:</span>
                <strong>{product.totalBids}</strong>
              </div>

              <div>
                <span>Min Increment:</span>
                <strong>₹{product.minimumBidIncrement}</strong>
              </div>

              <div>
                <span>Status:</span>
                <strong className="live">{product.status}</strong>
              </div>

              <div>
                <span>Auctione Starts:</span>
                <strong>{formatDateTime(product.auctionStartTime)}</strong>
              </div>

              <div>
                <span>Auction Ends:</span>
                <strong>{formatDateTime(product.auctionEndTime)}</strong>
              </div>
            </div>
          )}

          {/* SPECS */}
          <div className="specs">
            <div>
              <span>Category:</span>
              {product.category}
            </div>
            <div>
              <span>Fuel Type:</span>
              {product.fuelType || "N/A"}
            </div>
            <div>
              <span>Transmission:</span>
              {product.transmission || "N/A"}
            </div>
            <div>
              <span>Mileage:</span>
              {product.mileage || "N/A"}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="description-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* ACTION BUTTON */}
          {product.isAuction &&
            product.status === "live" &&
            !product.auctionEnded && (
              <button
                className="start-bid-btn"
                onClick={() => navigate(`/liveauction/${id}`)}
              >
                Start Live Bidding
              </button>
            )}

          {/* AUCTION ENDED */}
          {product.auctionEnded && <p className="ended-text">Auction Ended</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
