const ProtectedRoute = ({ element, isAdmin }) => {
  if (!isAdmin) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "red" }}>
        <h2>Bạn không có quyền truy cập vào trang này!</h2>
        <p>Vui lòng liên hệ với quản trị viên nếu bạn nghĩ đây là một lỗi.</p>
      </div>
    );
  }
  return element;
};

export default ProtectedRoute;
