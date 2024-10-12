import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import LoginPopup from "../LoginPopup/LoginPopup";
import "./Header.scss";
import logo from "./logo.png";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogin = (user) => {
    setUsername(user.username); // Cập nhật tên người dùng từ đối tượng
    setIsLoggedIn(true);
    localStorage.setItem("username", user.username); // Lưu tên người dùng vào localStorage
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("username"); // Xóa tên người dùng khỏi localStorage
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>{isLoggedIn && <Link to="/admin">Quản Trị</Link>}</nav>
        <div className="login-section">
          {!isLoggedIn ? (
            <button onClick={openPopup}>Login / Register</button>
          ) : (
            <>
              <p className="welcome-msg">Xin chào, {username}!</p>
              <button onClick={handleLogout}>Đăng xuất</button>
            </>
          )}
        </div>
      </div>

      {isPopupOpen && <LoginPopup onClose={closePopup} onLogin={handleLogin} />}
    </header>
  );
};

export default Header;
