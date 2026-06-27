export interface BackendVariant {
	id: string;
	sku: string;
	name: string;
	costPrice: number;
	sellPrice: number;
	imageUrl: string;
	status: string;
	quantityInStock: number;
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

export interface BackendPagedResult<T> {
	items: T[];
	totalCount: number;
	pageNumber: number;
	pageSize: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface BackEndShop {
	id: string;
	name: string;
	shopLogos: string;
}


export interface BackEndProductDetail {
	id: string;
	name: string;
	basePrice: number;
	rating: number;
	status: string;
	shop: BackEndShop;
	description: string;
	imageUrls: string[];
	variants: BackendVariant[];
}