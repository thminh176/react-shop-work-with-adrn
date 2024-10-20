import React, { useState } from "react";
import Modal from "react-modal";
import { addOrderHistory } from "../api"; // Import API function
import "./PaymentModal.scss";

Modal.setAppElement("#root");

const PaymentModal = ({
  isOpen,
  onClose,
  onConfirm,
  totalPrice,
  cartItems,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      alert("Please choose a payment method");
      return;
    }

    // Add order history after confirmation
    const orderHistory = {
      id: Date.now(), // Unique ID for the order
      totalPrice,
      paymentMethod,
      date: new Date().toISOString(),
      products: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        shelfId: item.shelfId, // Thêm thông tin về kệ
      })),
    };

    await addOrderHistory(orderHistory); // Add history to orders

    onConfirm(paymentMethod); // Call onConfirm function
  };

  const bankNumber = "666617678888";
  const amount = totalPrice;
  const qrCodeUrl = `https://img.vietqr.io/image/mbbank-${bankNumber}-compact.png?amount=${amount}`;

  const handleClose = () => {
    onClose();
    setPaymentMethod("");
    setQrCode(null);
  };

  const formattedTotalPrice = amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
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
              setQrCode(null);
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
              setQrCode(qrCodeUrl);
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
