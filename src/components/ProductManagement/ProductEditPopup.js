import React from "react";
import "./ProductEditPopup.scss"; // File SCSS cho modal

const ProductEditPopup = ({ product, isOpen, onClose, onSave, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product?.name ? "Chỉnh sửa sản phẩm" : "Khai báo sản phẩm"}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form>
            <label>
              Tên sản phẩm:
              <input
                type="text"
                name="name"
                value={product?.name || ""}
                onChange={onChange}
                required={!product?.name} // Yêu cầu nếu chưa có tên sản phẩm
              />
            </label>
            <label>
              Giá:
              <input
                type="number"
                name="price"
                value={product?.price || ""}
                onChange={onChange}
                required={!product?.price} // Yêu cầu nếu chưa có giá
              />
            </label>
            <label>
              Mô tả:
              <textarea
                name="description"
                value={product?.description || ""}
                onChange={onChange}
                required={!product?.description} // Yêu cầu nếu chưa có mô tả
              />
            </label>
            <label>
              Hình ảnh URL:
              <input
                type="text"
                name="image"
                value={product?.image || ""}
                onChange={onChange}
                required={!product?.image} // Yêu cầu nếu chưa có hình ảnh
              />
            </label>
            <label>
              Kệ hàng:
              <select
                name="shelfId"
                value={product?.shelfId || ""}
                onChange={onChange}
                required={!product?.shelfId} // Yêu cầu nếu chưa có kệ hàng
              >
                <option value="">Chọn kệ</option>
                {Array.from({ length: 18 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Kệ Số {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Barcode:
              <input
                type="text"
                name="barcode"
                value={product?.barcode || ""}
                onChange={onChange}
                required={!product?.barcode} // Yêu cầu nếu chưa có barcode
              />
            </label>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={onSave}>Lưu</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPopup;
