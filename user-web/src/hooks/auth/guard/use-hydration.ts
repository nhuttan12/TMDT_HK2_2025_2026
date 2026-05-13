// import { useState, useEffect } from 'react';
//
// /**
//  * Hook này giúp kiểm tra xem Component đã thực sự được Hydrate thành công trên Client chưa.
//  * Tiêu chuẩn Senior: Tránh Hydration Mismatch lỗi phổ biến trong Next.js App Router.
//  */
// export function useHydration(): boolean {
// 	const [hydrated, setHydrated] = useState<boolean>(false);
//
// 	useEffect(() => {
// 		// Thay vì set trực tiếp, ta dùng requestAnimationFrame hoặc đơn giản
// 		// là chấp nhận đây là side-effect duy nhất để báo hiệu client-ready.
// 		// eslint-disable-next-line react-hooks/set-state-in-effect
// 		setHydrated(true);
// 	}, []);
//
// 	return hydrated;
// }
