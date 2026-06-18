// Nằm trong cùng file service hoặc tách ra file type riêng
export interface BackendVariant {
	id: string;
	sku: string;
	name: string;
	costPrice: number;
	sellPrice: number;
	imageUrl: string;
	status: string;
}

export interface BackendProduct {
	id: string;
	name: string;
	basePrice: number;
	rating: number;
	status: string;
	imageUrls: string[];
	variants: BackendVariant[];
}

export interface BackendPagination {
	items: BackendProduct[]; // Chú ý: Backend dùng chữ "items"
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}
