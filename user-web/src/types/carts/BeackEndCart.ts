export interface BackEndCart {
	userid: string;
	cartItems: BackEndCartItem[];
}

export interface BackEndCartItem {
	productId: string;
	variantId: string;
	sku : string;
	imageUrl: string;
	unitPrice: number;
	quantity: number;
}
