import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';
import { ProductInStock } from '@/types/inventories/stocks/ProductInStock';

export const getGoodsStockSummary = async (): Promise<GoodsStockSummaryItem[]> => {
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

export const getProductInStock = async (): Promise<ProductInStock[]> => {
	const mockProductInStock: ProductInStock[] = [
    {
        id: '1a2b3c4d-1111-4aaa-8bbb-111111111111', // GUID của bản ghi tồn kho
        productId: '550e8400-e29b-41d4-a716-446655440001', // GUID của sản phẩm
        productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876541', // GUID của biến thể
        image: 'https://pethouse.com.vn/wp-content/uploads/2023/01/bio-gentadrop1.jpg',
        name: '[BIO GENTADROP] [10 ML] Dung dịch nhỏ mắt',
        variantSku: 'BIO-GENTA-10ML-V1',
        replenishment: 'immediate',
        stock: 1, 
        sales7d: 0,
        sales30d: 0,
        supplierName: 'Công ty ABC',
    },
    {
        id: '2b3c4d5e-2222-4aaa-8bbb-222222222222',
        productId: '550e8400-e29b-41d4-a716-446655440002',
        productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876542',
        image: 'https://gaohouse.vn/wp-content/uploads/2024/05/ao-nhom-dong-phuc-teambuilding-46.jpg',
        name: 'Set quần áo cực chất - test',
        variantSku: 'CLO-SET-007-XL-RED-01',
        replenishment: 'early',
        stock: 180, 
        sales7d: 0,
        sales30d: 1,
        supplierName: 'Công ty XYZ',
    },
    {
        id: '3c4d5e6f-3333-4aaa-8bbb-333333333333',
        productId: '550e8400-e29b-41d4-a716-446655440003',
        productVariantId: 'c8e1467a-1234-4f01-a12b-d32109876543',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBz0OMpGFkgG64mmiLbWJ5YzOY-cv5H8Ay-A&s',
        name: 'Son 7 màu dưỡng ẩm c hồng khô nứt',
        variantSku: 'LIP-7C-PINK-M',
        replenishment: 'normal',
        stock: 120, 
        sales7d: 2, 
        sales30d: 5, 
        supplierName: 'Công ty TNHH một thành viên',
    },
];

	return mockProductInStock;
};
