import { ImageResponse } from 'next/og';

// Yêu cầu NextJS chạy file này trên môi trường Edge để tối ưu tốc độ sinh ảnh
export const runtime = 'edge';

// Khai báo kích thước chuẩn cho Favicon
export const size = {
	width: 32,
	height: 32,
};

// Định nghĩa kiểu file trả về cho trình duyệt
export const contentType = 'image/png';

/**
 * NextJS sẽ tự động gọi hàm này, biên dịch JSX bên dưới thành một file PNG
 * và gắn nó làm Favicon cho toàn bộ hệ thống.
 */
export default function Icon(): ImageResponse {
	return new ImageResponse(
		// Vẽ Favicon bằng JSX với CSS nội tuyến (Inline Styles)
		// Sử dụng đúng mã màu của Tailwind: bg-emerald-100 (#d1fae5) và text-emerald-600 (#059669)
		<div
			style={{
				fontSize: 20,
				background: '#d1fae5',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '8px',
				color: '#059669',
			}}
		>
			{/* Biểu tượng mầm cây (Sprout/Terrarium) dạng Emoji để đảm bảo render tốt nhất ở size nhỏ */}
			🌱
		</div>,
		// Áp dụng cấu hình kích thước đã định nghĩa
		{
			...size,
		},
	);
}
