import "./MoveProductPopup.scss";
import React, { useState } from "react";

const MoveProductPopup = ({ product, shelves, onClose, onMove, isOpen }) => {
  const [newShelfId, setNewShelfId] = useState(null);

  // Tìm kệ hiện tại của sản phẩm
  const currentShelf = shelves.find((shelf) => shelf.productId === product?.id);
  // Lấy danh sách các kệ có thể sử dụng
  const availableShelves = shelves.filter((shelf) => !shelf.productId);

  const handleMove = () => {
    if (newShelfId) {
      if (currentShelf) {
        onMove(currentShelf.id, newShelfId);
        alert(`Sản phẩm đã được di chuyển thành công!`);
      } else {
        alert("Không tìm thấy kệ hiện tại cho sản phẩm này.");
      }
    } else {
      alert("Vui lòng chọn kệ mới để di chuyển.");
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Di chuyển sản phẩm: {product.name}</h2>

        {currentShelf ? (
          <div>
            <p>Kệ hiện tại: {currentShelf.name}</p>
            <p>
              Vị trí (x, y, z): ({currentShelf.position.x},{" "}
              {currentShelf.position.y}, {currentShelf.position.z})
            </p>
          </div>
        ) : (
          <p>Sản phẩm này chưa được đặt vào kệ nào.</p>
        )}

        <div>
          <label>Chọn kệ mới:</label>
          <select
            value={newShelfId || ""}
            onChange={(e) => setNewShelfId(Number(e.target.value))}
          >
            <option value="">-- Chọn kệ --</option>
            {availableShelves.map((shelf) => (
              <option key={shelf.id} value={shelf.id}>
                {shelf.name} - Vị trí: ({shelf.position.x}, {shelf.position.y},{" "}
                {shelf.position.z})
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleMove}>Di chuyển</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default MoveProductPopup;
