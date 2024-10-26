import React, { useState } from "react";
import { fetchUsers } from "../api"; // Nhập hàm fetchUsers từ api
import "./LoginPopup.scss";

const LoginPopup = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const users = await fetchUsers(); // Gọi hàm fetchUsers để lấy người dùng
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        onLogin({ username: user.username, isAdmin: user.isAdmin });
        onClose();
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không hợp lệ");
      }
    } catch (error) {
      setError("Lỗi: " + error.message);
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <h2>Đăng nhập</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <div className="login-actions">
          <button onClick={handleLogin}>Đăng nhập</button>
          <button onClick={onClose} className="close-btn">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
