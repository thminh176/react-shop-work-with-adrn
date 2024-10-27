# React E-commerce Application (web của AD AUTOMATION)

Dự án này là một ứng dụng thương mại điện tử được xây dựng bằng React, cung cấp nền tảng cho việc quản lý sản phẩm, giỏ hàng và thanh toán. Mục tiêu của dự án là tạo ra một trải nghiệm mua sắm trực tuyến mượt mà và thân thiện với người dùng.

## Giới Thiệu

Ứng dụng cho phép người dùng duyệt qua các sản phẩm, thêm chúng vào giỏ hàng và thực hiện thanh toán dễ dàng. Ứng dụng sử dụng kiến trúc ADRN (Action-Data-Response-Navigation) để quản lý trạng thái và tương tác của người dùng.

## Tính Năng

- Quản lý sản phẩm: Thêm, sửa, xóa sản phẩm.
- Giỏ hàng: Thêm sản phẩm vào giỏ hàng và tính toán tổng giá.
- Thanh toán: Thực hiện quy trình thanh toán với các thông tin người dùng.
- Responsive: Ứng dụng tương thích với các thiết bị di động và máy tính.

## Công Nghệ Sử Dụng

- **React**: Thư viện JavaScript cho việc xây dựng giao diện người dùng.
- **Redux**: Thư viện quản lý trạng thái.
- **React Router**: Định tuyến trong ứng dụng React.
- **Bootstrap,SCSS**: Thư viện CSS cho thiết kế giao diện.

## Cài Đặt

Hướng dẫn cách cài đặt và chạy ứng dụng trên máy tính của bạn:

1. **Clone repository**:

   ```bash
   git clone https://github.com/thminh176/react-shop-work-with-adrn.git
   ```

2. **Di chuyển vào thư mục dự án**:

   ```bash
   cd react-shop-work-with-adrn
   ```

3. **Cài đặt các phụ thuộc**:

   ```bash
   npm install
   ```

4. **Chạy ứng dụng**:

   ```bash
   npm start
   ```

   Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Cấu Trúc Thư Mục

Giải thích cấu trúc thư mục của dự án:

```
react-shop-work-with-adrn/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Đóng Góp

Nếu bạn muốn đóng góp vào dự án này, hãy làm theo các bước sau:

1. Fork repository này.
2. Tạo một nhánh mới:
   ```bash
   git checkout -b ten-nhanh-moi
   ```
3. Thực hiện thay đổi và commit:
   ```bash
   git commit -m "Mô tả thay đổi của bạn"
   ```
4. Đẩy nhánh lên repository:
   ```bash
   git push origin ten-nhanh-moi
   ```
5. Tạo pull request.

## Giấy Phép

Dự án này được cấp phép theo [MIT License](LICENSE).

## Liên Hệ

Nếu bạn có câu hỏi hoặc vấn đề cần giải quyết, vui lòng liên hệ qua email: thminh.176.vn@gmail.com (Đàm Thiên Minh - front-end developer)
