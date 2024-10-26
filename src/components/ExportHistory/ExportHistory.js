import React, { useEffect, useState } from "react";
import { fetchExportHistory, deleteExportHistory } from "../api";
import "jspdf-autotable";
import * as XLSX from "xlsx";
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
      const filtered = exportHistory.filter(
        (entry) =>
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
    setExportHistory((prev) => prev.filter((entry) => entry.id !== exportId));
    setFilteredHistory((prev) => prev.filter((entry) => entry.id !== exportId));
  };

  // Hàm xuất dữ liệu dưới dạng PDF

  // Hàm xuất dữ liệu dưới dạng Excel
  const downloadExcel = () => {
    const worksheetData = filteredHistory.map((entry) => ({
      ID: entry.id,
      "Tổng giá": entry.totalPrice,
      "Phương thức": entry.paymentMethod,
      Ngày: new Date(entry.date).toLocaleString("vi-VN"),
      "Sản phẩm": entry.products
        .map((product) => `${product.name} (x${product.quantity})`)
        .join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lịch sử xuất kho");

    XLSX.writeFile(workbook, "export-history.xlsx");
  };

  return (
    <div className="export-history">
      <h1>Lịch sử xuất kho</h1>

      <div className="date-filter">
        <input type="date" value={filterDate} onChange={handleFilterChange} />
        <button onClick={resetFilter}>Reset</button>
        <button onClick={downloadExcel}>Tải Excel</button>
      </div>

      <ul>
        {filteredHistory.map((exportEntry) => (
          <li key={exportEntry.id}>
            <div>
              <strong>ID:</strong> {exportEntry.id}
            </div>
            <div>
              <strong>Tổng giá:</strong>{" "}
              {exportEntry.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div>
              <strong>Phương thức thanh toán:</strong>{" "}
              {exportEntry.paymentMethod}
            </div>
            <div>
              <strong>Ngày:</strong>{" "}
              {new Date(exportEntry.date).toLocaleString("vi-VN")}
            </div>
            <div className="export-products">
              <strong>Sản phẩm:</strong>
              <ul>
                {exportEntry.products.map((product) => (
                  <li key={product.id}>
                    <div>
                      <strong>Tên:</strong> {product.name}
                    </div>
                    <div>
                      <strong>Giá:</strong>{" "}
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div>
                      <strong>Số lượng:</strong> {product.quantity}
                    </div>
                    <div>
                      <strong>Kệ:</strong> {product.shelfId || "Chưa xác định"}
                    </div>
                  </li>
                ))}
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
