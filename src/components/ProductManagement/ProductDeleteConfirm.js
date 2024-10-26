import React from "react";
import "./ProductDeleteConfirm.scss";

const ProductDeleteConfirm = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="product-delete-modal-overlay">
      <div className="product-delete-modal-content">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div className="product-delete-modal-actions">
          <button className="product-delete-confirm-button" onClick={onConfirm}>
            Xóa
          </button>
          <button className="product-delete-cancel-button" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteConfirm;
