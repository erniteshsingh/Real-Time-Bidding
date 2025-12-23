import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      {/* Hero */}
      <section className="about-hero">
        <h1>
          About <span>CarAuction</span>
        </h1>
        <p>
          A modern, transparent, and secure real-time car auction platform built
          for buyers and sellers.
        </p>
      </section>


      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify the car buying and selling process using
          real-time auctions, ensuring fair pricing, transparency, and trust for
          every user.
        </p>
      </section>

 
      <section className="about-section dark">
        <h2>Why Choose Us</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Real-Time Bidding</h3>
            <p>Live auctions powered by modern real-time technology.</p>
          </div>

          <div className="feature-card">
            <h3>Verified Listings</h3>
            <p>Every car is verified to ensure authenticity and trust.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Platform</h3>
            <p>Admin-moderated auctions with secure authentication.</p>
          </div>

          <div className="feature-card">
            <h3>User Friendly</h3>
            <p>Simple UI designed for smooth and fast bidding.</p>
          </div>
        </div>
      </section>


      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          To become India’s most trusted online car auction marketplace by
          combining technology, transparency, and reliability.
        </p>
      </section>
    </div>
  );
};

export default About;
