import React, { useState, useEffect } from "react";
import { fetchData, updateProduct, deleteProduct } from "../api";
import ProductEditPopup from "./ProductEditPopup"; // Import Popup
import Barcode from "react-barcode"; // Import barcode library

import "./ProductManagement.scss"; // File SCSS cho modal
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Quản lý trạng thái mở popup

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data.products);
    };
    getProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsPopupOpen(true); // Mở popup khi chỉnh sửa
  };

  const handleSave = async () => {
    await updateProduct(editingProduct);
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setIsPopupOpen(false); // Đóng popup sau khi lưu
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

  // Tách sản phẩm chưa khai báo thông tin
  const unregisteredProducts = products.filter(
    (product) =>
      !product.name ||
      !product.price ||
      !product.description ||
      !product.image ||
      !product.shelfId
  );
  const registeredProducts = products.filter(
    (product) =>
      product.name &&
      product.price &&
      product.description &&
      product.image &&
      product.shelfId
  );

  return (
    <div className="product-management">
      <h1>Quản lý sản phẩm</h1>

      {/* List of Registered Products */}
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
              <td>{`Kệ Số ${product.shelfId}`}</td>
              <td>
                <Barcode value={product.barcode} /> {/* Hiển thị mã vạch */}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Chỉnh sửa</button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* List of Unregistered Products */}
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
                <Barcode className="barcode" value={product.barcode} />{" "}
                {/* Hiển thị mã vạch */}
              </td>
              <td>
                <button onClick={() => handleEdit(product)}>Khai báo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      <ProductEditPopup
        product={editingProduct}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProductManagement;
