import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup";import { MdManageAccounts } from "react-icons/md";
import "./Header.scss";
import logo from "./logo.png";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
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
              <MdManageAccounts size={42} />
            </Link>
          )}
        </nav>
        <div className="login-section">
          {!isLoggedIn ? (
            <button className="button--outline" onClick={openPopup}>Đăng nhập</button>
          ) : (
            <>
              <button className="button--outline" onClick={handleLogout}>Đăng xuất</button>
            </>
          )}
        </div>
      </div>

      {isPopupOpen && <LoginPopup onClose={closePopup} onLogin={handleLogin} />}
    </header>
  );
};

export default Header;
