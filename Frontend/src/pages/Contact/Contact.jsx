import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-wrapper">
        
        <div className="contact-left">
          <h1>
            Let’s Talk <span>Cars</span>
          </h1>

          <p>
            Have questions about auctions, selling your car, or insurance? Our
            team is ready to help you anytime.
          </p>

          <div className="contact-details">
            <div>
              <h4>📍 Address</h4>
              <p>New Delhi, India</p>
            </div>

            <div>
              <h4>📞 Phone</h4>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h4>✉️ Email</h4>
              <p>support@carauction.com</p>
            </div>
          </div>
        </div>

    
        <div className="contact-card">
          <h2>Send Message</h2>

          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="Write your message"></textarea>
            <button>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
