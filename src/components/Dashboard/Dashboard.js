import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6633",
  "#FF3399",
];

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  // Chuẩn bị dữ liệu cho biểu đồ số lượng sản phẩm theo kệ
  const productsByShelf = data.products.reduce((acc, product) => {
    const shelfId = product.shelfId;
    acc[shelfId] = (acc[shelfId] || 0) + 1; // Đếm số lượng sản phẩm trên mỗi kệ
    return acc;
  }, {});

  const shelfData = Object.keys(productsByShelf).map((shelfId) => ({
    name: `Kệ Số ${shelfId}`,
    count: productsByShelf[shelfId],
  }));

  // Chuẩn bị dữ liệu cho biểu đồ số lượng đơn hàng theo thời gian
  const ordersByDate = data.orders.reduce((acc, order) => {
    // Giả định rằng mỗi đơn hàng có timestamp
    const date = new Date(order.timestamp || order.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const ordersOverTime = Object.keys(ordersByDate).map((date) => ({
    date,
    count: ordersByDate[date],
  }));

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Tổng số sản phẩm: {data.products.length}</p>
      <p>Tổng số đơn hàng: {data.orders.length}</p>

      <div style={{ marginTop: "50px" }}>
        <h2>Số lượng sản phẩm theo kệ</h2>
        <BarChart width={600} height={300} data={shelfData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h2>Số lượng đơn hàng theo thời gian</h2>
        <LineChart width={600} height={300} data={ordersOverTime}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        </LineChart>
      </div>

      <div style={{ marginTop: "50px" }}>
        <h2>Tỷ lệ sản phẩm theo kệ (Biểu đồ tròn)</h2>
        <PieChart width={600} height={300}>
          <Pie
            data={shelfData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {shelfData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
