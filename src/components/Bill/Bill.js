import React, { useEffect } from "react";
import "./Bill.scss";

const Bill = ({ cartItems, totalPrice, paymentMethod, qrCodeUrl, bankNumber }) => {
  // In hóa đơn sau khi hiển thị
  useEffect(() => {
    window.print(); // Lệnh in bằng máy in nhiệt
  }, []);

  return (
    <div className="bill">
      <h2>Hóa Đơn</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {Number(item.price).toLocaleString("vi-VN")} VND
          </li>
        ))}
      </ul>
      <p>Tổng Tiền: {Number(totalPrice).toLocaleString("vi-VN")} VND</p>
      <p>Phương Thức Thanh Toán: {paymentMethod === "cash" ? "Tiền Mặt" : "Chuyển Khoản"}</p>

      {paymentMethod === "transfer" && (
        <div className="qr-code">
          <h3>Quét Mã QR Để Chuyển Tiền</h3>
          <img src={qrCodeUrl} alt="VietQR - MB Bank" />
          <p>Ngân hàng: MB Bank</p>
          <p>Số tài khoản: {bankNumber}</p>
          <p>Số Tiền: {Number(totalPrice).toLocaleString("vi-VN")} VND</p>
        </div>
      )}

      <p className="thank-you">Cảm ơn bạn đã mua sắm!</p>
    </div>
  );
};

export default Bill;
