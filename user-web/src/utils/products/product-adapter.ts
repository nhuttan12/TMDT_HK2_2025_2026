import { ProductVariantAdmin } from '@/types/products/admin/variant/ProductVariantAdmin';
import { ProductDetail } from '@/types/products/user/ProductDetail';
import { ProductDetailRawUser } from '@/types/products/user/ProductDetailRawUser';
import { ProductTierVariation } from '@/types/products/user/ProductTierVariation';
import { ProductVariantUser } from '@/types/products/user/ProductVariantUser';

export const convertRawUserToProductDetail = (rawData: ProductDetailRawUser): ProductDetail => {
    // 1. Khởi tạo mảng chứa các tuỳ chọn của từng Tier
    const tierOptions: string[][] = [[], []];

    // 2. Bóc tách chuỗi Name của Admin Variant thành các Tiers
    rawData.productVariants.forEach((variant: ProductVariantAdmin): void => {
        // Giả định naming convention của admin là: "Option 1 - Option 2"
        const parts: string[] = variant.name.split(' - ').map((s: string) => s.trim());
        
        if (parts[0] && !tierOptions[0].includes(parts[0])) {
            tierOptions[0].push(parts[0]);
        }
        if (parts[1] && !tierOptions[1].includes(parts[1])) {
            tierOptions[1].push(parts[1]);
        }
    });

    // 3. Hình thành mảng TierVariations cho UI
    const tierVariations: ProductTierVariation[] = tierOptions
        .map((options: string[], index: number): ProductTierVariation => ({
            name: index === 0 ? 'Kích thước' : 'Phân loại', // Hardcode hoặc có thể tự động lấy từ config
            options: options,
        }))
        .filter((tier: ProductTierVariation): boolean => tier.options.length > 0);

    // 4. Map Admin Variant thành User Variant (Sử dụng mảng Index)
    const userVariants: ProductVariantUser[] = rawData.productVariants.map((variant: ProductVariantAdmin): ProductVariantUser => {
        const parts: string[] = variant.name.split(' - ').map((s: string) => s.trim());
        
        const tierIndex: number[] = [
            tierOptions[0].indexOf(parts[0]),
            parts[1] ? tierOptions[1].indexOf(parts[1]) : -1,
        ].filter((index: number) => index !== -1);

        return {
            id: variant.id,
            sku: variant.sku,
            tierIndex: tierIndex,
            price: variant.salePrice,
            stock: variant.quantity,
            isActive: variant.quantity > 0, // Cập nhật isActive dựa trên kho
            image: variant.image,
        };
    });

    // 5. Tính toán Min/Max Price hiển thị
    const prices: number[] = userVariants.map((v: ProductVariantUser) => v.price);
    const minPrice: number = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice: number = prices.length > 0 ? Math.max(...prices) : 0;

    // 6. Trả về cấu trúc ProductDetail chuẩn cho Hook và UI
    return {
        id: rawData.id,
        name: rawData.name,
        brand: rawData.supplierName,
        description: rawData.description,
        rating: rawData.rating,
        discount: rawData.discount ?? 0,
        
        shop: rawData.shop,
        
        minPrice,
        maxPrice,
        
        // Trích xuất mảng ảnh dạng chuỗi và sắp xếp theo order
        images: rawData.images
            .sort((a, b) => a.order - b.order)
            .map((img) => img.imageUrl || ''),
            
        tierVariations: tierVariations,
        variants: userVariants,
        reviews: rawData.reviews,
    };
};
