import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../api";
import "./UserManagement.scss";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: 0,
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const addedUser = await addUser({ id: newId, ...newUser });
    setUsers((prevUsers) => [...prevUsers, addedUser.record]);
    setNewUser({ username: "", email: "", password: "", isAdmin: 0 });
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEditPassword = async (userId) => {
    await updateUser(userId, { password: editPassword });
    setEditPassword("");
    setEditingUser(null);
  };

  const handleUpdateAdminStatus = async (userId, isAdmin) => {
    await updateUser(userId, { isAdmin: isAdmin ? 0 : 1 });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin: isAdmin ? 0 : 1 } : user
      )
    );
  };

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">Quản lý Người Dùng</h1>

      {/* Form Thêm Người Dùng */}
      <div className="user-form">
        <h2 className="user-form-title">Thêm Người Dùng</h2>
        <input
          className="user-input"
          type="text"
          placeholder="Tên người dùng"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          className="user-input"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          className="user-input"
          type="password"
          placeholder="Mật khẩu"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={newUser.isAdmin}
            onChange={(e) =>
              setNewUser({ ...newUser, isAdmin: e.target.checked ? 1 : 0 })
            }
          />
          Admin
        </label>
        <button className="add-user-btn" onClick={handleAddUser}>
          Thêm Người Dùng
        </button>
      </div>

      {/* Danh Sách Người Dùng */}
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-item" key={user.id}>
            <div className="user-info">
              <div className="user-info-row">
                <span>ID:</span>
                <span>{user.id}</span>
              </div>
              <div className="user-info-row">
                <span>Tên:</span>
                <span>{user.username}</span>
              </div>
              <div className="user-info-row">
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="user-info-row">
                <span>Admin:</span>
                <span>{user.isAdmin ? "Có" : "Không"}</span>
              </div>
            </div>
            <div className="user-actions">
              {editingUser === user.id ? (
                <div className="edit-password-container">
                  <input
                    className="password-input"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                  <button
                    className="save-password-btn"
                    onClick={() => handleEditPassword(user.id)}
                  >
                    Lưu
                  </button>
                  <button
                    className="cancel-edit-btn"
                    onClick={() => setEditingUser(null)}
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <button
                  className="edit-password-btn"
                  onClick={() => setEditingUser(user.id)}
                >
                  Sửa Mật Khẩu
                </button>
              )}
              <button
                className="admin-toggle-btn"
                onClick={() => handleUpdateAdminStatus(user.id, user.isAdmin)}
              >
                {user.isAdmin ? "Bỏ Admin" : "Cấp Admin"}
              </button>
              <button
                className="delete-user-btn"
                onClick={() => handleDeleteUser(user.id)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
