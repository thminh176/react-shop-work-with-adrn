import React, { useState } from "react";
import "./Product.scss";
import { IoCartOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5"; // Import icon cho nút xóa

const Product = ({ product, addToCart, removeFromCart, isInCart, openModal }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  if (!product.name || !product.price) {
    return null; // Nếu thiếu tên hoặc giá sản phẩm, không hiển thị gì
  }

  // Xử lý khi bấm vào nút "Thêm vào giỏ hàng"
  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true); // Bắt đầu hiệu ứng thêm vào giỏ hàng
    addToCart(product); // Thêm sản phẩm vào giỏ hàng

    // Đặt trạng thái lại sau khi hiệu ứng hoàn tất
    setTimeout(() => {
      setIsAdding(false);
      setIsRemoving(true); // Hiện nút xóa khi quá trình thêm hoàn tất
    }, 500); // Đồng bộ với thời gian của animation
  };

  // Xử lý khi bấm vào nút "Xóa khỏi giỏ hàng"
  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    setIsRemoving(false); // Bắt đầu hiệu ứng xóa khỏi giỏ hàng
    removeFromCart(product.id); // Xóa sản phẩm khỏi giỏ hàng
  };

  return (
    <div className="wrapper" onClick={() => openModal(product)}>
      <div className="container">
        <div className="top">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>
        <div className="bottom">
          <div className="info">
            <div className="details">
              <h1>{product.name}</h1>
              <p className="price">
                {Number(product.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div
            className={`buy ${isAdding ? "adding" : ""}`}
            onClick={handleAddToCart}
            title="Thêm vào giỏ hàng"
          >
            <IoCartOutline />
            <span>Thêm Vào Giỏ Hàng</span>
          </div>
          <div
            className={`buy remove ${isRemoving ? "active removing" : ""}`}
            onClick={handleRemoveFromCart}
            title="Xóa Khỏi Giỏ Hàng"
          >
            <IoTrashOutline />
            <span>Xóa Khỏi Giỏ Hàng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
