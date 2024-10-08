import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import LoginPopup from "../LoginPopup/LoginPopup";
import "./Header.scss";
import logo from "./logo.png";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleLogin = (user) => {
    setUsername(user.username); // Cập nhật tên người dùng từ đối tượng
    setIsLoggedIn(true);
    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            {" "}
            {/* Đính liên kết Home vào logo */}
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          {/* Không cần hiển thị chữ "Home" */}
          {isLoggedIn && <Link to="/admin">Quản Trị</Link>}
        </nav>
        <div className="login-section">
          {!isLoggedIn && <button onClick={openPopup}>Login / Register</button>}
          {isLoggedIn && (
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
