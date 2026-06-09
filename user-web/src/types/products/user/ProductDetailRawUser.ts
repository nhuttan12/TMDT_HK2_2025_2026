import { ProductDetailInfoAdmin } from '@/types/products/admin/ProductDetailInfoAdmin';
import { ProductShop } from './ProductShop';
import { Review } from './Review';

// Dùng Omit để loại bỏ các trường nhạy cảm của Admin (Giá nhập, Trạng thái hệ thống)
export interface ProductDetailRawUser extends Omit<ProductDetailInfoAdmin, 'importPrice' | 'systemStatus' | 'costPrice'> {
    shop: ProductShop;
    reviews: Review[];
    rating: number;
}