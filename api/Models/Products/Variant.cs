using api.Utilities;

namespace api.Models.Products
{
    public enum VariantStatus
    {
        Inactive = 0,
        Active = 1,
        OutOfStock = 2
    }
    public class Variant
    {
        public Guid Id { get; private set; }
        public Guid ProductId { get; private set; }
        public string Sku { get; private set; } = string.Empty; // Sửa SKU thành Sku
        public string Name { get; private set; } = string.Empty;

        public decimal CostPrice { get; private set; }
        public decimal SellPrice { get; private set; }
        public string ImageUrl { get; private set; } = string.Empty;

        public VariantStatus Status { get; private set; }


        // Dùng Private Constructor thay vì Object Initializer để bảo vệ tính toàn vẹn
        private Variant(Guid productId, string sku, string name, decimal costPrice, decimal sellPrice, string imageUrl, VariantStatus status)
        {
            Id = Guid.NewGuid();
            ProductId = productId;
            Sku = sku;
            Name = name;
            CostPrice = costPrice;
            SellPrice = sellPrice;
            ImageUrl = imageUrl;
            Status = status;
        }

        // Factory Method với Result Pattern
        internal static Result<Variant> InternalCreate(Guid productId, string sku, string name, decimal costPrice, decimal sellPrice, string imageUrl)
        {
            // 1. Fail Fast Validation (Chặn lỗi ngay trên RAM)
            if (string.IsNullOrWhiteSpace(sku))
                return Result<Variant>.Failure(new Error("Variant.SkuRequired", "Mã SKU không được trống."), ErrorType.Validation);

            if (string.IsNullOrWhiteSpace(name))
                return Result<Variant>.Failure(new Error("Variant.NameRequired", "Tên biến thể không được trống."), ErrorType.Validation);

            if (costPrice < 0 || sellPrice < 0)
                return Result<Variant>.Failure(new Error("Variant.InvalidPrice", "Giá không được nhỏ hơn 0."), ErrorType.Validation);

         
            return Result<Variant>.Success(new Variant(productId, sku, name, costPrice, sellPrice, imageUrl, VariantStatus.Active));
        }
    }
}
