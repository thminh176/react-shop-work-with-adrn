import React, { useState } from "react";
import "./Cart.scss";
import PaymentModal from "../PaymentModal/PaymentModal";
import Loading from "../Loading/Loading";
import { addExportHistory } from "../api"; // Đảm bảo import đúng hàm

const Cart = ({ cartItems, removeFromCart, setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearCart = () => {
    setCartItems([]); // Xóa toàn bộ giỏ hàng
  };

  const confirmPayment = async (method) => {
    // Thực hiện xác nhận thanh toán
    try {
      await addExportHistory({
        // Thông tin xuất kho cần thêm (có thể thêm ở đây)
      });
      clearCart(); // Xóa giỏ hàng sau khi in hóa đơn
    } catch (error) {
      console.error("Lỗi khi thêm lịch sử xuất kho:", error);
    } finally {
      closeModal();
    }
  };

  const openBillWindow = (cartItems, totalPrice, paymentMethod) => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(` 
      <html>
        <head>
          <title>Hóa Đơn</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .bill { max-width: 300px; margin: 0 auto; padding: 10px; border: 1px solid #000; }
            h2 { text-align: center; font-size: 18px; margin-bottom: 10px; }
            ul { list-style: none; padding: 0; font-size: 14px; }
            ul li { margin-bottom: 5px; }
            p { margin: 5px 0; font-size: 14px; }
            .thank-you { text-align: center; margin-top: 15px; font-size: 16px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="bill">
            <h2>Hóa Đơn</h2>
            <ul>
              ${cartItems
                .map(
                  (item) =>
                    `<li>${item.name} - ${item.quantity} ${Number(
                      item.price
                    ).toLocaleString("vi-VN")} VND</li>`
                )
                .join("")}
            </ul>
            <p>Tổng Tiền: ${Number(totalPrice).toLocaleString("vi-VN")} VND</p>
            <p>Phương Thức Thanh Toán: ${
              paymentMethod === "cash" ? "Tiền Mặt" : "Chuyển Khoản"
            }</p>
            <p class="thank-you">Cảm ơn bạn đã mua sắm!</p>
          </div>
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
  };

  const formattedTotalPrice = totalPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="cart">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>Giỏ Hàng</h2>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <span className="item-quantity">{item.quantity}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    {item.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                  {/* Nút xóa sản phẩm khỏi giỏ hàng */}
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                    title="Xóa khỏi giỏ hàng"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="total-cash">Tổng Tiền: {formattedTotalPrice}</p>
          <button className="checkout-btn" onClick={openModal}>
            Thanh Toán
          </button>
          <PaymentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={async (method) => {
              openBillWindow(cartItems, totalPrice, method); // Gọi hàm in hóa đơn
              await confirmPayment(method); // Gọi confirmPayment với await
            }}
            totalPrice={totalPrice}
            cartItems={cartItems} // Truyền cartItems
          />
        </>
      )}
    </div>
  );
};

export default Cart;
