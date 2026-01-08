import "../styles/adminNavbar.css";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <header className="admin-navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h3 className="navbar-title">Admin Dashboard</h3>

      <div className="navbar-right">Admin</div>
    </header>
  );
};

export default AdminNavbar;
