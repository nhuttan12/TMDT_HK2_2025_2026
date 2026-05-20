using api.Utilities;

namespace api.model.Products;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public decimal BasePrice { get; private set; }

    // Xóa từ khóa 'virtual' để chống N+1 Queries (Lazy Loading)
    public ProductDetail? Detail { get; private set; }

    // Sử dụng Collection Expression của C# 12+ để tối ưu cấp phát
    private readonly HashSet<Variant> _variants = [];
    public IReadOnlyCollection<Variant> Variants => _variants;

    // Ưu tiên DateTimeOffset cho các hệ thống phân tán và DB SQL Server
    public DateTimeOffset CreatedAt { get; private set; }
    public DateTimeOffset UpdatedAt { get; private set; }

    // Dành riêng cho EF Core khi query (không dùng để tạo mới)
    protected Product() { }

    private Product(string name, decimal basePrice, DateTimeOffset createdAt)
    {
        Id = Guid.NewGuid();
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

        Detail = ProductDetail.InternalCreate(this.Id, summary, descriptionHtml);
        UpdatedAt = updatedAt;
    }

    public Result<bool> AddVariant(string name, decimal price, string imageUrl, DateTimeOffset updatedAt)
    {
        // Fail Fast validation
        if (price < 0)
            return Result<bool>.Failure(
                new Error("Variant.InvalidPrice", "Giá biến thể không hợp lệ."),
                ErrorType.Validation);

        // OrdinalIgnoreCase tốt cho memory nhưng cần đảm bảo DB cũng có Unique Constraint
        if (_variants.Any(v => v.Name.Equals(name, StringComparison.OrdinalIgnoreCase)))
            return Result<bool>.Failure(
                new Error("Variant.DuplicateName", $"Biến thể '{name}' đã tồn tại."),
                ErrorType.Validation);

        _variants.Add(Variant.InternalCreate(this.Id, name, price, imageUrl));
        UpdatedAt = updatedAt;

        return Result<bool>.Success(true);
    }
}

public class ProductDetail
{
    public Guid ProductId { get; private set; }
    public string Summary { get; private set; } = string.Empty;
    public string DescriptionHtml { get; private set; } = string.Empty;

    // Xóa 'virtual'
    public Product Product { get; private set; } = null!;

    protected ProductDetail() { }

    internal static ProductDetail InternalCreate(Guid productId, string summary, string html) =>
        new() { ProductId = productId, Summary = summary, DescriptionHtml = html };
}

public class Variant
{
    public Guid Id { get; private set; }
    public Guid ProductId { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public decimal Price { get; private set; }
    public string ImageUrl { get; private set; } = string.Empty;

    protected Variant() { }

    internal static Variant InternalCreate(Guid productId, string name, decimal price, string imageUrl) =>
        new() { Id = Guid.NewGuid(), ProductId = productId, Name = name, Price = price, ImageUrl = imageUrl };
}