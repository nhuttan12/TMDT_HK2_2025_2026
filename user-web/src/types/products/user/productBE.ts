export interface BackendVariant {
	id: string;
	sku: string;
	name: string;
	costPrice: number;
	sellPrice: number;
	imageUrl: string;
	status: string;
}

export interface BackendProductItem {
	id: string;
	name: string;
	basePrice: number;
	rating: number;
	status: string;
	imageUrls: string[];
	variants: BackendVariant[];
}

export interface BackendPaginationData {
	items: BackendProductItem[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface ShopBE {
	id: string;
	name: string;
	shopLogos: string;
}


export interface ProductDetailBE {
	id: string;
	name: string;
	basePrice: number;
	rating: number;
	status: string;
	shop: ShopBE;
	description: string;
	imageUrls: string[];
	variants: BackendVariant[];
}