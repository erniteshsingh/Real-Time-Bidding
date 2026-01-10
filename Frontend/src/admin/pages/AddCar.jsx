import "../styles/addCar.css";
import { useState } from "react";
import axios from "axios";

const AddCar = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    price: "",
    category: "",
    fuelType: "",
    transmission: "",
    mileage: "",
    isAuction: false,
    auctionStartTime: "",
    auctionEndTime: "",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // TEXT FIELDS
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // IMAGES
    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/cars",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Car added successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to add car");
    }
  };

  return (
    <div className="add-car-page">
      <h2>Add New Car</h2>

      <form className="add-car-form" onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className="form-group">
          <label>Car Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* BRAND & MODEL */}
        <div className="form-row">
          <div className="form-group">
            <label>Brand</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Model</label>
            <input
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* PRICE & CATEGORY */}
        <div className="form-row">
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* FUEL / TRANSMISSION / MILEAGE */}
        <div className="form-row">
          <div className="form-group">
            <label>Fuel Type</label>
            <input
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Transmission</label>
            <input
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mileage (km/l)</label>
            <input
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* IMAGES */}
        <div className="form-group">
          <label>Car Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* AUCTION */}
        <div className="form-group checkbox">
          <input
            type="checkbox"
            name="isAuction"
            checked={formData.isAuction}
            onChange={handleChange}
          />
          <span>Enable Auction</span>
        </div>

        {formData.isAuction && (
          <div className="form-row">
            <div className="form-group">
              <label>Auction Start</label>
              <input
                type="datetime-local"
                name="auctionStartTime"
                value={formData.auctionStartTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Auction End</label>
              <input
                type="datetime-local"
                name="auctionEndTime"
                value={formData.auctionEndTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
