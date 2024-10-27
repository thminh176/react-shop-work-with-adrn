import React from "react";
import "./ShelfEditModal.scss"; // Nhập file CSS tương ứng

const ShelfEditModal = ({
  selectedShelf,
  position,
  selectedProductId,
  onPositionChange,
  onProductChange,
  onUpdateShelf,
  onClose,
  products,
}) => {
  return (
    <div className={`edit-shelf-modal ${selectedShelf ? "active" : ""}`}>
      {selectedShelf ? (
        <>
          <h2>Chỉnh Sửa Kệ {selectedShelf.name}</h2>
          <label>
            X:
            <input
              type="number"
              name="x"
              value={position.x}
              onChange={onPositionChange}
            />
          </label>
          <label>
            Y:
            <input
              type="number"
              name="y"
              value={position.y}
              onChange={onPositionChange}
            />
          </label>
          <label>
            Z:
            <input
              type="number"
              name="z"
              value={position.z}
              onChange={onPositionChange}
            />
          </label>
          <label>
            Sản phẩm:
            <select value={selectedProductId || ""} onChange={onProductChange}>
              <option value="">Chọn sản phẩm...</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <button onClick={onUpdateShelf}>Cập Nhật</button>
          <button onClick={onClose}>Đóng</button>
        </>
      ) : (
        <p>Chọn một kệ hàng để chỉnh sửa...</p>
      )}
    </div>
  );
};

export default ShelfEditModal;
