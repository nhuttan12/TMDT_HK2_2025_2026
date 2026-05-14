import React, { JSX } from 'react';

// Nếu bạn đã có type này ở file ShopAdmin.ts thì có thể import vào dùng luôn
export type ShopStatusType = 'active' | 'inactive' | 'banned';

interface ShopStatusBadgeProps {
	status: ShopStatusType;
}

export function ShopStatusBadge({ status }: ShopStatusBadgeProps): JSX.Element {
	// Dùng Record để TypeScript hỗ trợ check type chặt chẽ hơn
	const statusColors: Record<ShopStatusType, string> = {
		active: 'bg-green-100 text-green-700',
		inactive: 'bg-gray-100 text-gray-700',
		banned: 'bg-red-100 text-red-700',
	};

	const statusText: Record<ShopStatusType, string> = {
		active: 'Hoạt động',
		inactive: 'Tạm khóa',
		banned: 'Bị cấm',
	};

	return (
		<span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
			{statusText[status]}
		</span>
	);
}
