import React, { JSX } from 'react';
import { ApprovalShopsStatus } from '@/types/shops/admin/ApprovalShopsStatus';
import { getApprovalShopStatusLabel } from '@/utils/shop/approval-shops-status-label';

interface ShopApprovalStatusBadgeProps {
	status: ApprovalShopsStatus;
}

export function ShopApprovalStatusBadge({ status }: ShopApprovalStatusBadgeProps): JSX.Element {
	// Record quản lý màu sắc độc lập với Label
	const statusColors: Record<ApprovalShopsStatus, string> = {
		'pending-approval': 'bg-yellow-100 text-yellow-700',
		'approved': 'bg-green-100 text-green-700',
		'rejected': 'bg-red-100 text-red-700',
	};

	return (
		<span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
			{getApprovalShopStatusLabel(status)}
		</span>
	);
}
