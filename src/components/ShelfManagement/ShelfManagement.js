import React, { useState, useEffect } from "react";
import { fetchShelves, fetchProducts, updateShelf } from "../api"; // Import các hàm API
import "./ShelfManagement.scss"; // Import SCSS

const ShelfManagement = () => {
  const [shelves, setShelves] = useState([]);
  const [products, setProducts] = useState([]); // Thêm state cho sản phẩm
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const pinCode = () => {
    var pin = prompt("nhập mã pin");

    return pin;
  };
  useEffect(() => {
    const loadShelvesAndProducts = async () => {
      const shelvesData = await fetchShelves();
      const productsData = await fetchProducts(); // Lấy sản phẩm
      setShelves(shelvesData);
      setProducts(productsData); // Lưu trữ sản phẩm
    };
    loadShelvesAndProducts();
  }, []);

  const handleShelfClick = (shelf) => {
    setSelectedShelf(shelf);
    setPosition({
      x: shelf.position.x,
      y: shelf.position.y,
      z: shelf.position.z,
    });
  };

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateShelf = async () => {
    if (pinCode().toString() === "6789") {
      if (selectedShelf) {
        const updatedShelf = { ...selectedShelf, position };
        await updateShelf(updatedShelf);
        setShelves((prev) =>
          prev.map((shelf) =>
            shelf.id === updatedShelf.id ? updatedShelf : shelf
          )
        );
        setSelectedShelf(null);
        alert("Done");
      }
    } else {
      alert("Sai Mã Pin");
    }
  };

  const handleCloseEditShelf = () => {
    setSelectedShelf(null);
  };

  // Phân chia kệ hàng thành hai nhóm: 1-9 và 10-18
  const leftShelves = shelves.slice(0, 9); // Kệ 1-9
  const rightShelves = shelves.slice(9, 18); // Kệ 10-18

  return (
    <div className="shelf-management">
      <h1>Quản Lý Kệ Hàng</h1>
      <div className="shelf-container">
        {/* Bên trái */}
        <div className="left-shelves">
          <h2>Kệ 1 đến 9</h2>
          {/* Chia thành các hàng nhỏ */}
          {[0, 1, 2].map((row) => (
            <div className="shelf-row" key={row}>
              {leftShelves.slice(row * 3, row * 3 + 3).map((shelf) => (
                <div
                  key={shelf.id}
                  className="shelf"
                  onClick={() => handleShelfClick(shelf)}
                >
                  <h3>{shelf.name}</h3>
                  <p>
                    Vị trí: x: {shelf.position.x}, y: {shelf.position.y}, z:{" "}
                    {shelf.position.z}
                  </p>
                  <h4>Sản phẩm:</h4>
                  <ul>
                    {products
                      .filter((product) => product.shelfId === shelf.id)
                      .map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    {/* Hiển thị nếu không có sản phẩm */}
                    {products.filter((product) => product.shelfId === shelf.id)
                      .length === 0 && <li>Không có sản phẩm</li>}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bên phải - Kệ 10 đến 18 */}
        <div className="right-shelves">
          <h2>Kệ 10 đến 18</h2>
          {/* Chia thành các hàng nhỏ */}
          {[0, 1, 2].map((row) => (
            <div className="shelf-row" key={row}>
              {rightShelves.slice(row * 3, row * 3 + 3).map((shelf) => (
                <div
                  key={shelf.id}
                  className="shelf"
                  onClick={() => handleShelfClick(shelf)}
                >
                  <h3>{shelf.name}</h3>
                  <p>
                    Vị trí: x: {shelf.position.x}, y: {shelf.position.y}, z:{" "}
                    {shelf.position.z}
                  </p>
                  <h4>Sản phẩm:</h4>
                  <ul>
                    {products
                      .filter((product) => product.shelfId === shelf.id)
                      .map((product) => (
                        <li key={product.id}>{product.name}</li>
                      ))}
                    {/* Hiển thị nếu không có sản phẩm */}
                    {products.filter((product) => product.shelfId === shelf.id)
                      .length === 0 && <li>Không có sản phẩm</li>}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bên phải - Form cập nhật */}
        <div className={`edit-shelf ${selectedShelf ? "active" : ""}`}>
          {selectedShelf ? (
            <>
              <h2>Chỉnh Sửa Kệ {selectedShelf.name}</h2>
              <label>
                X:
                <input
                  type="number"
                  name="x"
                  value={position.x}
                  onChange={handlePositionChange}
                />
              </label>
              <label>
                Y:
                <input
                  type="number"
                  name="y"
                  value={position.y}
                  onChange={handlePositionChange}
                />
              </label>
              <label>
                Z:
                <input
                  type="number"
                  name="z"
                  value={position.z}
                  onChange={handlePositionChange}
                />
              </label>
              <button onClick={handleUpdateShelf}>Cập Nhật</button>
              <button onClick={handleCloseEditShelf}>Đóng</button>{" "}
              {/* Nút tắt form */}
            </>
          ) : (
            <p>Chọn một kệ hàng để chỉnh sửa...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelfManagement;
