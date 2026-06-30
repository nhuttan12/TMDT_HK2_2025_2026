export interface GetProductListRequest {
    /** Lọc theo giá thấp nhất */
    MinPrice?: number | null;

    /** Lọc theo giá cao nhất */
    MaxPrice?: number | null;

    /** Lọc theo mã/tên danh mục */
    Category?: string | null;

    /** Lọc theo tên cửa hàng */
    ShopName?: string | null;
}