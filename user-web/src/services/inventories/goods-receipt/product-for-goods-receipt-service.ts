import { ProductForGoodsReceipt } from '@/types/inventories/receipts/uis/ProductForGoodsReceipt';
import { ProductVariantRow } from '@/types/inventories/receipts/uis/ProductVariantRow';
import { PaginationResponse } from '@/types/shared/PaginationResponse';

export const getProductsForGoodsReceipt = async (): Promise<ProductForGoodsReceipt[]> => {
	return [
		{ id: 1, name: 'iPhone 15 Pro Max', status: true },
		{ id: 2, name: 'Samsung Galaxy S24 Ultra', status: true },
		{ id: 3, name: 'MacBook Pro 16"', status: true },
		{ id: 4, name: 'iPad Air', status: false },
		{ id: 5, name: 'AirPods Pro', status: true },
		{ id: 6, name: 'Sony WH-1000XM5', status: true },
		{ id: 7, name: 'Apple Watch Series 9', status: false },
		{ id: 8, name: 'Dell XPS 15', status: true },
	];
};

export const getProductVariants = async (): Promise<PaginationResponse<ProductVariantRow>> => {
	return {
		data: [
			{ id: 1, name: 'Bình Terrarium Kín - Rừng Nhiệt Đới - Size L', sku: 'TER-CL-TROP-L' },
			{ id: 2, name: 'Bình Terrarium Kín - Rừng Nhiệt Đới - Size M', sku: 'TER-CL-TROP-M' },
			{ id: 3, name: 'Bình Terrarium Mở - Sa Mạc Tiên Rồng - Size S', sku: 'TER-OP-DES-S' },
			{ id: 4, name: 'Bể Paludarium - Thác Nước Bán Cạn - Size XL', sku: 'PAL-WATERFALL-XL' },
			{ id: 5, name: 'Bể Paludarium - Rừng Trầm Tích - Size L', sku: 'PAL-ROCK-L' },
			{ id: 6, name: 'Bình Kính Đa Giác - Giọt Nước Bonsai - Size M', sku: 'GEO-DROP-BON-M' },
			{ id: 7, name: 'Bình Kính Đa Giác - Kim Cương - Size S', sku: 'GEO-DIA-S' },
			{ id: 8, name: 'Bình Terrarium Kín - Đồi Rêu Cổ Tích - Size S', sku: 'TER-CL-MOSS-S' },
			{ id: 9, name: 'Bình Terrarium Kín - Đồi Rêu Cổ Tích - Size M', sku: 'TER-CL-MOSS-M' },
			{
				id: 10,
				name: 'Bình Terrarium Mở - Tiểu Cảnh Suối Nước - Size L',
				sku: 'TER-OP-STREAM-L',
			},
		],
		meta: {
			currentPage: 1,
			totalItems: 10,
			itemsPerPage: 10,
			totalPages: 1,
		},
	};
};
