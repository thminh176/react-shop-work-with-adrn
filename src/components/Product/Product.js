import React from "react";
import "./Product.scss";

const Product = ({ product, addToCart }) => {
  const formattedPrice = product.price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="product-item">
      <img src={product.image} alt={product.name} className="product-image" />{" "}
      <h3>{product.name}</h3>
      <p>Giá: {formattedPrice}</p>
      <button onClick={() => addToCart(product)}>Thêm Vào Giỏ Hàng</button>
    </div>
  );
};

export default Product;
