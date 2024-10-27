import React, { useState, useEffect } from "react";
import { fetchShelves, fetchProducts, updateShelf } from "../api"; // Import các hàm API
import "./ShelfManagement.scss"; // Import SCSS

const ShelfManagement = () => {
  const [shelves, setShelves] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedShelf, setSelectedShelf] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // Thêm state cho ID sản phẩm đang chọn
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const pinCode = () => {
    var pin = prompt("nhập mã pin");
    return pin;
  };

  useEffect(() => {
    const loadShelvesAndProducts = async () => {
      const shelvesData = await fetchShelves();
      const productsData = await fetchProducts();
      setShelves(shelvesData);
      setProducts(productsData);
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

    // Lấy ID sản phẩm tương ứng và đặt vào state
    setSelectedProductId(shelf.productId);
  };

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPosition((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value); // Cập nhật ID sản phẩm khi chọn từ dropdown
  };

  const handleUpdateShelf = async () => {
    if (pinCode().toString() === "6789") {
      if (selectedShelf) {
        const updatedShelf = {
          ...selectedShelf,
          position,
          productId: selectedProductId,
        }; // Cập nhật productId
        await updateShelf(updatedShelf);
        setShelves((prev) =>
          prev.map((shelf) =>
            shelf.id === updatedShelf.id ? updatedShelf : shelf
          )
        );
        setSelectedShelf(null);
        setSelectedProductId(null); // Reset ID sản phẩm
        alert("Done");
      }
    } else {
      alert("Sai Mã Pin");
    }
  };

  const handleCloseEditShelf = () => {
    setSelectedShelf(null);
    setSelectedProductId(null);
  };

  // Phân chia kệ hàng thành hai nhóm: 1-9 và 10-18
  const shelvesRegion1 = shelves.slice(0, 9);
  const shelvesRegion2 = shelves.slice(9, 18);

  return (
    <div className="shelf-management-section">
      <h2>Kệ Hàng</h2>
      <div className="shelves-container">
        <div className="shelves-region">
          <h3>Kệ Hàng 1</h3>
          <div className="shelves-grid">
            {shelvesRegion1.map((shelf) => (
              <div
                className="shelf-box"
                key={shelf.id}
                onClick={() => handleShelfClick(shelf)}
              >
                <p>
                  <strong>Ô Hàng:</strong> {shelf.id}
                </p>
                <p>
                  Vị trí: x: {shelf.position.x}, y: {shelf.position.y}
                </p>
                <p>
                  <strong>Sản Phẩm:</strong>{" "}
                  {products
                    .filter((productItem) => shelf.productId === productItem.id)
                    .map((product) => <p key={product.id}>{product.name}</p>)
                    .length === 0 ? (
                    <p>Không có sản phẩm</p>
                  ) : (
                    products
                      .filter(
                        (productItem) => shelf.productId === productItem.id
                      )
                      .map((product) => <p key={product.id}>{product.name}</p>)
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="shelves-region">
          <h3>Kệ Hàng 2</h3>
          <div className="shelves-grid">
            {shelvesRegion2.map((shelf) => (
              <div
                className="shelf-box"
                key={shelf.id}
                onClick={() => handleShelfClick(shelf)}
              >
                <p>
                  <strong>Ô Hàng:</strong> {shelf.id}
                </p>
                <p>
                  Vị trí: x: {shelf.position.x}, y: {shelf.position.y}
                </p>
                <p>
                  <strong>Sản Phẩm:</strong>{" "}
                  {products
                    .filter((productItem) => shelf.productId === productItem.id)
                    .map((product) => <p key={product.id}>{product.name}</p>)
                    .length === 0 ? (
                    <p>Không có sản phẩm</p>
                  ) : (
                    products
                      .filter(
                        (productItem) => shelf.productId === productItem.id
                      )
                      .map((product) => <p key={product.id}>{product.name}</p>)
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className={`edit-shelf ${selectedShelf ? "active" : ""}`}>
            {selectedShelf ? (
              <>
                <h2>Chỉnh Sửa {selectedShelf.name}</h2>
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
                <label>
                  Sản phẩm:
                  <select
                    value={selectedProductId || ""}
                    onChange={handleProductChange}
                  >
                    <option value="">Chọn sản phẩm...</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={handleUpdateShelf}>Cập Nhật</button>
                <button onClick={handleCloseEditShelf}>Đóng</button>
              </>
            ) : (
              <p>Chọn một kệ hàng để chỉnh sửa...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelfManagement;
