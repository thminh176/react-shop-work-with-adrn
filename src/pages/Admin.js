import React, { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../components/UserManagement/UserManagement";
import ProductManagement from "../components/ProductManagement/ProductManagement";
import ShelfManagement from "../components/ShelfManagement/ShelfManagement";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import ProtectedRoute from "../components/ProtectedRoute.js";
import { FaProductHunt, FaThLarge } from "react-icons/fa";
import "./Admin.scss";
import ExportHistory from "../components/ExportHistory/ExportHistory.js";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";
import { MdShelves } from "react-icons/md";
const Admin = () => {
  const [navOpen, setNavOpen] = useState(true);
  const isAdmin = localStorage.getItem("isAdmin") === "1"; // Kiểm tra nếu là admin

  const storedUsername = localStorage.getItem("username");

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="admin-layout">
      <nav className={`admin-nav ${navOpen ? "open" : "shrink"}`}>
        <div className="logo-section">
          <div className="logo">
            <h2>Trang Quản Trị</h2>
          </div>
        </div>
        <ul>
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaThLarge />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MdManageAccounts size={27} />
              <span>Quản lý người dùng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/exportHistory"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <RiChatHistoryFill size={27} />
              <span>Lịch sử xuất , nhập kho</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaProductHunt size={21} />
              <span>Quản lý sản phẩm</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/shelves"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <MdShelves size={22} />
              <span>Quản lý kệ hàng</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={`admin-content ${navOpen ? "" : "shrink"}`}>
        <header className="admin-header">
          <button className="toggle-nav-btn" onClick={toggleNav}>
            {navOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
          <h1>Xin Chào, {storedUsername}</h1>
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute element={<Dashboard />} isAdmin={isAdmin} />
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute element={<UserManagement />} isAdmin={isAdmin} />
            }
          />
          <Route
            path="exportHistory"
            element={
              <ProtectedRoute element={<ExportHistory />} isAdmin={isAdmin} />
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute
                element={<ProductManagement />}
                isAdmin={isAdmin}
              />
            }
          />
          <Route
            path="shelves"
            element={
              <ProtectedRoute element={<ShelfManagement />} isAdmin={isAdmin} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
