import "../styles/adminSidebar.css";

const AdminSidebar = () => {
  <aside className="admin-sidebar">
    <div className="sidebar-top">
      <h2>Admin Panel</h2>
    </div>

    <ul className="sidebar-menu">
      <li>Dashboard</li>
      <li>Cars</li>
      <li>Auctions</li>
      <li>Bids</li>
      <li>Users</li>
    </ul>

    <div className="sidebar-footer">
      <button>Logout</button>
    </div>
  </aside>;
};

// module.exports = AdminSidebar;
export default AdminSidebar;
