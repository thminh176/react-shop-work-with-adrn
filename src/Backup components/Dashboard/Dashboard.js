import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  fetchProducts,
  fetchShelves,
  getPaymentInfo,
  updatePaymentInfo,
} from "../api"; // Import các hàm API của bạn
import "./Dashboard.scss";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]);
  const shelvesRegion1 = shelves.slice(0, 9); // Lấy 9 phần tử đầu tiên từ shelves
  const shelvesRegion2 = shelves.slice(9, 18); // Lấy 9 phần tử tiếp theo từ shelves
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    number: "",
    bank: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, productsData, shelvesData, paymentData] = await Promise.all([
          fetchUsers(),
          fetchProducts(),
          fetchShelves(),
          getPaymentInfo(),
        ]);

        setUsers(usersData);
        setProducts(productsData);
        setShelves(shelvesData);
        setPaymentInfo(paymentData || { name: "", number: "", bank: "" });
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleEditPaymentInfo = () => {
    setIsEditing(true);
  };

  const handleSavePaymentInfo = async () => {
    const updatedInfo = await updatePaymentInfo(paymentInfo);
    if (updatedInfo) {
      setIsEditing(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="section">
        <h2>Kệ Hàng</h2>
        <div className="shelves-container">
          <div className="shelves-region">
            <h3>Kệ Hàng 1</h3>
            <div className="shelves-grid">
              {shelvesRegion1.map((shelf) => (
                <div className="shelf-box" key={shelf.id}>
                  <p><strong>ID:</strong> {shelf.id}</p>
                  <p><strong>Tên:</strong> {shelf.name}</p>
                  <p><strong>Vị trí:</strong> X: {shelf.position.x}, Y: {shelf.position.y}, Z: {shelf.position.z}</p>
                  <p><strong>ID Sản Phẩm:</strong> {shelf.productId || "Không có sản phẩm trong kệ này"}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="shelves-region">
            <h3>Kệ Hàng 2</h3>
            <div className="shelves-grid">
              {shelvesRegion2.map((shelf) => (
                <div className="shelf-box" key={shelf.id}>
                  <p><strong>ID:</strong> {shelf.id}</p>
                  <p><strong>Tên:</strong> {shelf.name}</p>
                  <p><strong>Vị trí:</strong> X: {shelf.position.x}, Y: {shelf.position.y}, Z: {shelf.position.z}</p>
                  <p><strong>ID Sản Phẩm:</strong> {shelf.productId || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;