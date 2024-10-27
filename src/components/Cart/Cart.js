import React, { useState } from "react";
import "./Cart.scss";
import PaymentModal from "../PaymentModal/PaymentModal";

const Cart = ({ cartItems, removeFromCart, setCartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clearCart = () => {
    setCartItems([]); // Xóa toàn bộ giỏ hàng
  };

  const confirmPayment = () => {
    // Thực hiện xác nhận thanh toán

    clearCart(); // Xóa giỏ hàng sau khi in hóa đơn

    closeModal();
  };

  const openBillWindow = (cartItems, totalPrice, paymentMethod) => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Hóa Đơn</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; }
            .bill {
              max-width: 400px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #fff;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;
            }
            h2 { text-align: center; font-size: 24px; margin-bottom: 20px; color: #333; }
            table { width: 100%; border-collapse: collapse; font-size: 16px; margin-bottom: 15px; }
            th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
            th { font-weight: bold; color: #555; }
            .total { font-weight: bold; font-size: 18px; color: #d9534f; }
            .thank-you { text-align: center; margin-top: 20px; font-size: 18px; font-weight: bold; color: #5cb85c; }
          </style>
        </head>
        <body>
          <div class="bill">
            <h2>Hóa Đơn Mua Hàng</h2>
            <table>
              <tr>
                <th>Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Thành Tiền</th>
              </tr>
              ${cartItems
                .map(
                  (item) =>
                    `<tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${Number(item.price).toLocaleString("vi-VN")} VND</td>
                      <td>${(item.quantity * item.price).toLocaleString("vi-VN")} VND</td>
                    </tr>`
                )
                .join("")}
            </table>
            <p class="total">Tổng Tiền: ${Number(totalPrice).toLocaleString("vi-VN")} VND</p>
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
    </div>
  );
};

export default Cart;
