export interface ProductVariantShipping {
	weightInGram?: number;

	dimensionsInCm?: {
		length: number;
		width: number;
		height: number;
	};
}