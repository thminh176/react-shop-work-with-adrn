import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import LoginPopup from "../LoginPopup/LoginPopup";
import { FaUserShield } from "react-icons/fa"; // Import biểu tượng cho quản trị
import "./Header.scss";
import logo from "./logo.png";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate(); // Khởi tạo navigate

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
    setUsername(user.username);
    setIsLoggedIn(true);
    localStorage.setItem("username", user.username);

    // Kiểm tra xem người dùng có phải admin không và lưu vào localStorage
    if (user.isAdmin) {
      localStorage.setItem("isAdmin", "1");
    } else {
      localStorage.setItem("isAdmin", "0");
    }

    setIsPopupOpen(false);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin"); // Xóa thông tin admin khi đăng xuất
    navigate("/"); // Chuyển hướng về trang chính
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          {isLoggedIn && (
            <Link to="/admin" className="admin-icon">
              <FaUserShield size={24} />
            </Link>
          )}
        </nav>
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
