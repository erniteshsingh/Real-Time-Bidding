import React from "react";
import "./Sell.css";

const Sell = () => {
  return (
    <div className="sell">
      <section className="sell-hero">
        <h1>
          Sell Your <span>Car</span> With Confidence
        </h1>
        <p>
          List your car, reach genuine buyers, and get the best price through
          our secure auction platform.
        </p>
        <button className="sell-btn">Start Selling</button>
      </section>

      <section className="sell-steps">
        <h2>How It Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span>01</span>
            <h3>Add Car Details</h3>
            <p>
              Enter your car information, upload images, and set a base price.
            </p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Admin Verification</h3>
            <p>Our team verifies your car details before listing it live.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Live Auction</h3>
            <p>Buyers bid in real-time and compete for the best offer.</p>
          </div>

          <div className="step-card">
            <span>04</span>
            <h3>Get Paid</h3>
            <p>Secure payment directly after auction completion.</p>
          </div>
        </div>
      </section>

      <section className="sell-benefits">
        <h2>Why Sell With Us?</h2>

        <div className="benefits-grid">
          <div className="benefit-card">✔ Trusted Buyers</div>
          <div className="benefit-card">✔ Best Market Price</div>
          <div className="benefit-card">✔ Secure Transactions</div>
          <div className="benefit-card">✔ No Hidden Charges</div>
        </div>
      </section>

      <section className="sell-cta">
        <h2>Ready to Sell Your Car?</h2>
        <p>Start your auction today and let buyers compete for your car.</p>
        <button className="sell-btn">List My Car</button>
      </section>
    </div>
  );
};

export default Sell;
