import React, { useState } from "react";
import "./Cart.scss";
import PaymentModal from "../PaymentModal/PaymentModal";
import Bill from "../Bill/Bill";
import Loading from "../Loading/Loading"; // Thêm Loading component

const Cart = ({ cartItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false); // State để quản lý trạng thái loading

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity || 0),
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const confirmPayment = (method) => {
    setPaymentMethod(method);
    openBillWindow(cartItems, totalPrice, method);
    closeModal();
  };

  const openBillWindow = (cartItems, totalPrice, paymentMethod) => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    const billContent = (
      <Bill
        cartItems={cartItems}
        totalPrice={totalPrice}
        paymentMethod={paymentMethod}
      />
    );

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
            .qr-code { text-align: center; margin-top: 10px; }
            .qr-code img { max-width: 150px; }
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
                    `<li>${item.name} - ${item.quantity} x ${Number(
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
      {loading ? ( // Hiển thị loading nếu cần
        <Loading />
      ) : (
        <>
          <h2>Giỏ Hàng</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} -{" "}
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: {formattedTotalPrice}</p>
          <button onClick={openModal}>Thanh Toán</button>
          <PaymentModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={confirmPayment}
            totalPrice={totalPrice}
          />
        </>
      )}
    </div>
  );
};

export default Cart;
