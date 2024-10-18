import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "../api"; // Cập nhật đường dẫn nếu cần
import "./UserManagement.scss";
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editingUser, setEditingUser] = useState(null); // Để chỉnh sửa mật khẩu

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    getUsers();
  }, []);

  const handleAddUser = async () => {
    const userId = users.length
      ? Math.max(...users.map((user) => user.id)) + 1
      : 1; // Tạo ID mới
    const addedUser = await addUser({ id: userId, ...newUser });
    setUsers((prevUsers) => [...prevUsers, addedUser.record]);
    setNewUser({ name: "", email: "", password: "" }); // Reset input
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const handleEditPassword = async (userId, newPassword) => {
    const updatedUser = await updateUser(userId, { password: newPassword });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, password: updatedUser.record.password }
          : user
      )
    );
    setEditingUser(null); // Kết thúc chỉnh sửa
  };

  return (
    <div>
      <h1>Quản lý người dùng</h1>

      {/* Thêm người dùng */}
      <input
        type="text"
        placeholder="Tên người dùng"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddUser}>Thêm người dùng</button>

      {/* Danh sách người dùng */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>ID:</strong> {user.id} - {user.username} ({user.email}){" "}
            {editingUser === user.id ? (
              <span>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  onChange={(e) =>
                    setEditingUser({ id: user.id, password: e.target.value })
                  }
                />
                <button
                  onClick={() =>
                    handleEditPassword(user.id, editingUser.password)
                  }
                >
                  Lưu mật khẩu
                </button>
              </span>
            ) : (
              <button onClick={() => setEditingUser(user.id)}>
                Sửa mật khẩu
              </button>
            )}
            <button onClick={() => handleDeleteUser(user.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
