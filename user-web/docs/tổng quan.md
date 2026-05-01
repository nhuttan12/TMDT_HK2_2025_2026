# Tổng quan dự án

## Mô tả chung

Dự án này là một ứng dụng web thương mại điện tử frontend xây dựng bằng Next.js 16 và React 19, dùng TypeScript và Tailwind CSS 4. Dự án có hai khu vực chính:

- Giao diện khách hàng: hiển thị sản phẩm, giỏ hàng, thanh toán, hồ sơ người dùng.
- Dashboard admin: quản lý sản phẩm, danh mục, kho, hoá đơn, người dùng, thông báo.

## Công nghệ chính

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand
- @tanstack/react-query
- Radix UI
- Lucide React
- Framer Motion
- TipTap

## Cấu trúc thư mục chính

`src/app/`
- `layout.tsx` — root layout chung toàn site
- `(app)/layout.tsx` — layout chung cho giao diện người dùng
- `auth/` — login, register
- `admin/` — dashboard admin
- `carts/`, `checkout/`, `products/`, `profile/`, `thankyou/` — các route khách hàng

`src/components/`
- `layout/` — layout và provider
- `ui/` — component giao diện dùng chung (button, input, table, dialog, v.v.)
- `product/`, `invoice/`, `user/` — component chuyên biệt cho từng tính năng

`src/stores/`
- `auth.store.ts` — trạng thái xác thực
- `cart.store.ts` — trạng thái giỏ hàng
- `checkout.store.ts` — trạng thái thanh toán
- `batch-receipt.store.ts` — trạng thái liên quan lô/phiếu

`src/hooks/`
- custom hook dùng chung và cho phần inventories

`src/lib/`, `src/utils/`
- helper và utility dùng chung

## Nguyên tắc chính của code

- Dùng App Router của Next.js để cấu trúc route theo thư mục.
- `layout.tsx`, `page.tsx`, `loading.tsx`, `not-found.tsx` theo chuẩn App Router.
- UI tái sử dụng qua component trong `src/components/ui/`.
- Dữ liệu được quản lý bằng `react-query` và `Zustand`.
- Kiểm soát kiểu tĩnh bằng TypeScript với `strict: true`.
- Style với Tailwind CSS và các utility class.

## Các file cấu hình quan trọng

- `package.json`
  - `dev`: `next dev`
  - `build`: `next build`
  - `start`: `next start`
- `next.config.ts`
  - `reactCompiler: true`
  - `images.remotePatterns` cho phép tải ảnh từ mọi hostname `https`.
- `tailwind.config.ts`
  - scan nội dung trong `./src/app/**/*.{ts,tsx}` và `./src/components/**/*.{ts,tsx}`.
- `tsconfig.json`
  - alias `@/*` trỏ tới `./src/*`
  - dùng `strict: true` và `moduleResolution: bundler`

## Cách chạy nhanh

1. Mở terminal trong thư mục dự án `user-web`.
2. Cài dependencies: `npm install` (hoặc `bun install`).
3. Chạy dev server: `npm run dev` (hoặc `bun dev`).
4. Mở `http://localhost:3000`.

## Ghi chú

Dự án hiện chỉ là phần frontend. Nếu cần tích hợp backend, có thể cần cấu hình thêm biến môi trường và API tương ứng.
