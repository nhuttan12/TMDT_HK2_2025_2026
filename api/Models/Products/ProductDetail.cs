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
        protected ProductDetail(string summary, string html)
        {
            Summary = summary;
            DescriptionHtml = html;
        }
        internal static ProductDetail Create()
        {
            return new ProductDetail();
        }

        // Áp dụng Result Pattern để bắt lỗi cấp phát dữ liệu rác vào RAM
        internal static Result<ProductDetail> InternalCreate(Guid idProduct, string summary, string html)
        {
            // Có thể bổ sung kiểm tra dung lượng HTML nếu cần để tránh tấn công cạn kiệt bộ nhớ (OOM)

            return Result<ProductDetail>.Success(new ProductDetail
            {
                ProductId = idProduct,
                Summary = summary ?? string.Empty,
                DescriptionHtml = html ?? string.Empty
            });
        }

        internal static ProductDetail? Create(Guid empty1, string empty2, string empty3)
        {
            throw new NotImplementedException();
        }
    }

}
