import React, { useEffect, useState } from "react";
import { fetchOrders, addOrder, deleteOrder } from "../api"; // Cập nhật đường dẫn nếu cần

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    userId: "",
    productId: "",
    amount: 0,
  });

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders();
      setOrders(ordersData);
    };
    getOrders();
  }, []);

  const handleAddOrder = async () => {
    const orderId = orders.length
      ? Math.max(orders.map((order) => order.id)) + 1
      : 1; // Tạo ID mới
    const addedOrder = await addOrder({ id: orderId, ...newOrder });
    setOrders((prevOrders) => [...prevOrders, addedOrder.record]);
    setNewOrder({ userId: "", productId: "", amount: 0 }); // Reset input
  };

  const handleDeleteOrder = async (orderId) => {
    await deleteOrder(orderId);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <div>
      <h1>Lịch sử đơn hàng</h1>
      <input
        type="text"
        placeholder="ID người dùng"
        value={newOrder.userId}
        onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
      />
      <input
        type="text"
        placeholder="ID sản phẩm"
        value={newOrder.productId}
        onChange={(e) =>
          setNewOrder({ ...newOrder, productId: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={newOrder.amount}
        onChange={(e) =>
          setNewOrder({ ...newOrder, amount: parseInt(e.target.value) })
        }
      />
      <button onClick={handleAddOrder}>Thêm đơn hàng</button>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Người dùng ID: {order.userId}, Sản phẩm ID: {order.productId}, Số
            lượng: {order.amount}
            <button onClick={() => handleDeleteOrder(order.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
