import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/api/admin/users?page=${page}&limit=12`,
      );

      setUsers(res.data.users || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [page]);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="users-page">
      <div className="users-header">
        <h1>Users Management</h1>
        <p>Manage and monitor all platform users</p>
      </div>

      <div className="users-topbar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="users-count">
          Total Users: <strong>{users.length}</strong>
        </div>
      </div>

      <div className="users-table-wrapper">
        {loading ? (
          <p className="loading">Loading users...</p>
        ) : (
          <>
            <table className="users-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td className="user-id">{user._id}</td>
                      <td className="user-name">{user.username}</td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className="role-badge">{user.role}</span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            user.isBlocked ? "blocked" : "active"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>
                      <td>
                        {new Date(user.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* ✅ PAGINATION UI */}
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
