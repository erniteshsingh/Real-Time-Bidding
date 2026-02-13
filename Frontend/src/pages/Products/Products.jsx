import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Products.css";
import { useProduct } from "../../context/ProductContext";

const Products = () => {
  const { products, setProducts } = useProduct();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products/");

        setProducts(res.data.data);
      } catch (error) {
        console.log("Kuchh error hua hai products fetch karte waqt");
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const viewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="products-container">
      {products.map((car) => (
        <div className="product-card" key={car._id}>
          <img
            src={`http://localhost:3000/uploads/${car.images[0]}`}
            alt={car.title}
          />

          <div className="card-body">
            <h3 className="title">{car.title}</h3>
            <p className="category">{car.category}</p>
            <p className="description">{car.description?.slice(0, 80)}...</p>

            <div className="price-row">
              <span className="price">₹{car.price}</span>

              <button
                className="details-btn"
                onClick={() => viewDetails(car._id)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
