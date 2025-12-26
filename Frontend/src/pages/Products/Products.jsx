import { useState } from "react";
import "./Products.css";

const cars = [
  {
    id: 1,
    name: "BMW M5",
    model: "2023",
    price: "₹85,00,000",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068",
  },
  {
    id: 2,
    name: "Audi A6",
    model: "2022",
    price: "₹72,00,000",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
  },
  {
    id: 3,
    name: "Mercedes C-Class",
    model: "2023",
    price: "₹68,00,000",
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
  },
];

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  return (
    <div className="products-container">
      {cars.map((car) => (
        <div className="product-card" key={car.id}>
          <img src={car.image} alt={car.name} />

          <div className="card-body">
            <h3>{car.name}</h3>
            <p className="model">Model: {car.model}</p>
            <p className="price">{car.price}</p>

            <button onClick={() => openModal(car)}>Place Bid</button>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedCar.name}</h2>

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
