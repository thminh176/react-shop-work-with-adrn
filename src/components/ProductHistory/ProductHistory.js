import React, { useEffect, useState } from "react";
import { fetchData } from "../api";
import './ProductHistory.scss'

const ProductHistory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchData();
      setProducts(data.editHistory);
    };
    getProducts();
  }, []);

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Lịch sử xuất nhập kho</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.productId} - Đã chỉnh sửa lần cuối: {product.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductHistory;
