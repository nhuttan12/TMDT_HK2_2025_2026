# Project Roadmap & Progress

## 🟢 Phase 1: Foundation & UI Base (Hoàn thành)
- [x] Khởi tạo dự án Next.js 16 + Tailwind 4 + Bun.
- [x] Thiết lập cấu trúc thư mục `src/app/(app)` và `src/app/admin`.
- [x] Cài đặt các thư viện lõi: Radix UI, Lucide React, Zustand.
- [x] Layout Dashboard cơ bản cho Admin.

## 🟡 Phase 2: Inventory & Product Management (Đang thực hiện)
- [ ] Xây dựng Interface/Types cho `Product`, `Batch`, `Serial`.
- [ ] Trang danh sách sản phẩm Admin với Data Table (Sort/Filter).
- [ ] Component `GoodsReceiptBatch` (Nhập kho theo lô).
- [ ] Tích hợp `TipTap` cho trình soạn thảo mô tả sản phẩm.
- [ ] Upload và quản lý ảnh sản phẩm (Drag & Drop với `React DnD`).

## 🔴 Phase 3: Sales & Invoices (Sắp tới)
- [ ] Xây dựng bộ lọc `InvoiceFilter` nâng cao cho Admin.
- [ ] Logic Giỏ hàng (Shopping Cart) sử dụng Zustand (Persistence).
- [ ] Trang Checkout và tích hợp tính phí vận chuyển cơ bản.
- [ ] Hệ thống thông báo (Notifications) cho Admin khi có đơn hàng mới.

## ⚪ Phase 4: Optimization & Deployment
- [ ] Tối ưu SEO cho các trang Product (Metadata API).
- [ ] Cấu hình ESLint & Prettier để dọn dẹp code.
- [ ] Deploy thử nghiệm lên Vercel/Railway.