import React, { useState } from "react";
import "./LoginPopup.scss";

const LoginPopup = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false); // Trạng thái chuyển giữa đăng nhập và đăng ký
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Dùng trong form đăng ký
  const [error, setError] = useState("");

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
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Registration successful! You can now log in.");
        resetForm(); // Reset form sau khi đăng ký thành công
        setIsRegister(false); // Quay lại trang đăng nhập
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
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        onLogin({ username: user.username }); // Gọi hàm onLogin với đối tượng người dùng
        onClose(); // Đóng popup
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  // Hàm reset form
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
              <button onClick={() => setIsRegister(true)}>
                Go to Register
              </button>
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
