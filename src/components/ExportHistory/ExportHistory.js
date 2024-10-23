import React, { useEffect, useState } from "react";
import { fetchExportHistory, deleteExportHistory } from "../api"; // Cập nhật đường dẫn nếu cần
import "./ExportHistory.scss";

const ExportHistory = () => {
  const [exportHistory, setExportHistory] = useState([]);

  useEffect(() => {
    const getExportHistory = async () => {
      const exportHistoryData = await fetchExportHistory();
      setExportHistory(exportHistoryData);
    };
    getExportHistory();
  }, []);

  const handleDeleteExport = async (exportId) => {
    await deleteExportHistory(exportId);
    setExportHistory((prevExportHistory) =>
      prevExportHistory.filter((exportEntry) => exportEntry.id !== exportId)
    );
  };

  return (
    <div className="export-history">
      <h1>Lịch sử xuất kho</h1>
      <ul>
        {exportHistory.map((exportEntry) => (
          <li key={exportEntry.id}>
            <div>
              <strong>ID:</strong> {exportEntry.id}
            </div>
            <div>
              <strong>Tổng giá:</strong>{" "}
              {exportEntry.totalPrice
                ? exportEntry.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : "Chưa xác định"}
            </div>
            <div>
              <strong>Phương thức thanh toán:</strong>{" "}
              {exportEntry.paymentMethod}
            </div>
            <div>
              <strong>Ngày:</strong>{" "}
              {exportEntry.date
                ? new Date(exportEntry.date).toLocaleString("vi-VN")
                : "Chưa xác định"}
            </div>

            {/* Hiển thị sản phẩm */}
            <div className="export-products">
              <strong>Sản phẩm:</strong>
              <ul>
                {/* Kiểm tra nếu products tồn tại và là mảng */}
                {Array.isArray(exportEntry.products) &&
                exportEntry.products.length > 0 ? (
                  exportEntry.products.map((product) => (
                    <li key={product.id}>
                      <div>
                        <strong>Tên:</strong> {product.name}
                      </div>
                      <div>
                        <strong>Giá:</strong>{" "}
                        {product.price
                          ? product.price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : "Chưa xác định"}
                      </div>
                      <div>
                        <strong>Số lượng:</strong> {product.quantity}
                      </div>
                      <div>
                        <strong>Kệ:</strong> {product.shelfId}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>Không có sản phẩm nào trong đơn hàng.</li> // Hiển thị nếu không có sản phẩm
                )}
              </ul>
            </div>

            <button onClick={() => handleDeleteExport(exportEntry.id)}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExportHistory;
