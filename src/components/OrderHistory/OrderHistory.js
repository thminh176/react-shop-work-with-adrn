import React, { useEffect, useState } from "react";
import { fetchOrders, deleteOrder } from "../api"; // Cập nhật đường dẫn nếu cần
import "./OrderHistory.scss";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
    };
    getOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div className="order-history">
      <h1>Lịch sử xuất, nhập kho</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>
              <strong>ID:</strong> {order.id}
            </div>
            <div>
              <strong>Tổng giá:</strong>{" "}
              {order.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div>
              <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
            </div>
            <div>
              <strong>Ngày:</strong>{" "}
              {new Date(order.date).toLocaleString("vi-VN")}
            </div>

            {/* Hiển thị sản phẩm */}
            <div className="order-products">
              <strong>Sản phẩm:</strong>
              <ul>
                {/* Kiểm tra nếu products tồn tại và là mảng */}
                {Array.isArray(order.products) && order.products.length > 0 ? (
                  order.products.map((product) => (
                    <li key={product.id}>
                      <div>
                        <strong>Tên:</strong> {product.name}
                      </div>
                      <div>
                        <strong>Giá:</strong>{" "}
                        {product.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </div>
                      <div>
                        <strong>Số lượng:</strong> {product.quantity}
                      </div>
                      <div>
                        <strong>Kệ:</strong> {product.shelfId}{" "}
                        {/* Hoặc thêm thông tin khác về kệ nếu có */}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>Không có sản phẩm nào trong đơn hàng.</li> // Hiển thị nếu không có sản phẩm
                )}
              </ul>
            </div>

            <button onClick={() => handleDeleteOrder(order.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
