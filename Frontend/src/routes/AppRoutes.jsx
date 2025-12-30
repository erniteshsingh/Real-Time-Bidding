import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import Sell from "../pages/Sell/Sell";
import About from "../pages/About/About";
import Services from "../pages/Service/Services";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import Profile from "../pages/Profile/Profile";

import LiveAuctionPage from "../pages/ProductDetails/LiveAuctionPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/liveauction/:id" element={<LiveAuctionPage />} />
    </Routes>
  );
};

export default AppRoutes;
