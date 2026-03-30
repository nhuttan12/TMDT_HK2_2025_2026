# Project Business Context: E-commerce Platform

## 📦 Inventory & Product Logic
- **Product Variants:** Một sản phẩm có thể có nhiều biến thể (Size, Color). Mỗi biến thể có SKU riêng.
- **Batch Management (Lô hàng):** - Quản lý nhập kho thông qua `GoodsReceiptBatch`.
    - Mỗi lô hàng có ngày nhập, ngày hết hạn và nhà cung cấp.
- **Serial Numbers:** - Một số sản phẩm đặc thù yêu cầu quản lý theo số Serial duy nhất cho từng đơn vị sản phẩm.
    - Khi xuất kho, phải trừ đúng số Serial đã chọn.
- **Stock Calculation:** Tồn kho tổng = Tổng tồn kho của tất cả các Batch còn hạn.

## 🧾 Invoice & Order Workflow
- **Order Status:** Chờ xác nhận -> Đang xử lý -> Đang giao -> Đã giao / Đã hủy.
- **Invoice Filter:** Admin cần lọc hóa đơn theo: Khoảng ngày, Trạng thái, Tên khách hàng, và Tổng tiền.
- **Payment:** Hỗ trợ thanh toán khi nhận hàng (COD) và chuyển khoản.

## 🔐 Authorization (RBAC)
- **Admin:** Toàn quyền quản lý kho, sản phẩm, hóa đơn và người dùng.
- **Staff (nhân viên kho):** Chỉ có quyền xem/tạo `GoodsReceiptBatch` và cập nhật tồn kho.
- **Customer:** Chỉ xem sản phẩm, quản lý giỏ hàng và xem lịch sử hóa đơn của chính mình.

## 🎨 UI/UX Standards
- Toàn bộ giao diện Admin dùng Dashboard layout có Sidebar cố định.
- Form nhập liệu dài (như thêm sản phẩm) phải chia theo Tabs hoặc Steps để tránh quá tải thông tin.
- Sử dụng Toast notifications để thông báo khi thực hiện Action thành công/thất bại.