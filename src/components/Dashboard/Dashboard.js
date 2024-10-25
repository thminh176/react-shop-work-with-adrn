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
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    number: "",
    bank: "",
  }); // Trạng thái cho paymentInfo
  const [isEditing, setIsEditing] = useState(false); // Trạng thái cho chế độ chỉnh sửa

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, productsData, shelvesData, paymentData] =
          await Promise.all([
            fetchUsers(),
            fetchProducts(),
            fetchShelves(),
            getPaymentInfo(),
          ]);

        setUsers(usersData);
        setProducts(productsData);
        setShelves(shelvesData);
        setPaymentInfo(paymentData || { name: "", number: "", bank: "" }); // Đảm bảo có dữ liệu mặc định
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Hàm cập nhật paymentInfo
  const handlePaymentInfoChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleEditPaymentInfo = () => {
    setIsEditing(true); // Bật chế độ chỉnh sửa
  };

  const handleSavePaymentInfo = async () => {
    const updatedInfo = await updatePaymentInfo(paymentInfo); // Gọi API để cập nhật paymentInfo
    if (updatedInfo) {
      setIsEditing(false); // Tắt chế độ chỉnh sửa nếu thành công
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="section">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>{product.description}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Shelves</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {shelves.map((shelf) => (
              <tr key={shelf.id}>
                <td>{shelf.id}</td>
                <td>{shelf.name}</td>
                <td>{`X: ${shelf.position.x}, Y: ${shelf.position.y}, Z: ${shelf.position.z}`}</td>
                <td>{shelf.productId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Payment Information</h2>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={paymentInfo.name}
              onChange={handlePaymentInfoChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="number"
              value={paymentInfo.number}
              onChange={handlePaymentInfoChange}
              placeholder="Number"
            />
            <input
              type="text"
              name="bank"
              value={paymentInfo.bank}
              onChange={handlePaymentInfoChange}
              placeholder="Bank"
            />
            <button onClick={handleSavePaymentInfo}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <p>Name: {paymentInfo.name}</p>
            <p>Number: {paymentInfo.number}</p>
            <p>Bank: {paymentInfo.bank}</p>
            <button onClick={handleEditPaymentInfo}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
