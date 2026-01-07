import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Cars from "../pages/Cars";
import Auctions from "../pages/Auctions";
import Bids from "../pages/Bids";
import Users from "../pages/Users";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="cars" element={<Cars />} />
        <Route path="auctions" element={<Auctions />} />
        <Route path="bids" element={<Bids />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
