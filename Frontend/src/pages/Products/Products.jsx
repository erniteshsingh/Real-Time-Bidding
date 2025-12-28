import { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [cars, setCars] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/getallProducts"
        );
        setCars(res.data.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  if (loading) return <p className="loading">Loading products...</p>;

  return (
    <div className="products-container">
      {cars.map((car) => (
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
              <button onClick={() => openModal(car)}>Place Bid</button>
            </div>
          </div>
        </div>
      ))}

      {showModal && selectedCar && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedCar.title}</h2>
            <p className="category">{selectedCar.category}</p>
            <p className="price">₹{selectedCar.price}</p>

            <input type="number" placeholder="Enter bid amount" />

            <div className="modal-actions">
              <button className="submit">Submit Bid</button>
              <button className="close" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
