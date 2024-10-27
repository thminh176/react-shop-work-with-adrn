import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { getPaymentInfo, addExportHistory, fetchShelves } from "../api";
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
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isCartPromptOpen, setIsCartPromptOpen] = useState(false);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const data = await getPaymentInfo();
      setPaymentInfo(data);
    };

    fetchPaymentInfo();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirmPayment = async () => {
    if (totalPrice === 0) {
      setIsCartPromptOpen(true);
      return;
    }
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán");
      return;
    }

    const shelves = await fetchShelves();

    const orderHistory = {
      id: Date.now(),
      totalPrice,
      paymentMethod,
      date: new Date().toISOString(),
      products: cartItems.map((item) => {
        const shelf = shelves.find((shelf) => shelf.productId === item.id);
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          shelfId: shelf ? shelf.id : null,
          shelfPosition: shelf.position,
        };
        
      }),
    };
        
    const response = await addExportHistory(orderHistory);

    if (response) {
      onConfirm(paymentMethod);
    }
  };

  const bankReciverName = paymentInfo.name;
  const bankNumber = paymentInfo.number;
  const amount = totalPrice;
  const qrCodeUrl = `https://img.vietqr.io/image/mbbank-${bankNumber}-compact.png?amount=${amount}`;

  const handleClose = () => {
    onClose();
    setPaymentMethod("");
    setQrCode(null);
  };

  const handleCloseCartPrompt = () => {
    setIsCartPromptOpen(false);
  };

  const formattedTotalPrice = amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
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
            <p>Ngân Hàng: {paymentInfo.bank || "MB Bank"}</p>
            <p>Số Tài Khoản: {bankNumber}</p>
            <p>Tên Người Thụ Hưởng: {bankReciverName}</p>
            <p>Số Tiền: {formattedTotalPrice}</p>
          </div>
        )}

        <div className="payment-actions">
          <button onClick={handleClose}>Đóng</button>
          <button onClick={handleConfirmPayment}>Xác Nhận Đã Thanh Toán</button>
        </div>
      </Modal>
      <Modal
        isOpen={isCartPromptOpen}
        onRequestClose={handleCloseCartPrompt}
        contentLabel="Cart Prompt"
        className="cart-prompt"
        overlayClassName="payment-overlay"
      >
        <div className="cart-prompt-content">
          <h3>Giỏ hàng trống</h3>
          <p>Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
          <button onClick={handleCloseCartPrompt}>OK</button>
        </div>
      </Modal>
    </>
  );
};

export default PaymentModal;
