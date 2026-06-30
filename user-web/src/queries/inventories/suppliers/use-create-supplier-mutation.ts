import { apiClient } from "@/lib/api-client";
import { GoodsSupplierService } from "@/services/inventories/suppliers/goods-supplier-service";
import { CreateSupplierRequestDto } from "@/types/inventories/suppliers/CreateSupplierRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateSupplierMutation() {
    const queryClient = useQueryClient();
    const goodsSupplierService = new GoodsSupplierService(apiClient);

    return useMutation({
        // Nhận dữ liệu từ form (supplier) và gọi xuống Service
        mutationFn: (supplier: CreateSupplierRequestDto) => goodsSupplierService.createSupplier(supplier),
        
        onSuccess: (newId) => {
            if (newId) {
                // Tự động làm mới lại danh sách nhà cung cấp trên bảng (Table)
                // Thay ['supplier-list'] bằng đúng queryKey mà bạn đang dùng ở trang danh sách
                queryClient.invalidateQueries({ queryKey: ['supplier-list'] }); 
            }
        },
        onError: (error) => {
            console.error('Lỗi khi tạo nhà cung cấp:', error);
            // Có thể hiển thị Toast báo lỗi ở đây
        }
    });
}