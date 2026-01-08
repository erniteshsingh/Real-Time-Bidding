import "../styles/adminCars.css";
import axios from "axios";
import { useEffect, useState } from "react";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/cars");
      setCars(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const getAuctionStatus = (car) => {
    if (!car.isAuction) return "No Auction";
    if (car.auctionEnded) return "Ended";
    return "Live";
  };

  if (loading) return <p className="state-text">Loading cars...</p>;
  if (error) return <p className="state-text error">{error}</p>;

  return (
    <div className="admin-cars">
      {/* HEADER */}
      <div className="cars-header">
        <h2>Cars Management</h2>
        <button className="add-car-btn">+ Add Car</button>
      </div>

      {/* TABLE */}
      <div className="cars-table-wrapper">
        <table className="cars-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Base Price</th>
              <th>Auction</th>
              <th>Bids</th>
              <th>Final Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No cars found
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={
                        car.images?.length
                          ? `http://localhost:3000/uploads/${car.images[0]}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={car.title}
                    />
                  </td>

                  <td>{car.title}</td>
                  <td>{car.brand}</td>
                  <td>₹{car.price}</td>

                  <td>
                    <span
                      className={`badge ${
                        getAuctionStatus(car) === "Live"
                          ? "live"
                          : getAuctionStatus(car) === "Ended"
                          ? "ended"
                          : "inactive"
                      }`}
                    >
                      {getAuctionStatus(car)}
                    </span>
                  </td>

                  <td>{car.totalBids}</td>

                  <td>{car.finalPrice ? `₹${car.finalPrice}` : "-"}</td>

                  <td>
                    <span
                      className={`badge ${
                        car.status === "sold" ? "sold" : "available"
                      }`}
                    >
                      {car.status}
                    </span>
                  </td>

                  <td>
                    <div className="actions">
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCars;
