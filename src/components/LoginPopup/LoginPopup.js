import React, { useState } from "react";
import "./LoginPopup.scss";

const LoginPopup = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://api.jsonbin.io/v3/b/670832e7e41b4d34e4408744",
        {
          headers: {
            "X-Master-Key": "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS", // Thay bằng master key của bạn
          },
        }
      );
      const data = await response.json();
      return data.record.users || []; // Trả về danh sách người dùng
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  // Hàm xử lý đăng ký tài khoản
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      username: username,
      password: password,
    };

    try {
      const users = await fetchUsers(); // Lấy danh sách người dùng hiện tại
      const updatedUsers = [...users, newUser]; // Thêm người dùng mới vào danh sách

      const response = await fetch(
        "https://api.jsonbin.io/v3/b/670832e7e41b4d34e4408744",
        {
          method: "PUT", // Sử dụng PUT để cập nhật
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS", // Thay bằng master key của bạn
          },
          body: JSON.stringify({ users: updatedUsers }), // Cập nhật lại danh sách người dùng
        }
      );

      if (response.ok) {
        alert("Registration successful! You can now log in.");
        resetForm();
        setIsRegister(false);
      } else {
        setError("Failed to register. Try again.");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const users = await fetchUsers(); // Gọi hàm fetchUsers để lấy người dùng
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        onLogin({ username: user.username });
        onClose();
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isRegister && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {error && <p className="error">{error}</p>}

        <div className="login-actions">
          {isRegister ? (
            <>
              <button onClick={handleRegister}>Register</button>
              <button onClick={() => setIsRegister(false)}>Go to Login</button>
            </>
          ) : (
            <>
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setIsRegister(true)}>Go to Register</button>
            </>
          )}
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
