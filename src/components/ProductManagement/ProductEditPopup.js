import React from "react";
import "./ProductEditPopup.scss"; // File SCSS cho modal

const ProductEditPopup = ({ product, isOpen, onClose, onSave, onChange }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    // Lấy productId từ sản phẩm
    const productId = product.id;

    // Cập nhật sản phẩm
    const updatedProductData = {
      productId: productId,
      // Không cập nhật kệ hàng nữa
    };

    onSave(updatedProductData); // Gọi onSave với dữ liệu sản phẩm mới
  };

  return (
    <div className="product-edit-modal-overlay">
      <div className="product-edit-modal-content">
        <div className="product-edit-modal-header">
          <h2>{product?.name ? "Chỉnh sửa sản phẩm" : "Khai báo sản phẩm"}</h2>
          <button className="product-edit-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="product-edit-modal-body">
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
                type="text"
                name="price"
                value={product?.price || ""}
                onChange={onChange}
                required={!product?.price} // Yêu cầu nếu chưa có giá
                pattern="^\d+(\.\d{1,2})?$" // Giới hạn để chỉ nhập số với tối đa 2 chữ số thập phân
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
              Barcode:
              <input
                type="text"
                name="barcode"
                value={product?.barcode || ""}
                onChange={onChange}
                required={!product?.barcode} // Yêu cầu nếu chưa có barcode
              />
            </label>
            {/* Phần chọn kệ hàng đã được loại bỏ */}
          </form>
        </div>
        <div className="product-edit-modal-footer">
          <button className="product-edit-save" onClick={handleSave}>
            Lưu
          </button>
          <button className="product-edit-cancel" onClick={onClose}>
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPopup;
