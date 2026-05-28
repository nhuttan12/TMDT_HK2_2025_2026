import { PaginationResponse } from '@/types/shared/PaginationResponse';
import { ApprovalShopsStatus } from '@/types/shops/admin/ApprovalShopsStatus';
import { ShopApproval } from '@/types/shops/admin/ShopApproval';
import { ShopRegistrationForm } from '@/types/shops/user/ShopRegistrationForm';

export interface GetApprovalShopsParams {
	page?: number;
	name?: string;
	status?: ApprovalShopsStatus | string; // Cho phép string vì 'ALL' không nằm trong type
}

export const getApprovalShops = async (
	params: GetApprovalShopsParams,
): Promise<PaginationResponse<ShopApproval>> => {
	await new Promise((resolve) => setTimeout(resolve, 600));

	const { page = 1, name, status } = params;
	const limit = 10;

	let mockData: ShopApproval[] = Array.from({ length: 42 }).map((_, i) => {
		// Logic gán status ngẫu nhiên chuẩn type
		let currentStatus: ApprovalShopsStatus = 'pending-approval';
		if (i % 4 === 0) currentStatus = 'rejected';
		if (i % 5 === 0) currentStatus = 'approved';

		return {
			id: 1000 + i,
			name: `Cửa hàng đăng ký mới ${i + 1}`,
			email: `newshop${i + 1}@example.com`,
			phone: `0909000${i.toString().padStart(3, '0')}`,
			status: currentStatus,
			rating: 0,
			createdAt: new Date(Date.now() - i * 86400000).toISOString(),
		};
	});

	if (name) {
		mockData = mockData.filter((shop) => shop.name.toLowerCase().includes(name.toLowerCase()));
	}

	if (status && status !== 'ALL') {
		mockData = mockData.filter((shop) => shop.status === status);
	}

	const totalItems = mockData.length;
	return {
		data: mockData.slice((page - 1) * limit, page * limit),
		meta: {
			totalItems,
			totalPages: Math.ceil(totalItems / limit) || 1,
			currentPage: page,
			itemsPerPage: limit,
		},
	};
};

export const getShopRegistrationFormByApprovalId = async (
	approvalId: number,
): Promise<ShopRegistrationForm> => {
	await new Promise((resolve) => setTimeout(resolve, 600));
	return {
		id: approvalId,
		name: 'Terrarium Xanh VN',
		email: 'contact@terrariumxanh.vn',
		phone: '0901234567',
		description:
			'<p>Cửa hàng chuyên cung cấp các hệ sinh thái Terrarium thu nhỏ, rêu nhiệt đới và phụ kiện setup tiểu cảnh chuyên nghiệp.</p>',
		address: '123 Nguyễn Văn Linh, Phường Tân Thuận Tây, Quận 7, TP.HCM',
		bankName: 'Vietcombank',
		accountName: 'NGUYEN VAN A',
		accountNumber: '10123456789',
		termsAccepted: true,
	};
};
