import React from "react";
import { IoCartOutline } from "react-icons/io5"; // Icon cho nút thêm vào giỏ hàng
import { IoTrashOutline } from "react-icons/io5"; // Icon cho nút xóa khỏi giỏ hàng
import "./ProductModal.scss"; // Thêm styles cho modal

const ProductModal = ({
  product,
  onClose,
  isInCart,
  addToCart,
  removeFromCart,
}) => {
  const handleOverlayClick = (e) => {
    // Kiểm tra nếu người dùng nhấn vào lớp overlay bên ngoài modal
    if (e.target.className === "product-modal-overlay") {
      onClose(); // Gọi hàm onClose để đóng modal
    }
  };

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal-content">
        {/* Nút đóng modal */}
        <span className="product-modal-close" onClick={onClose}>
          &times;
        </span>

        {/* Thông tin sản phẩm nằm ngang */}
        <div className="product-modal-details">
          <img
            src={product.image}
            alt={product.name}
            className="product-modal-image"
          />
          <div className="product-modal-info">
            <h2 className="product-modal-title">{product.name}</h2>
            <p className="product-modal-price">
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="product-modal-description">{product.description}</p>
          </div>
        </div>

        {/* Nút thêm và xóa sản phẩm dưới thông tin sản phẩm */}
        <div className="product-modal-actions">
          {isInCart ? (
            <>
              <button
                className="product-modal-button add"
                onClick={() => addToCart(product)}
              >
                <IoCartOutline className="icon" />
                Thêm Vào Giỏ Hàng
              </button>
              <button
                className="product-modal-button remove"
                onClick={() => removeFromCart(product.id)}
              >
                <IoTrashOutline className="icon" />
                Xóa Khỏi Giỏ Hàng
              </button>
            </>
          ) : (
            <button
              className="product-modal-button full-width"
              onClick={() => addToCart(product)}
            >
              <IoCartOutline className="icon" />
              Thêm Vào Giỏ Hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
