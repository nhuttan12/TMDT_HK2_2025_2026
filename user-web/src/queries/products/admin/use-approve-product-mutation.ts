'use client';

import { apiClient } from '@/lib/api-client';
import { ProductAdminService } from '@/services/products/admin/product-admin-service';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useApproveProductMutation = (
    // Cho phép truyền thêm các options như onSuccess, onError từ component
    options?: UseMutationOptions<string, Error, string> 
) => {
    const productAdminService = new ProductAdminService(apiClient);

    return useMutation({
        // Biến truyền vào mutationFn chính là productId kiểu string
        mutationFn: async (productId: string) => {
            // Gọi hàm approveProduct từ class service của bạn
            return await productAdminService.approveProduct(productId);
        },
        ...options,
    });
};