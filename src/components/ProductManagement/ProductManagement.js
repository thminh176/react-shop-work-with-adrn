import React, { useState, useEffect } from "react";
import { fetchData, fetchShelves, updateProduct, deleteProduct } from "../api";
import ProductEditPopup from "./ProductEditPopup";
import Barcode from "react-barcode";
import ProductDeleteConfirm from "./ProductDeleteConfirm"; // Import modal xác nhận
import "./ProductManagement.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [shelfMapping, setShelfMapping] = useState({});
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const getProductsAndShelves = async () => {
      const productData = await fetchData();
      const shelfData = await fetchShelves();
      setProducts(productData.products);

      const mapping = {};
      shelfData.forEach((shelf) => {
        if (!mapping[shelf.productId]) {
          mapping[shelf.productId] = [];
        }
        mapping[shelf.productId].push(shelf.name);
      });
      setShelfMapping(mapping);
    };
    getProductsAndShelves();
  }, []);

  const getShelfNames = (productId) => {
    const shelfNames = shelfMapping[productId];
    return shelfNames ? shelfNames.join(", ") : "Không xác định";
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

  const handleDelete = (productId) => {
    setProductToDelete(productId);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete);
      setProducts(products.filter((product) => product.id !== productToDelete));
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
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
      product.name &&
      product.price !== undefined &&
      product.description
  );

  const isExpired = (expiredDate) => {
    const today = new Date();
    return new Date(expiredDate) < today;
  };

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
            <th>Hạn sử dụng</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {registeredProducts.map((product) => (
            <tr
              key={product.id}
              className={isExpired(product.expiredDate) ? "expired" : ""}
            >
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>{getShelfNames(product.id)}</td>
              <td>
                <Barcode className="barcode" value={product.barcode} />
              </td>
              <td>{product.expiredDate || "Không có"}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(product)}>
                  Chỉnh Sửa
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
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
            <tr key={product.id} className="unregistered">
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

      <ProductDeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductManagement;