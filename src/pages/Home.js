import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Loading from "../components/Loading/Loading"; // Thêm Loading component
import "./Home.scss";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false); // Ngừng loading sau khi lấy được dữ liệu
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Ngừng loading nếu có lỗi
      });
  }, []);

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

  const handleCheckout = () => {
    alert("Checkout success!");
    setCartItems([]);
  };

  return (
    <div className="home">
      {isLoading ? ( // Hiển thị loading khi dữ liệu đang được tải
        <Loading />
      ) : (
        <>
          <div className="products">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
          <Cart cartItems={cartItems} handleCheckout={handleCheckout} />
        </>
      )}
    </div>
  );
};

export default Home;
