import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetailsPage.css";

const ProductDetails = () => {
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

  const startBidding = () => {
    alert("Auction will start here 🚀 (WebSocket next)");
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="image-section">
          <img
            src={`http://localhost:3000/uploads/${product.images[0]}`}
            alt={product.title}
          />
        </div>

        <div className="info-section">
          <h1>{product.title}</h1>
          <p className="brand">
            {product.brand} • {product.model}
          </p>

          <p className="price">₹{product.price}</p>

          <div className="specs">
            <div>
              <span>Category:</span> {product.category}
            </div>
            <div>
              <span>Fuel:</span> {product.fuelType}
            </div>
            <div>
              <span>Transmission:</span> {product.transmission}
            </div>
            <div>
              <span>Mileage:</span> {product.mileage}
            </div>
          </div>

          <p className="description">{product.description}</p>

          <button className="start-bid-btn" onClick={startBidding}>
            Start Bidding
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
