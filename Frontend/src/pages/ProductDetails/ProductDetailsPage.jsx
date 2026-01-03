import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductDetailsPage.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/admin/getSingleProduct/${id}`
        );
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
              {product.fuelType}
            </div>
            <div>
              <span>Transmission:</span>
              {product.transmission}
            </div>
            <div>
              <span>Mileage:</span>
              {product.mileage}
            </div>
          </div>

          <div className="description-box">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* ACTION */}
          {product.isAuction && product.status === "live" && (
            <button
              className="start-bid-btn"
              onClick={() => navigate(`/liveauction/${id}`)}
            >
              Start Live Bidding
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
