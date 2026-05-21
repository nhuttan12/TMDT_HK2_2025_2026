using api.model.Products;
using api.Utilities;

namespace api.Models.Products
{
    public class ProductDetail
    {
        public Guid ProductId { get; private set; }
        public string Summary { get; private set; } = string.Empty;
        public string DescriptionHtml { get; private set; } = string.Empty;

        public Product Product { get; private set; } = null!;

        protected ProductDetail() { }

        // Áp dụng Result Pattern để bắt lỗi cấp phát dữ liệu rác vào RAM
        internal static Result<ProductDetail> InternalCreate(Guid productId, string summary, string html)
        {
            if (productId == Guid.Empty)
                return Result<ProductDetail>.Failure(new Error("ProductDetail.ProductIdRequired", "ProductId không hợp lệ."), ErrorType.Validation);

            // Có thể bổ sung kiểm tra dung lượng HTML nếu cần để tránh tấn công cạn kiệt bộ nhớ (OOM)

            return Result<ProductDetail>.Success(new ProductDetail
            {
                ProductId = productId,
                Summary = summary ?? string.Empty,
                DescriptionHtml = html ?? string.Empty
            });
        }
    }

}
