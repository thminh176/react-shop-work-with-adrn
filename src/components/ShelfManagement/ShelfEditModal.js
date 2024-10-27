import React, { useState } from "react";
import "./ShelfEditModal.scss";

const ShelfEditModal = ({
  selectedShelf,
  position,
  onPositionChange,
  onUpdateShelf,
  onClose,
}) => {
  const [pin, setPin] = useState("");
  const [isPinCorrect, setIsPinCorrect] = useState(false);

  const handlePinChange = (e) => {
    const inputPin = e.target.value;
    setPin(inputPin);
    setIsPinCorrect(inputPin === "6789");
  };

  return (
    <div className={`edit-shelf-modal ${selectedShelf ? "active" : ""}`}>
      {selectedShelf ? (
        <>
          <h2>Chỉnh Sửa Kệ {selectedShelf.name}</h2>
          {!isPinCorrect ? (
            <div className="input-group">
              <label>Nhập mã PIN:</label>
              <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                placeholder="Nhập mã PIN"
              />
            </div>
          ) : (
            <>
              <div className="input-group">
                <label>X:</label>
                <input
                  type="number"
                  name="x"
                  value={position.x}
                  onChange={onPositionChange}
                />
              </div>
              <div className="input-group">
                <label>Y:</label>
                <input
                  type="number"
                  name="y"
                  value={position.y}
                  onChange={onPositionChange}
                />
              </div>
              <div className="input-group">
                <label>Z:</label>
                <input
                  type="number"
                  name="z"
                  value={position.z}
                  onChange={onPositionChange}
                />
              </div>
              <button onClick={onUpdateShelf}>Cập Nhật</button>
            </>
          )}
          <button onClick={onClose}>Đóng</button>
        </>
      ) : (
        <p>Chọn một kệ hàng để chỉnh sửa...</p>
      )}
    </div>
  );
};

export default ShelfEditModal;
