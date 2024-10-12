import React, { useEffect, useState } from "react";
import "./Admin.scss";
import Loading from "../components/Loading/Loading"; // Import Loading component

const JSON_BIN_URL = "https://api.jsonbin.io/v3/b/670832e7e41b4d34e4408744"; // Đặt URL JSONBin

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editHistory, setEditHistory] = useState([]); // State để quản lý lịch sử chỉnh sửa
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading

  // Lấy danh sách sản phẩm và đơn hàng từ JSONBin
  const fetchData = async () => {
    try {
      const response = await fetch(JSON_BIN_URL, {
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Lấy phản hồi lỗi
        console.error("Error fetching data:", response.status, errorMessage);
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setProducts(data.record.products || []); // Cập nhật danh sách sản phẩm
      setEditHistory(data.record.editHistory || []); // Cập nhật lịch sử chỉnh sửa
      setOrders(data.record.orders || []); // Cập nhật danh sách đơn hàng
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Đặt loading thành false khi hoàn tất fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm lưu sản phẩm và ghi lại lịch sử
  const handleSaveProduct = async () => {
    try {
      const now = new Date().toISOString(); // Lấy thời gian hiện tại

      // Nếu đang chỉnh sửa sản phẩm
      if (isEditing) {
        const currentProduct = products.find((p) => p.id === editProductId);

        // So sánh và lưu những thay đổi
        const changes = {};
        for (const key in newProduct) {
          if (newProduct[key] !== currentProduct[key]) {
            changes[key] = newProduct[key];
          }
        }

        // Chỉ ghi lại lịch sử nếu có thay đổi
        if (Object.keys(changes).length > 0) {
          await fetch(`${JSON_BIN_URL}/products/${editProductId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key":
                "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
            },
            body: JSON.stringify(newProduct),
          });

          // Lưu lịch sử chỉnh sửa
          await fetch(`${JSON_BIN_URL}/editHistory`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key":
                "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
            },
            body: JSON.stringify({
              productId: editProductId,
              action: "Sửa",
              timestamp: now,
              changes, // Chỉ lưu những thay đổi
            }),
          });
        }
      } else {
        // Thêm sản phẩm mới
        const response = await fetch(`${JSON_BIN_URL}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
          },
          body: JSON.stringify(newProduct),
        });

        const addedProduct = await response.json();

        // Lưu lịch sử thêm sản phẩm
        await fetch(`${JSON_BIN_URL}/editHistory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key":
              "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
          },
          body: JSON.stringify({
            productId: addedProduct.id,
            action: "Thêm",
            timestamp: now,
            changes: newProduct, // Lưu tất cả giá trị mới cho sản phẩm mới
          }),
        });
      }
      setNewProduct({ name: "", price: "", image: "" });
      setIsEditing(false);
      setEditProductId(null);
      fetchData(); // Reload dữ liệu sau khi lưu
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Hàm xoá sản phẩm và ghi lại lịch sử
  const handleDeleteProduct = async (id) => {
    try {
      const now = new Date().toISOString(); // Lấy thời gian hiện tại

      await fetch(`${JSON_BIN_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "X-Master-Key":
            "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
        },
      });

      // Lưu lịch sử xoá sản phẩm
      await fetch(`${JSON_BIN_URL}/editHistory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key":
            "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS",
        },
        body: JSON.stringify({
          productId: id,
          action: "Xóa",
          timestamp: now,
        }),
      });

      fetchData(); // Reload dữ liệu sau khi xóa
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Hàm chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditProductId(product.id);
  };

  return (
    <div className="admin">
      {loading ? (
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

          <h2>Lịch Sử Chỉnh Sửa</h2>
          <table>
            <thead>
              <tr>
                <th>ID Sản Phẩm</th>
                <th>Hành Động</th>
                <th>Thời Gian</th>
                <th>Giá Trị Mới</th>
              </tr>
            </thead>
            <tbody>
              {editHistory.length === 0 ? (
                <tr>
                  <td colSpan="4">Không có lịch sử chỉnh sửa nào</td>
                </tr>
              ) : (
                editHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{history.productId || "Sản phẩm mới"}</td>
                    <td>{history.action}</td>
                    <td>{new Date(history.timestamp).toLocaleString()}</td>
                    <td>
                      {/* Chỉ hiển thị những trường đã thay đổi */}
                      {Object.entries(history.changes || {}).map(
                        ([key, value]) => (
                          <div key={key}>
                            <strong>{key}:</strong> {value}
                          </div>
                        )
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

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
                  <td>{order.productName}</td>
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
