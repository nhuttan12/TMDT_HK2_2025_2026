import { BackendVariantDto } from "./variant/BackendVariantDto";

export interface BackendProductDetailDto {
    id: string;
    name: string;
    supplierName: string;
    description: string;
    importPrice: number;
    discount: number;
    status: string;
    category: string;
    imageUrls: string[];
    createdAt: string;
    updatedAt: string;
    variants: BackendVariantDto[];
}