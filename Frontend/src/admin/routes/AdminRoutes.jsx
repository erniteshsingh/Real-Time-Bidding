import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

import Dashboard from "../pages/Dashboard";
import Cars from "../pages/AdminCars";
import Auctions from "../pages/Auctions";
import Bids from "../pages/Bids";
import Users from "../pages/Users";
import AddCar from "../pages/AddCar";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/admin/cars" element={<Cars />} />
        <Route path="/admin/auctions" element={<Auctions />} />
        <Route path="/admin/bids" element={<Bids />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="cars/add" element={<AddCar />} /> 
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
