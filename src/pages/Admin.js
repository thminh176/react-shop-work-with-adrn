import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../components/UserManagement/UserManagement";
import OrderHistory from "../components/OrderHistory/OrderHistory";
import ProductHistory from "../components/ProductHistory/ProductHistory";
import ProductManagement from "../components/ProductManagement/ProductManagement";
import ShelfManagement from "../components/ShelfManagement/ShelfManagement";
import "./Admin.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Admin = () => {
  const [navOpen, setNavOpen] = useState(true); // Set navOpen là true để nav hiển thị ban đầu

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="admin-layout">
      {/* Nút mở hoặc đóng navigation */}
      <button className="toggle-nav-btn" onClick={toggleNav}>
        {navOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>

      {/* Thanh điều hướng */}
      <nav className={`admin-nav ${navOpen ? "open" : "shrink"}`}>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/users">Quản lý người dùng</Link>
          </li>
          <li>
            <Link to="/admin/orders">Lịch sử mua hàng</Link>
          </li>
          <li>
            <Link to="/admin/product-history">Lịch sử chỉnh sửa sản phẩm</Link>
          </li>
          <li>
            <Link to="/admin/products">Quản lý sản phẩm</Link>
          </li>
          <li>
            <Link to="/admin/shelves">Quản lý kệ hàng</Link>
          </li>
        </ul>
      </nav>

      {/* Nội dung chính cho trang Admin */}
      <div className={`admin-content ${navOpen ? "" : "shrink"}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderHistory />} />
          <Route path="product-history" element={<ProductHistory />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="shelves" element={<ShelfManagement />} />{" "}
          {/* Thêm route mới */}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
