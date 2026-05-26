using api.Models;
using api.Models.Category;
using api.Models.Inventory;
using api.Models.Products;
using api.Models.Promotions;
using api.Utilities;

namespace api.model.Products;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public decimal BasePrice { get; private set; }
    public decimal Rating { get; private set; }
    // Khóa ngoại lưu Id của Category
    public Guid CategoryId { get; private set; }
    public Guid ShopId { get; private set; }
    public ProductDetail? Detail { get; private set; }

    // Sử dụng Collection Expression của C# 12+ để tối ưu cấp phát
    private readonly HashSet<Variant> _variants = [];
    public IReadOnlyCollection<Variant> Variants => _variants;

    // Ưu tiên DateTimeOffset cho các hệ thống phân tán và DB SQL Server
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }

    public ICollection<InventoryBatchStock> InventoryBatchStocks { get; private set; } = new HashSet<InventoryBatchStock>();
    public ICollection<ProductPromotion> ProductPromotions { get; private set; } = new HashSet<ProductPromotion>();



    // Dành riêng cho EF Core khi query (không dùng để tạo mới)
    protected Product() { }

    private Product(string name, decimal basePrice, DateTimeOffset createdAt)
    {
        Id = Guid.Empty;
        Name = name;
        BasePrice = basePrice;
        CreatedAt = createdAt;
        UpdatedAt = createdAt;
    }

    // Pass thời gian từ Services vào để dễ dàng Mock/Unit Test
    public static Result<Product> Create(string name, decimal basePrice, DateTimeOffset createdAt)
    {
        // Fail Fast với các mã lỗi chuẩn (Constants)
        if (string.IsNullOrWhiteSpace(name))
            return Result<Product>.Failure(
                new Error("Product.NameRequired", "Tên sản phẩm không được để trống."),
                ErrorType.Validation);

        if (basePrice < 0)
            return Result<Product>.Failure(
                new Error("Product.InvalidPrice", "Giá sản phẩm không được nhỏ hơn 0."),
                ErrorType.Validation);

        return Result<Product>.Success(new Product(name, basePrice, createdAt));
    }

    public void SetDetail(string summary, string descriptionHtml, DateTimeOffset updatedAt)
    {
        // Tránh cấp phát mới nếu dữ liệu không đổi (Tối ưu CPU & GC)
        if (Detail?.Summary == summary && Detail?.DescriptionHtml == descriptionHtml)
            return;

        Detail = ProductDetail.InternalCreate(this.Id, summary, descriptionHtml).Value;
        UpdatedAt = updatedAt;
    }

    public Result<bool> AddVariant(string name, string sku, decimal sellPrice, decimal costPrice, string imageUrl, DateTimeOffset updatedAt)
    {
        // 1. Fail Fast validation ở tầng Product
        if (sellPrice < 0)
            return Result<bool>.Failure(new Error("Variant.InvalidPrice", "Giá bán biến thể không hợp lệ."), ErrorType.Validation);

        if (costPrice < 0)
            return Result<bool>.Failure(new Error("Variant.InvalidCostPrice", "Giá vốn biến thể không hợp lệ."), ErrorType.Validation);

        if (_variants.Any(v => v.Name.Equals(name, StringComparison.OrdinalIgnoreCase)))
            return Result<bool>.Failure(new Error("Variant.DuplicateName", $"Biến thể '{name}' đã tồn tại."), ErrorType.Validation);

        // 2. KHẮC PHỤC LỖI CS8604: Gọi Factory Method của Variant và hứng kết quả
        var variantResult = Variant.InternalCreate(this.Id, name, sku, sellPrice, costPrice, imageUrl);

        // 3. Nếu Variant từ chối khởi tạo (vd: mã SKU bị rỗng), Product lập tức trả lỗi về cho Controller
        if (variantResult.IsFailure)
            return Result<bool>.Failure(variantResult.Error, variantResult.ErrorType);

        // 4. Khi IsFailure = false, Value chắc chắn tồn tại (dấu ! báo cho trình biên dịch biết điều này)
        _variants.Add(variantResult.Value!);

        UpdatedAt = updatedAt;

        return Result<bool>.Success(true);
    }
}



