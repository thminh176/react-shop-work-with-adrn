import React, { useEffect, useState } from "react";
import { fetchProducts } from "../components/api"; // Nhập hàm fetchProducts từ api.js
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Loading from "../components/Loading/Loading";
import ProductModal from "../components/ProductModal/ProductModal";
import "./Home.scss";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    };

    loadProducts().catch((error) => {
      console.error("Error loading products:", error);
      setIsLoading(false);
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

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleCheckout = () => {
    alert("Checkout success!");
    setCartItems([]); // Clear the cart after checkout
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

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
                openModal={openModal}
              />
            ))}
          </div>
          <Cart
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            handleCheckout={handleCheckout}
            setCartItems={setCartItems}
          />

          {isModalOpen && (
            <ProductModal
              product={selectedProduct}
              onClose={closeModal}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isInCart={cartItems.some(
                (item) => item.id === selectedProduct?.id
              )}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
