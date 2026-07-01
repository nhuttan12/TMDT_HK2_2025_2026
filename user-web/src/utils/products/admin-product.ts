import { UploadStatus } from '@/types/images/admin/UploadStatus';
import { BackendProductDetailDto } from '@/types/products/admin/BackendProductDetailDto';
import { BackendProductDTO } from '@/types/products/admin/BackendProductDTO';
import { ProductCreateDTO } from '@/types/products/admin/ProductCreateDTO';
import { ProductFormState } from '@/types/products/admin/ProductFormState';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { ProductUpdateDTO } from '@/types/products/admin/ProductUpdateDTO';
import { ProductSystemStatus } from '@/types/products/admin/variant/ProductSystemStatus';
import { BackendPagedResult } from '@/types/products/user/productBE';

export const mapFormToCreateDTO = (form: ProductFormState): ProductCreateDTO => ({
	name: form.name,
	description: form.description,
	discount: form.discount,
	systemStatus: form.systemStatus,
	categoryId: form.categoryId,
	images: form.images,
});

export const mapFormToUpdateDTO = (form: ProductFormState): ProductUpdateDTO => ({
	id: form.id,
	name: form.name,
	description: form.description,
	discount: form.discount,
	categoryId: form.categoryId,
	images: form.images,
});

export const mapProductDetailToFrontend = (apiData: BackendProductDetailDto) => {
    return {
        id: apiData.id,
        name: apiData.name,
        supplierName: apiData.supplierName,
        description: apiData.description,
        importPrice: apiData.importPrice,
        discount: apiData.discount,

        // Đổi tên trường cho khớp với Mock data
        systemStatus: apiData.status as ProductSystemStatus, 
        category: apiData.category,

        // Map mảng string thành mảng object hình ảnh
        images: (apiData.imageUrls || []).map((url, index) => ({ 
            localId: crypto.randomUUID(), // Tạo ID ngẫu nhiên cho UI quản lý ảnh
            imageUrl: url,
            order: index,
            isPrimary: index === 0, // Ảnh đầu tiên tự động làm ảnh chính
            status: 'done' as UploadStatus, // Mặc định ảnh từ API đã upload xong
            progress: 100,
        })),

        createdAt: apiData.createdAt,
        updatedAt: apiData.updatedAt,

        // Đổi tên trường chứa danh sách biến thể
        productVariants: apiData.variants || [],
    };
};

const mapProductStatus = (backendStatus: string): ProductSystemStatus => {
    switch (backendStatus) {
        case 'PendingApproval':
            return 'pending_approval';
        case 'Approved':
            return 'approved';
        case 'Rejected':
            return 'rejected';
        case 'Banned':
            return 'banned';
        default:
            // Fallback an toàn nếu Backend trả về status không xác định
            return 'pending_approval'; 
    }
};


export const mapBackendProductToAdmin = (backendProduct: BackendProductDTO): ProductListInfoAdmin => {
    return {
        id: backendProduct.id,
        name: backendProduct.name,
        image: backendProduct.image,
        createdAt: backendProduct.createdAt,
        updatedAt: backendProduct.updatedAt,
        // Chuyển đổi tên trường và giá trị trạng thái
        systemStatus: mapProductStatus(backendProduct.status),
    };
};

/**
 * Hàm ánh xạ toàn bộ Response phân trang của Backend sang định dạng của Frontend
 */
export const mapBackendPagedProductToAdmin = (
    backendResponse: BackendPagedResult<BackendProductDTO>
): BackendPagedResult<ProductListInfoAdmin> => {
    return {
        // Giữ nguyên các metadata phân trang
        totalCount: backendResponse.totalCount,
        pageNumber: backendResponse.pageNumber,
        pageSize: backendResponse.pageSize,
        totalPages: backendResponse.totalPages,
        hasNextPage: backendResponse.hasNextPage,
        hasPreviousPage: backendResponse.hasPreviousPage,
        
        // Map qua từng item trong mảng
        items: backendResponse.items.map((item: BackendProductDTO) => mapBackendProductToAdmin(item)),
    };
};