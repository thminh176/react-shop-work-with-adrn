import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Admin from "./pages/Admin"; // Trang Admin sử dụng AdminLayout
// import UpdateNotice from "./components/UpdateNotice/UpdateNotice";
import "./App.scss";

function App() {
  return (
    // <UpdateNotice />
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
      </div>
    </Router>
  );
}

export default App;
