import "../styles/adminSidebar.css";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-top">
        <h2>Admin Panel</h2>
        <button className="close-btn" onClick={closeSidebar}>
          ✕
        </button>
      </div>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin" end onClick={closeSidebar}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/cars" onClick={closeSidebar}>
            Cars
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/auctions" onClick={closeSidebar}>
            Auctions
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bids" onClick={closeSidebar}>
            Bids
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" onClick={closeSidebar}>
            Users
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <button>Logout</button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
