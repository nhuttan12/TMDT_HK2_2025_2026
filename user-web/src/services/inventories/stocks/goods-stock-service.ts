import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';

export const fetchGoodsStockSummary = async (): Promise<GoodsStockSummaryItem[]> => {
	const mockGoodsStock: GoodsStockSummaryItem[] = [
		{
			id: 'in-stock',
			value: 31,
			label: 'Phân loại còn hàng',
			tooltipText: 'Các phân loại sản phẩm hiện đang có sẵn trong kho để bán.',
		},
		{
			id: 'hidden-locked',
			value: 35,
			label: 'Phân loại đã ẩn & đã bị khóa',
			tooltipText: 'Sản phẩm đã bị ẩn khỏi cửa hàng hoặc bị hệ thống khóa do vi phạm.',
		},
		{
			id: 'out-of-stock',
			value: 3,
			label: 'Phân loại hết hàng',
			tooltipText: 'Sản phẩm có số lượng tồn kho bằng 0.',
		},
		{
			id: 'low-stock',
			value: 1,
			label: 'Phân loại sắp hết hàng',
			tooltipText: 'Sản phẩm có tồn kho dưới mức cảnh báo an toàn.',
		},
		{
			id: 'ordered-sku',
			value: 0,
			label: 'SKU đặt hàng',
			tooltipText: 'Số lượng SKU đang nằm trong các đơn đặt hàng chưa xử lý.',
		},
	];

	return new Promise((resolve, reject) => {
		// Giả lập độ trễ của mạng mất 800ms để test Loading Spinner
		setTimeout(() => {
			resolve(mockGoodsStock);
		}, 800);
	});
};

export const fetchProductInStock = async (): Promise<ProductInStock[]> => {
	const mockProductInStock: ProductInStock[] = [
		{
			id: 1,
			productId: 1,
			productVariantId: 1,
			image: 'https://pethouse.com.vn/wp-content/uploads/2023/01/bio-gentadrop1.jpg',
			name: '[BIO GENTADROP] [10 ML] Dung dịch nhỏ mắt',
			variantSku: 'BIO-GENTA-10ML-V1',
			replenishment: 'immediate',
			stock: 1, // Lấy từ image_2.png
			sales7d: 0,
			sales30d: 0,
			supplierName: 'Công ty ABC',
		},
		{
			id: 2,
			productId: 2,
			productVariantId: 2,
			image: 'https://gaohouse.vn/wp-content/uploads/2024/05/ao-nhom-dong-phuc-teambuilding-46.jpg',
			name: 'Set quần áo cực chất - test',
			variantSku: 'CLO-SET-007-XL-RED-01',
			replenishment: 'early',
			stock: 180, // Lấy từ image_2.png
			sales7d: 0,
			sales30d: 1,
			supplierName: 'Công ty XYZ',
		},
		{
			id: 3,
			productId: 3,
			productVariantId: 3,
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBz0OMpGFkgG64mmiLbWJ5YzOY-cv5H8Ay-A&s',
			name: 'Son 7 màu dưỡng ẩm c hồng khô nứt',
			variantSku: 'LIP-7C-PINK-M',
			replenishment: 'normal',
			stock: 120, // Số giả
			sales7d: 2, // Số giả
			sales30d: 5, // Số giả
			supplierName: 'Công ty TNHH một thành viên',
		},
	];

	return mockProductInStock;
};
