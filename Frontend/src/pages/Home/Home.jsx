import React from "react";
import "./Home.css";

import Products from "../Products/Products";
const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Buy & Sell Cars with <span>Live Auctions</span>
          </h1>
          <p>
            Join India’s trusted real-time car auction platform. Bid smart,
            transparent & secure.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">View Live Auctions</button>
            <button className="secondary-btn">Sell Your Car</button>
          </div>
        </div>
      </section>
      <section>
        <Products />
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Register</h3>
            <p>Create your free account in minutes.</p>
          </div>
          <div className="step">
            <h3>2. Choose Car</h3>
            <p>Select from verified cars listed for auction.</p>
          </div>
          <div className="step">
            <h3>3. Live Bid</h3>
            <p>Bid in real-time and track live updates.</p>
          </div>
          <div className="step">
            <h3>4. Win Auction</h3>
            <p>Win the car at the best market price.</p>
          </div>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Auctions</h2>
        <div className="car-grid">
          <div className="car-card">
            <h3>BMW X5</h3>
            <p>Starting Bid: ₹25,00,000</p>
            <button className="primary-btn">Bid Now</button>
          </div>

          <div className="car-card">
            <h3>Audi A6</h3>
            <p>Starting Bid: ₹18,50,000</p>
            <button className="primary-btn">Bid Now</button>
          </div>

          <div className="car-card">
            <h3>Mercedes C-Class</h3>
            <p>Starting Bid: ₹22,00,000</p>
            <button className="primary-btn">Bid Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
