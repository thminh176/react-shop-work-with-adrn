import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product/Product"; // Giữ nguyên đường dẫn của bạn
import Cart from "../components/Cart/Cart"; // Giữ nguyên đường dẫn của bạn
import Loading from "../components/Loading/Loading"; // Giữ nguyên đường dẫn của bạn
import ProductModal from "../components/ProductModal/ProductModal"; // Đảm bảo bạn đã import modal
import "./Home.scss";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Thêm trạng thái modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Sản phẩm được chọn

  const binId = "670832e7e41b4d34e4408744"; // Thay bằng ID bin của bạn
  const apiKey = "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS"; // Thay bằng API Key của bạn

  useEffect(() => {
    axios
      .get(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: {
          "X-Master-Key": apiKey,
        },
      })
      .then((response) => {
        console.log(response.data); // In dữ liệu trả về để kiểm tra
        if (
          response.data.record &&
          Array.isArray(response.data.record.products)
        ) {
          setProducts(response.data.record.products);
        } else {
          console.error("Data is not an array:", response.data.record);
          setProducts([]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [binId, apiKey]);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = () => {
    alert("Checkout success!");
    setCartItems([]); // Xóa giỏ hàng sau khi thanh toán
  };

  // Hàm mở modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="home">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="products">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
                isInCart={cartItems.some((item) => item.id === product.id)}
                removeFromCart={removeFromCart}
                openModal={openModal} // Truyền hàm openModal
              />
            ))}
          </div>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
          />
          {/* Hiển thị modal khi isModalOpen là true */}
          {isModalOpen && (
            <ProductModal
              product={selectedProduct}
              onClose={closeModal}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isInCart={cartItems.some(
                (item) => item.id === selectedProduct.id
              )} // Truyền trạng thái giỏ hàng
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
