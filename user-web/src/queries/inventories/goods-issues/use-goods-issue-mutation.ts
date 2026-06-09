import { useMutation, useQuery } from '@tanstack/react-query';
import { GoodsIssueDetail } from '@/types/inventories/issues/uis/GoodsIssueDetail';
import {
	getProductsForIssue,
	submitGoodsIssueForm,
} from '@/services/inventories/goods-issues/goods-issue-detail-service';
import { getGoodsSupplier } from '@/services/inventories/suppliers/goods-supplier-service';

export function useGoodsIssueMutation(currentSupplierId: string) {
	// Gọi song song 2 hàm lấy dữ liệu phụ trợ cho Form (Nhà cung cấp & Sản phẩm)
	const supplierAndProductQuery = useQuery({
		// Đưa currentSupplierId vào queryKey để khi đổi nhà cung cấp, nó sẽ tự gọi lại API lấy sản phẩm tương ứng
		queryKey: ['goods-issue-aux-data', currentSupplierId],
		queryFn: async () => {
			const [suppliers, products] = await Promise.all([
				getGoodsSupplier(),
				getProductsForIssue(),
			]);

			return { suppliers, products };
		},
		staleTime: 1000 * 60 * 15, // Cache 15 phút
	});

	// Mutation xử lý gửi Form
	const submitMutation = useMutation({
		mutationFn: ({ data, isCreate }: { data: GoodsIssueDetail; isCreate: boolean }) =>
			submitGoodsIssueForm(data, isCreate),
	});

	return {
		supplierAndProductQuery,
		submitMutation,
	};
}
