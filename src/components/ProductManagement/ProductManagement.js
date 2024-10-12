import React, { useState, useEffect } from "react";
import { fetchData, updateProduct, deleteProduct } from "../api"; // Điều chỉnh đường dẫn nếu cần

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data.products);
    };
    getProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async () => {
    await updateProduct(editingProduct);
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id ? editingProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null); // Đóng form chỉnh sửa sau khi lưu
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

  return (
    <div className="product-management">
      <h1>Quản lý sản phẩm</h1>

      {/* List of Products */}
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Hình ảnh</th>
            <th>Kệ hàng</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>{`Kệ Số ${product.shelfId}`}</td>{" "}
              {/* Hiển thị thông tin kệ hàng */}
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

      {/* Edit Form */}
      {editingProduct && (
        <div className="edit-form">
          <h2>Chỉnh sửa sản phẩm</h2>
          <form>
            <label>
              Tên sản phẩm:
              <input
                type="text"
                name="name"
                value={editingProduct.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Giá:
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={handleChange}
              />
            </label>
            <label>
              Mô tả:
              <textarea
                name="description"
                value={editingProduct.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Hình ảnh URL:
              <input
                type="text"
                name="image"
                value={editingProduct.image}
                onChange={handleChange}
              />
            </label>
            <label>
              Kệ hàng:
              <select
                name="shelfId"
                value={editingProduct.shelfId}
                onChange={handleChange}
              >
                {/* Giả định bạn có từ 1 đến 18 kệ hàng */}
                {Array.from({ length: 18 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Kệ Số {index + 1}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={handleSave}>
              Lưu
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
