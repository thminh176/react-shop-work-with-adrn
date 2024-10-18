import React, { useState } from "react";
import Modal from "react-modal";
import "./PaymentModal.scss";

Modal.setAppElement("#root");
const PaymentModal = ({ isOpen, onClose, onConfirm, totalPrice }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrCode, setQrCode] = useState(null); // State để quản lý mã QR

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      alert("Please choose a payment method");
      return;
    }
    onConfirm(paymentMethod); // Gọi hàm onConfirm để in hóa đơn sau khi xác nhận
  };

  const bankNumber = "666617678888"; // Số tài khoản
  const amount = totalPrice; // Tổng số tiền từ cart
  const qrCodeUrl = `https://img.vietqr.io/image/mbbank-${bankNumber}-compact.png?amount=${amount}`; // URL chứa tổng số tiền

  // Hàm đóng modal và reset QR code
  const handleClose = () => {
    onClose(); // Đóng modal
    setPaymentMethod(""); // Reset phương thức thanh toán
    setQrCode(null); // Reset mã QR
  };

  // Định dạng tổng tiền thành VND
  const formattedTotalPrice = amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose} // Đóng modal khi nhấn vào overlay
      contentLabel="Payment Modal"
      className="payment-modal"
      overlayClassName="payment-overlay"
    >
      <h2>Chọn Phương Thức Thanh Toán</h2>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            onChange={() => {
              handlePaymentMethodChange("cash");
              setQrCode(null); // Reset mã QR khi chọn tiền mặt
            }}
          />
          Tiền mặt
        </label>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="transfer"
            onChange={() => {
              handlePaymentMethodChange("transfer");
              setQrCode(qrCodeUrl); // Cập nhật mã QR khi chọn chuyển khoản
            }}
          />
          Chuyển khoản
        </label>
      </div>

      {paymentMethod === "transfer" && qrCode && (
        <div className="qr-code">
          <h3>Quét Mã QR Để Chuyển Tiền</h3>
          <img src={qrCode} alt="VietQR - MB Bank" />
          <p>Ngân Hàng: MB Bank</p>
          <p>Số Tài Khoản: {bankNumber}</p>
          <p>Số Tiền: {formattedTotalPrice}</p>
        </div>
      )}

      <div className="payment-actions">
        <button onClick={handleClose}>Đóng</button>
        <button onClick={handleConfirmPayment}>Xác Nhận Đã Thanh Toán</button>
      </div>
    </Modal>
  );
};

export default PaymentModal;
