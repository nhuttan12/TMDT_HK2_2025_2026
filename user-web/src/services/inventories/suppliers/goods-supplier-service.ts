import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';

export const getGoodsSupplier = async (): Promise<Supplier[]> => {
	const mockSuppliers: Supplier[] = [
		{
			id: 1,
			name: 'Công ty Cổ phần Bao bì Việt Nam',
			contactName: 'Nguyễn Văn A',
			phone: '0901234567',
			email: 'contact@baobivn.com',
			address: '123 Đường Số 1, KCN Tân Bình, Quận Tân Phú, TP.HCM',
			taxCode: '0101234567',
		},
		{
			id: 2,
			name: 'Cơ sở Sản xuất Nhựa Hùng Phát',
			// Không có email để test UI
			contactName: 'Lê Thị B',
			phone: '0987654321',
			address: '45/2A Ấp 3, Xã Vĩnh Lộc B, Huyện Bình Chánh, TP.HCM',
			taxCode: '0312345678',
		},
		{
			id: 3,
			name: 'Công ty TNHH Nhập khẩu Vina',
			// Thiếu hoàn toàn thông tin người liên hệ (contactName, phone, email)
			address: 'Tầng 3, Tòa nhà Bitexco, Số 2 Hải Triều, Quận 1, TP.HCM',
			taxCode: '0309876543',
		},
		{
			id: 4,
			name: 'Tập đoàn Vận tải Global',
			// Có email nhưng không có phone
			contactName: 'Trần Đại C',
			email: 'support@globaltransport.vn',
			address: 'Số 9 Đinh Tiên Hoàng, Phường Đa Kao, Quận 1, TP.HCM',
			taxCode: '0105678901',
		},
		{
			id: 5,
			name: 'Nhà phân phối Hương Liệu Á Châu',
			contactName: 'Phạm Văn D',
			phone: '0934567890',
			email: 'info@asiaflavor.com',
			// Địa chỉ rất dài để test tính năng truncate max-w
			address:
				'Lô C2-3-4, Đường D1, Khu Công Nghệ Cao, Phường Tân Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam',
			taxCode: '0311122233',
		},
	];

	return mockSuppliers;
};

export const getProductBySupplierId = async (
	supplierId: number,
): Promise<ProductListInfoAdmin[]> => {
	const mockProducts: ProductListInfoAdmin[] = [
		{
			id: 1,
			name: 'iPhone 15 Pro Max 256GB',
			slug: 'iphone-15-pro-max-256gb',
			image: 'https://picsum.photos/seed/iphone15/400/400',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 2,
			name: 'MacBook Air M3 13-inch',
			slug: 'macbook-air-m3-13-inch',
			image: 'https://picsum.photos/seed/macbookm3/400/400',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 3,
			name: 'AirPods Pro 2',
			slug: 'airpods-pro-2',
			image: 'https://picsum.photos/seed/airpodspro2/400/400',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 4,
			name: 'iPad Pro 11-inch M2',
			slug: 'ipad-pro-11-inch-m2',
			image: 'https://picsum.photos/seed/ipadpro/400/400',
			status: true,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
		{
			id: 5,
			name: 'Apple Watch Series 9',
			slug: 'apple-watch-series-9',
			image: 'https://picsum.photos/seed/applewatch9/400/400',
			status: false,
			createdAt: '2024-01-10T10:00:00Z',
			updatedAt: '2024-02-01T15:30:00Z',
		},
	];

	return mockProducts;
};

export const fetchSupplierById = async (supplierId: number): Promise<Supplier> => {
	const mockSupplier: Supplier = {
		id: 1,
		name: 'Công ty Cổ phần Bao bì Việt Nam',
		contactName: 'Nguyễn Văn A',
		phone: '0901234567',
		email: 'contact@baobivn.com',
		address: '123 Đường Số 1, KCN Tân Bình, Quận Tân Phú, TP.HCM',
		taxCode: '0101234567',
	};

	return mockSupplier;
};
