import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Admin from "./pages/Admin"; // Trang Admin sử dụng AdminLayout
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header hiển thị trên tất cả các trang */}
        <Header />

        {/* Nội dung chính */}
        <Routes>
          {/* Tuyến đường cho trang Home */}
          <Route path="/" element={<Home />} />

          {/* Tuyến đường cho trang Admin */}
          <Route path="/admin/*" element={<Admin />} />
        </Routes>

        {/* Footer hiển thị trên tất cả các trang */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
