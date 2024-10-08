import React, { useEffect, useState } from "react";
import "./Admin.scss";
import Loading from "../components/Loading/Loading"; // Import Loading component

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Lấy danh sách sản phẩm và đơn hàng từ json-server
  const fetchData = async () => {
    try {
      const productResponse = await fetch("http://localhost:3001/products");
      const orderResponse = await fetch("http://localhost:3001/orders");

      if (!productResponse.ok || !orderResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const productsData = await productResponse.json();
      const ordersData = await orderResponse.json();

      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Đặt loading thành false khi hoàn tất fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveProduct = async () => {
    try {
      if (isEditing) {
        await fetch(`http://localhost:3001/products/${editProductId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
      } else {
        await fetch("http://localhost:3001/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
      }
      setNewProduct({ name: "", price: "", image: "" });
      setIsEditing(false);
      setEditProductId(null);
      fetchData();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  return (
    <div className="admin">
      {loading ? ( // Hiển thị loading khi fetching dữ liệu
        <Loading />
      ) : (
        <>
          <h1>Quản Trị</h1>

          <h2>Danh Sách Sản Phẩm</h2>
          <table>
            <thead>
              <tr>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Hình Ảnh</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4">Không có sản phẩm nào</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price} VND</td>
                    <td>
                      <img src={product.image} alt={product.name} width="50" />
                    </td>
                    <td>
                      <button onClick={() => handleEditProduct(product)}>
                        Sửa
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <h2>{isEditing ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</h2>
          <input
            type="text"
            placeholder="Tên Sản Phẩm"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Giá"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="URL Hình Ảnh"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <button onClick={handleSaveProduct}>
            {isEditing ? "Cập Nhật" : "Thêm"}
          </button>

          <h2>Danh Sách Đơn Hàng</h2>
          <table>
            <thead>
              <tr>
                <th>ID Đơn Hàng</th>
                <th>Sản Phẩm</th>
                <th>Tổng Giá</th>
                <th>Phương Thức Thanh Toán</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.cartItems.map((item) => item.name).join(", ")}</td>
                  <td>{order.totalPrice} VND</td>
                  <td>{order.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Admin;
