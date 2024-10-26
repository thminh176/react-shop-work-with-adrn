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
        <h2>Danh Sách Người Dùng</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Có" : "Không"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Danh Sách Sản Phẩm</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Mô Tả</th>
              <th>Ảnh</th>
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
        <h2>Kệ Hàng</h2>
        <div className="shelves-container">
          <div className="shelves-region">
            <h3>Kệ Hàng 1</h3>
            <div className="shelves-grid">
              {shelvesRegion1.map((shelf) => (
                <div className="shelf-box" key={shelf.id}>
                  <p>
                    <strong>Ô Hàng:</strong> {shelf.id}
                  </p>
                  <p>
                    <strong>Sản Phẩm:</strong>{" "}
                    {products
                      .filter(
                        (productItem) => shelf.productId === productItem.id
                      )
                      .map((product) => <p key={product.id}>{product.name}</p>)
                      .length === 0 ? (
                      <p>Không có sản phẩm</p>
                    ) : (
                      products
                        .filter(
                          (productItem) => shelf.productId === productItem.id
                        )
                        .map((product) => (
                          <p key={product.id}>{product.name}</p>
                        ))
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="shelves-region">
            <h3>Kệ Hàng 2</h3>
            <div className="shelves-grid">
              {shelvesRegion2.map((shelf) => (
                <div className="shelf-box" key={shelf.id}>
                  <p>
                    <strong>Ô Hàng:</strong> {shelf.id}
                  </p>
                  <p>
                    <strong>Sản Phẩm:</strong>{" "}
                    {products
                      .filter(
                        (productItem) => shelf.productId === productItem.id
                      )
                      .map((product) => <p key={product.id}>{product.name}</p>)
                      .length === 0 ? (
                      <p>Không có sản phẩm</p>
                    ) : (
                      products
                        .filter(
                          (productItem) => shelf.productId === productItem.id
                        )
                        .map((product) => (
                          <p key={product.id}>{product.name}</p>
                        ))
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Thông Tin Thanh Toán</h2>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={paymentInfo.name}
              onChange={handlePaymentInfoChange}
              placeholder="Tên"
            />
            <input
              type="text"
              name="Số Tài Khoản"
              value={paymentInfo.number}
              onChange={handlePaymentInfoChange}
              placeholder="Number"
            />
            <input
              type="text"
              name="bank"
              value={paymentInfo.bank}
              onChange={handlePaymentInfoChange}
              placeholder="Ngân Hàng Nhận"
            />
            <button onClick={handleSavePaymentInfo}>Lưu</button>
            <button onClick={() => setIsEditing(false)}>Hủy</button>
          </div>
        ) : (
          <div>
            <p>Tên: {paymentInfo.name}</p>
            <p>STK: {paymentInfo.number}</p>
            <p>Ngân Hàng: {paymentInfo.bank}</p>
            <button onClick={handleEditPaymentInfo}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
