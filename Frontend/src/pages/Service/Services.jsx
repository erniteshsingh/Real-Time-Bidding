import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services">
      {/* Hero Section */}
      <section className="services-hero">
        <h1>
          Our <span>Services</span>
        </h1>
        <p>
          Everything you need to buy and sell cars through a secure online
          auction platform.
        </p>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="services-grid">
          <div className="service-card">
            <h3>Live Car Auctions</h3>
            <p>
              Participate in real-time car auctions with transparent bidding and
              instant updates.
            </p>
          </div>

          <div className="service-card">
            <h3>Sell Your Car</h3>
            <p>
              List your car easily and reach genuine buyers through our auction
              system.
            </p>
          </div>

          <div className="service-card">
            <h3>Verified Listings</h3>
            <p>
              Every car listing is verified to ensure trust and authenticity.
            </p>
          </div>

          <div className="service-card">
            <h3>Secure Payments</h3>
            <p>Safe and secure payment processing with admin monitoring.</p>
          </div>

          <div className="service-card">
            <h3>Admin Moderation</h3>
            <p>Auctions are monitored by admins to prevent fraud and misuse.</p>
          </div>

          <div className="service-card">
            <h3>Customer Support</h3>
            <p>Dedicated support to help buyers and sellers at every step.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
