import axios from "axios";

const API_URL = "https://api.jsonbin.io/v3/b/670832e7e41b4d34e4408744";
const API_KEY = "$2a$10$IWuBSH64Cm23zw/qcXEgvuIJolfqH2nxhtdHJG710zexULWE9c6SS";

// Fetch data
export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "X-Master-Key": API_KEY,
      },
    });
    return response.data.record; // Trả về dữ liệu record
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Fetch payment info
export const getPaymentInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/latest`, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data.record.paymentInfo);
    return response.data.record.paymentInfo; // Trả về data để dùng khi import
  } catch (error) {
    console.error("Error fetching payment info:", error);
  }
};

// Fetch users
export const fetchUsers = async () => {
  const data = await fetchData();
  return data ? data.users : [];
};

// Add user
export const addUser = async (newUser) => {
  try {
    const data = await fetchData();
    const updatedUsers = [...data.users, newUser];

    const response = await axios.put(
      API_URL,
      {
        ...data,
        users: updatedUsers,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

// Update user
export const updateUser = async (updatedUser) => {
  try {
    const data = await fetchData();
    const updatedUsers = data.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    const response = await axios.put(
      API_URL,
      {
        ...data,
        users: updatedUsers,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    return null;
  }
};

// Delete user
export const deleteUser = async (userId) => {
  try {
    const data = await fetchData();
    const updatedUsers = data.users.filter((user) => user.id !== userId);

    const response = await axios.put(
      API_URL,
      {
        ...data,
        users: updatedUsers,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};

// Fetch products
export const fetchProducts = async () => {
  const data = await fetchData();
  return data ? data.products : [];
};

// Add product
export const addProduct = async (newProduct) => {
  try {
    const data = await fetchData();
    const updatedProducts = [...data.products, newProduct];

    const response = await axios.put(
      API_URL,
      {
        ...data,
        products: updatedProducts,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
};

// Update product
export const updateProduct = async (updatedProduct) => {
  try {
    const data = await fetchData();

    // Đảm bảo price, shelfId là số và giữ nguyên barcode
    const productToUpdate = {
      ...updatedProduct,
      price: Number(updatedProduct.price),
      shelfId: Number(updatedProduct.shelfId),
      barcode: updatedProduct.barcode, // Giữ barcode không thay đổi
    };

    const updatedProducts = data.products.map((product) =>
      product.id === productToUpdate.id ? productToUpdate : product
    );

    const response = await axios.put(
      API_URL,
      {
        ...data,
        products: updatedProducts,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (productId) => {
  try {
    const data = await fetchData();
    const updatedProducts = data.products.filter(
      (product) => product.id !== productId
    );

    const response = await axios.put(
      API_URL,
      {
        ...data,
        products: updatedProducts,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return null;
  }
};

// Fetch orders
export const fetchOrders = async () => {
  const data = await fetchData();
  return data ? data.orders : [];
};

// Add order
export const addOrder = async (newOrder) => {
  try {
    const data = await fetchData();
    const updatedOrders = [...data.orders, newOrder];

    const response = await axios.put(
      API_URL,
      {
        ...data,
        orders: updatedOrders,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding order:", error);
    return null;
  }
};

// Delete order
export const deleteOrder = async (orderId) => {
  try {
    const data = await fetchData();
    const updatedOrders = data.orders.filter((order) => order.id !== orderId);

    const response = await axios.put(
      API_URL,
      {
        ...data,
        orders: updatedOrders,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    return null;
  }
};

// Fetch shelves
export const fetchShelves = async () => {
  const data = await fetchData();
  return data ? data.shelves : [];
};

// Update shelf
export const updateShelf = async (updatedShelf) => {
  try {
    const data = await fetchData();
    const updatedShelves = data.shelves.map((shelf) =>
      shelf.id === updatedShelf.id ? updatedShelf : shelf
    );

    const response = await axios.put(
      API_URL,
      {
        ...data,
        shelves: updatedShelves,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating shelf:", error);
    return null;
  }
};

// Add order history
export const addOrderHistory = async (orderHistory) => {
  try {
    const data = await fetchData();
    const updatedOrders = [...data.orders, orderHistory];

    const response = await axios.put(
      API_URL,
      {
        ...data,
        orders: updatedOrders,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding order history:", error);
    return null;
  }
};

// Fetch export history
export const fetchExportHistory = async () => {
  const data = await fetchData();
  return data ? data.exportHistory : [];
};

// Add to export history
export const addExportHistory = async (newOrder) => {
  try {
    const data = await fetchData();
    const updatedExportHistory = [...data.exportHistory, newOrder];

    const response = await axios.put(
      API_URL,
      {
        ...data,
        exportHistory: updatedExportHistory,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error adding to export history:", error);
    return null;
  }
};

// Delete from export history
export const deleteExportHistory = async (orderId) => {
  try {
    const data = await fetchData();
    const updatedExportHistory = data.exportHistory.filter(
      (order) => order.id !== orderId
    );

    const response = await axios.put(
      API_URL,
      {
        ...data,
        exportHistory: updatedExportHistory,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting from export history:", error);
    return null;
  }
};
export const updatePaymentInfo = async (updatedPaymentInfo) => {
  try {
    const data = await fetchData();

    // Cập nhật thông tin thanh toán
    const newData = {
      ...data,
      paymentInfo: updatedPaymentInfo,
    };

    const response = await axios.put(API_URL, newData, {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating payment info:", error);
    return null;
  }
};
// Move product from one shelf to another
export const moveProduct = async (productId, oldShelfId, newShelfId) => {
  try {
    const data = await fetchData();

    // Cập nhật shelves
    const updatedShelves = data.shelves.map((shelf) => {
      if (shelf.id === oldShelfId) {
        // Xóa productId khỏi kệ cũ
        return { ...shelf, productId: null };
      }
      if (shelf.id === newShelfId) {
        // Thêm productId vào kệ mới
        return { ...shelf, productId };
      }
      return shelf; // Trả về kệ không thay đổi
    });

    // Cập nhật dữ liệu mới cho shelves
    const response = await axios.put(
      API_URL,
      {
        ...data,
        shelves: updatedShelves,
      },
      {
        headers: {
          "X-Master-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error moving product:", error);
    return null;
  }
};
