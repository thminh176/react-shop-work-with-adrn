import React from "react";
import "./Product.scss";
import { IoCartOutline } from "react-icons/io5";
import { IoTrashOutline } from "react-icons/io5"; // Import icon cho nút xóa

const Product = ({
  product,
  addToCart,
  removeFromCart,
  isInCart,
  openModal,
}) => {
  return (
    <div className="wrapper" onClick={() => openModal(product)}>
      {" "}
      {/* Mở modal khi nhấn vào sản phẩm */}
      <div className="container">
        <div className="top">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
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
          {isInCart ? (
            <div className="button-group">
              {/* Nút thêm vào giỏ hàng */}
              <div
                className="buy"
                style={{ width: "calc(50% - 4px)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }} // Gọi hàm thêm khi nhấn
                title="Thêm vào giỏ hàng"
              >
                <IoCartOutline />
                <span>Thêm Vào Giỏ Hàng</span>
              </div>
              {/* Nút xóa khỏi giỏ hàng nằm bên phải */}
              <div
                className="buy remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product.id);
                }} // Gọi hàm xóa khi nhấn
                title="Xóa Khỏi Giỏ Hàng"
                style={{ width: "50%" }}
              >
                <IoTrashOutline />
                <span>Xóa Khỏi Giỏ Hàng</span>
              </div>
            </div>
          ) : (
            <div
              className="buy"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }} // Gọi hàm thêm khi nhấn
              title="Thêm vào giỏ hàng"
            >
              <IoCartOutline />
              <span>Thêm Vào Giỏ Hàng</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
