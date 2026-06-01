import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';

export async function getGoodsIssuesAdmin(): Promise<GoodsIssueList[]> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // Chuyển sang GUID string
					code: 'PXK-20260319-001',
					type: 'retail',
					exportDate: new Date('2026-03-19T10:30:00Z').toISOString(),
					totalQuantity: 10,
					totalAmount: 5000000,
					status: 'draft',
					createdAt: new Date('2026-03-19T10:00:00Z').toISOString(),
					updatedAt: new Date('2026-03-19T10:00:00Z').toISOString(),
				},
				{
					id: '2b3c4d5e-2222-4aaa-8bbb-222222222222', // Chuyển sang GUID string
					code: 'PXK-20260319-002',
					type: 'wholesale',
					exportDate: new Date('2026-03-20T15:00:00Z').toISOString(),
					totalQuantity: 5,
					totalAmount: 2500000,
					status: 'confirmed',
					createdAt: new Date('2026-03-20T14:30:00Z').toISOString(),
					updatedAt: new Date('2026-03-20T14:30:00Z').toISOString(),
				},
				{
					id: '3c4d5e6f-3333-4aaa-8bbb-333333333333', // Chuyển sang GUID string
					code: 'PXK-20260319-003',
					type: 'return_defective',
					exportDate: new Date('2026-03-21T09:45:00Z').toISOString(),
					totalQuantity: 15,
					totalAmount: 7500000,
					status: 'cancelled',
					createdAt: new Date('2026-03-21T09:15:00Z').toISOString(),
					updatedAt: new Date('2026-03-21T09:15:00Z').toISOString(),
				},
			]);
		}, 500);
	});
}
