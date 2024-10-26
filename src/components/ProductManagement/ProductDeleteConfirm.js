import React from "react";
import "./ProductDeleteConfirm.scss";

const ProductDeleteConfirm = ({ isOpen, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Xóa
          </button>
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDeleteConfirm;
