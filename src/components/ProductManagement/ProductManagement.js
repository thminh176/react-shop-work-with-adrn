import React, { useState, useEffect } from "react";
import {
  fetchData,
  fetchShelves,
  updateProduct,
  deleteProduct,
  updateShelf,
} from "../api";
import ProductEditPopup from "./ProductEditPopup";
import Barcode from "react-barcode";
import MoveProductPopup from "./MoveProductPopup";
import "./ProductManagement.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]); // Store shelf data
  const [editingProduct, setEditingProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shelfMapping, setShelfMapping] = useState({});
  const [isMovePopupOpen, setIsMovePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products and shelves on component mount
  useEffect(() => {
    const getProductsAndShelves = async () => {
      const productData = await fetchData();
      const shelfData = await fetchShelves(); // Fetch shelves

      setProducts(productData.products);
      setShelves(shelfData);

      // Create a mapping of productId to shelf names (array)
      const shelfMapping = {};
      shelfData.forEach((shelf) => {
        if (!shelfMapping[shelf.productId]) {
          shelfMapping[shelf.productId] = [];
        }
        shelfMapping[shelf.productId].push(shelf.name); // Thêm tên kệ vào mảng
      });
      setShelfMapping(shelfMapping);
    };
    getProductsAndShelves();
  }, []);
  const handleMove = async (oldShelfId, newShelfId) => {
    try {
      // Cập nhật kệ trong state
      const updatedShelves = shelves.map((shelf) => {
        // Xóa productId khỏi kệ cũ
        if (shelf.id === oldShelfId) return { ...shelf, productId: null };
        // Thêm productId vào kệ mới
        if (shelf.id === newShelfId)
          return { ...shelf, productId: selectedProduct.id };
        return shelf;
      });

      // Cập nhật dữ liệu shelves trong state
      setShelves(updatedShelves);

      // Cập nhật API với kệ mới
      await updateShelf(oldShelfId, null); // Cập nhật kệ cũ
      await updateShelf(newShelfId, selectedProduct.id); // Cập nhật kệ mới

      alert("Sản phẩm đã được di chuyển thành công!");
    } catch (error) {
      console.error("Error moving product:", error);
      alert("Đã xảy ra lỗi khi di chuyển sản phẩm.");
    }
  };

  const openMovePopup = (product) => {
    if (product) {
      const currentShelf = shelves.find(
        (shelf) => shelf.productId === product.id
      );
      if (currentShelf) {
        setSelectedProduct(product);
        setIsMovePopupOpen(true);
      } else {
        alert("Sản phẩm không có kệ nào để di chuyển.");
      }
    }
  };

  // Get shelf names by ID
  const getShelfNames = (productId) => {
    const shelfNames = shelfMapping[productId];
    return shelfNames ? shelfNames.join(", ") : "Không xác định"; // Trả về danh sách tên kệ
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsPopupOpen(true);
  };

  const handleSave = async () => {
    await updateProduct(editingProduct);
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?"
    );
    if (confirmDelete) {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const unregisteredProducts = products.filter(
    (product) =>
      !product.name ||
      product.price === undefined ||
      !product.description ||
      !product.image
  );

  const registeredProducts = products.filter(
    (product) =>
      shelves.some((shelf) => shelf.productId === product.id) && // Check if product is in shelves
      product.name &&
      product.price !== undefined &&
      product.description &&
      product.image
  );

  return (
    <div className="product-management">
      <h1>Quản lý sản phẩm</h1>

      <h2>Sản phẩm đã khai báo thông tin</h2>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Kệ hàng</th>
            <th>Barcode</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
            <th>Di chuyển</th>
          </tr>
        </thead>
        <tbody>
          {registeredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>{getShelfNames(product.id)}</td>{" "}
              {/* Hiển thị tất cả tên kệ */}
              <td>
                <Barcode value={product.barcode} />
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Chỉnh sửa</button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Xóa</button>
              </td>
              <td>
                <button onClick={() => openMovePopup(product)}>
                  Di chuyển
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Sản phẩm chưa khai báo thông tin</h2>
      <table>
        <thead>
          <tr>
            <th>ID sản phẩm</th>
            <th>Barcode</th>
            <th>Khai báo</th>
          </tr>
        </thead>
        <tbody>
          {unregisteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Barcode className="barcode" value={product.barcode} />
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Khai báo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ProductEditPopup
        product={editingProduct}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
        onChange={handleChange}
      />
      <MoveProductPopup
        product={selectedProduct}
        shelves={shelves}
        isOpen={isMovePopupOpen}
        onClose={() => setIsMovePopupOpen(false)}
        onMove={handleMove}
      />
    </div>
  );
};

export default ProductManagement;
