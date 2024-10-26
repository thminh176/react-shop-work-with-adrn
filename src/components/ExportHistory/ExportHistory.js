import React, { useEffect, useState } from "react";
import { fetchExportHistory, deleteExportHistory } from "../api";
import "./ExportHistory.scss";
const ExportHistory = () => {
  const [exportHistory, setExportHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const getExportHistory = async () => {
      const exportHistoryData = await fetchExportHistory();
      setExportHistory(exportHistoryData);
      setFilteredHistory(exportHistoryData);
    };
    getExportHistory();
  }, []);
  const handleFilterChange = (event) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      const filtered = exportHistory.filter((entry) =>
        new Date(entry.date).toLocaleDateString("vi-VN") ===
        new Date(selectedDate).toLocaleDateString("vi-VN")
      );
      setFilteredHistory(filtered);
    } else {
      setFilteredHistory(exportHistory);
    }
  };
  const resetFilter = () => {
    setFilterDate("");
    setFilteredHistory(exportHistory);
  };

  const handleDeleteExport = async (exportId) => {
    await deleteExportHistory(exportId);
    setExportHistory((prevExportHistory) =>
      prevExportHistory.filter((exportEntry) => exportEntry.id !== exportId)
    );
    setFilteredHistory((prevFilteredHistory) =>
      prevFilteredHistory.filter((exportEntry) => exportEntry.id !== exportId)
    );
  };

  return (
    <div className="export-history">
      <h1>Lịch sử xuất kho</h1>
      <div className="date-filter">
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterChange}
        />
        <button onClick={resetFilter}>Reset</button>
      </div>
      <ul>
        {filteredHistory.map((exportEntry) => (
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
                  <li>Không có sản phẩm nào trong đơn hàng.</li>
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
