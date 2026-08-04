# 🚀 Nền Tảng Thương Mại Điện Tử Đa Người Bán (E-Commerce Marketplace)

Dự án này là một nền tảng thương mại điện tử theo mô hình Marketplace, đóng vai trò là cầu nối trực tiếp giữa người mua (Users) và các nhà bán hàng (Shops). Hệ thống được xây dựng trên kiến trúc phân tầng hiện đại, đảm bảo khả năng mở rộng, chịu tải cao và mang lại trải nghiệm mua sắm/bán hàng mượt mà.

---

## 💡 Tổng Quan Dự Án (Project Overview)

Mục tiêu của dự án là xây dựng một hệ sinh thái thương mại điện tử toàn diện, nơi bất kỳ ai cũng có thể tham gia mua sắm hoặc đăng ký mở gian hàng để kinh doanh. Nền tảng phân tách rõ ràng quyền hạn và giao diện cho 3 nhóm đối tượng chính, với luồng dữ liệu được kiểm soát chặt chẽ từ Frontend đến Database.

### 👥 Các Phân Hệ Chính (Core Modules):

1. **Phân hệ Khách hàng (User/Buyer):**
   * **Khám phá sản phẩm:** Tìm kiếm nâng cao, lọc theo danh mục và giá cả.
   * **Trải nghiệm mua sắm:** Quản lý giỏ hàng, áp dụng mã giảm giá (Vouchers) và thanh toán trực tuyến an toàn qua cổng **PayPal**.
   * **Quản lý tài khoản:** Theo dõi trạng thái đơn hàng (Order tracking), lịch sử mua hàng, và hệ thống đánh giá/phản hồi sản phẩm.

2. **Phân hệ Nhà bán hàng (Shop/Seller Center):**
   * **Quản lý gian hàng:** Đăng ký mở shop, tùy chỉnh hồ sơ cửa hàng (chờ Admin phê duyệt).
   * **Quản lý kho & Nhập kho:** Thêm mới, cập nhật sản phẩm, quản lý biến thể (kích thước, màu sắc). Tích hợp tính năng **Nhập kho (Stock-in)** giúp Shop dễ dàng quản lý nguồn hàng bổ sung và theo dõi biến động tồn kho chi tiết.
   * **Xử lý đơn hàng:** Tiếp nhận, xác nhận đơn, và theo dõi tiến trình giao hàng.
   * **Thống kê:** Dashboard báo cáo doanh thu, số lượng đơn hàng theo ngày/tháng.

3. **Phân hệ Quản trị viên (Admin Portal):**
   * **Quy trình Phê duyệt (Approval Workflow):** * *Phê duyệt cửa hàng:* Kiểm duyệt và cấp quyền hoạt động cho các Shop mới đăng ký trên nền tảng.
     * *Phê duyệt sản phẩm:* Kiểm duyệt nội dung, hình ảnh và chất lượng sản phẩm của Shop trước khi cho phép hiển thị công khai trên sàn để đảm bảo tuân thủ chính sách.
   * **Quản lý tài khoản:** Quản lý danh sách Users và Shops, khóa hoặc đình chỉ các tài khoản vi phạm.

---

## 🛠️ Ngăn Xếp Công Nghệ (Technology Stack)

Dự án áp dụng các công nghệ tiên tiến nhất để giải quyết bài toán chịu tải của một hệ thống e-commerce:

### 1. Frontend: Next.js, ReactJS & Bun
* Xây dựng giao diện Web App bằng **Next.js**, tận dụng Server-Side Rendering (SSR) để hiển thị trang chi tiết sản phẩm cực nhanh và tối ưu hóa SEO trên các công cụ tìm kiếm.
* Giao diện Shop Channel và Admin Dashboard sử dụng Client-Side Rendering (CSR) với ReactJS để mang lại trải nghiệm Single Page Application (SPA) mượt mà.
* **Môi trường & Runtime:** Sử dụng **Bun** làm JavaScript runtime và package manager thay thế cho Node.js/npm. Bun mang lại tốc độ cài đặt thư viện (dependencies) và thời gian khởi chạy (boot time) cực kỳ ấn tượng, tối ưu hóa đáng kể trải nghiệm phát triển (DX).
* **Styling:** Sử dụng Tailwind CSS để thiết kế giao diện linh hoạt, tương thích mọi thiết bị.

### 2. Backend: .NET Web API & Payment Gateway
* Cốt lõi xử lý nghiệp vụ được xây dựng bằng **.NET Web API**.
* Áp dụng kiến trúc Clean Architecture giúp tách bạch logic nghiệp vụ của các domain (User, Shop, Product, Order).
* Hệ thống bảo mật chặt chẽ với JWT Authentication và Role-Based Authorization, đảm bảo phân quyền nghiêm ngặt giữa User, Shop và Admin.
* **Tích hợp thanh toán:** Kết nối với API của **PayPal** để xử lý các giao dịch thanh toán quốc tế và nội địa một cách an toàn, tự động cập nhật trạng thái đơn hàng thông qua Webhooks.

### 3. Tương Tác Dữ Liệu: Entity Framework Core (EF Core)
* Tầng Data Access sử dụng **EF Core** làm ORM chính để xử lý trơn tru các thao tác CRUD cơ bản như đăng sản phẩm, cập nhật profile người dùng, thêm giỏ hàng.

### 4. Quản Trị Cơ Sở Dữ Liệu: SQL Server & SSDT
* Quản lý lược đồ cơ sở dữ liệu hoàn toàn bằng công cụ **SQL Server Data Tools (SSDT)** tích hợp trong dự án `.sqlproj`.
* SSDT giúp lưu trữ toàn bộ cấu trúc bảng, khóa ngoại (để liên kết Product - Shop - Order), và Views dưới dạng mã nguồn để quản lý phiên bản dễ dàng và an toàn khi triển khai (CI/CD).

---

## ⚡ Điểm Nhấn Kỹ Thuật: Tối Ưu Bằng Stored Procedure

Trong một nền tảng Marketplace, lượng dữ liệu sinh ra từ giao dịch và lịch sử nhập kho là rất khổng lồ. Để đảm bảo hệ thống không bị nghẽn (bottleneck), dự án kết hợp EF Core với **Stored Procedures (SP)**:

* **Xử lý tác vụ nặng:** Thay vì dùng EF Core để tính toán trên RAM của server ứng dụng, các logic phức tạp như: 
  * *Báo cáo thống kê chênh lệch Nhập - Xuất kho.*
  * *Thống kê top sản phẩm bán chạy nhất toàn sàn.*
  * *Thu hồi hàng loạt các sản phẩm vi phạm.*
  ...sẽ được viết thành các Stored Procedures trong dự án SSDT.
* **Tích hợp trơn tru:** .NET Backend gọi trực tiếp các SP này thông qua EF Core (`FromSqlRaw`) để nhận về các DTOs (Data Transfer Objects) một cách nhanh chóng, tận dụng tối đa sức mạnh tối ưu hóa Query Execution Plan của SQL Server.

## Use case
<img width="3970" height="4337" alt="image" src="https://github.com/user-attachments/assets/69a0c077-add7-4e19-a261-4325ed346c2a" />

