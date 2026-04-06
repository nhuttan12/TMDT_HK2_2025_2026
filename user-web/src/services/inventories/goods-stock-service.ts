import { GoodsStockSummaryItem } from '@/types/inventories/stocks/GoodsStockSummaryItem';

export const fetchGoodsStockData = async (): Promise<GoodsStockSummaryItem[]> => {
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
