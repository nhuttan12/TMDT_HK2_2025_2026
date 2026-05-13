import { Badge } from '@/components/ui/badge';
import { ProductSystemStatus } from '@/types/products/admin/variant/ProductSystemStatus';
import { JSX } from 'react';

interface ProductStatusBadgeProps {
	status: ProductSystemStatus;
}

export default function ProductSystemStatusBadge({ status }: ProductStatusBadgeProps): JSX.Element {
	switch (status) {
		case 'approved':
			return (
				<Badge className='bg-emerald-500 hover:bg-emerald-600 text-white border-transparent'>
					Đã phê duyệt
				</Badge>
			);
		case 'pending_approval':
			return (
				<Badge className='bg-amber-500 hover:bg-amber-600 text-white border-transparent'>
					Chờ phê duyệt
				</Badge>
			);
		case 'rejected':
			return <Badge variant='destructive'>Từ chối</Badge>;
		case 'banned':
			return (
				<Badge className='bg-slate-700 hover:bg-slate-800 text-white border-transparent'>
					Đình chỉ
				</Badge>
			);
		default:
			return <Badge variant='outline'>Không xác định</Badge>;
	}
}
