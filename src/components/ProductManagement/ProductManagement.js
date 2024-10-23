import React, { useState, useEffect } from "react";
import { fetchData, fetchShelves, updateProduct, deleteProduct } from "../api";
import ProductEditPopup from "./ProductEditPopup";
import Barcode from "react-barcode";

import "./ProductManagement.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [shelves, setShelves] = useState([]); // Store shelf data
  const [editingProduct, setEditingProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shelfMapping, setShelfMapping] = useState({});

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
    </div>
  );
};

export default ProductManagement;
