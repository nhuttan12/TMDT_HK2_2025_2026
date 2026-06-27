using api.Dtos.Products.Request;
using api.model.Products;
using api.Models.Inventory;
using api.Utilities;
using System;

namespace api.Models.Products;

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
    public Product Product { get; private set; } = default!;
    public string Sku { get; private set; } = string.Empty;
    public string Name { get; private set; } = string.Empty;
    public decimal CostPrice { get; private set; }
    public decimal SellPrice { get; private set; }
    public string ImageUrl { get; private set; } = string.Empty;
    public VariantStatus Status { get; private set; }

    public ICollection<GoodsReceiptBatchVariant> GoodsReceiptBatchVariants { get; private set; } = new HashSet<GoodsReceiptBatchVariant>();
    public ICollection<GoodsIssueDetail> GoodsIssueDetails { get; private set; } = new HashSet<GoodsIssueDetail>();
    public ICollection<InventoryBatchStock> InventoryBatchStocks { get; private set; } = new HashSet<InventoryBatchStock>();

    // 1. Constructor bắt buộc dành riêng cho EF Core (Không dùng để khởi tạo mới)
    protected Variant() { }

    // 2. Nhận ID (Sequential GUID) từ ngoài truyền vào, KHÔNG DÙNG Guid.NewGuid()
    private Variant(Guid id, Guid productId, string sku, string name, decimal costPrice, decimal sellPrice, string imageUrl, VariantStatus status)
    {
        Id = id;
        ProductId = productId;
        Name = name;
        Sku = sku;
        CostPrice = costPrice;
        SellPrice = sellPrice;
        ImageUrl = imageUrl;
        Status = status;
    }

    // 3. Factory Method nhận ID tuần tự do App sinh ra
    internal static Result<Variant> InternalCreate(Guid id, Guid productId,  string name, string sku, decimal costPrice, decimal sellPrice, string imageUrl)
    {
        // Fail Fast Validation
        if (string.IsNullOrWhiteSpace(sku))
            return Result<Variant>.Failure(Error.Create("Variant.SkuRequired", "Mã SKU không được trống.", ErrorType.Validation));

        if (string.IsNullOrWhiteSpace(name))
            return Result<Variant>.Failure(Error.Create("Variant.NameRequired", "Tên biến thể không được trống.", ErrorType.Validation));

        if (costPrice < 0 || sellPrice < 0)
            return Result<Variant>.Failure(Error.Create("Variant.InvalidPrice", "Giá không được nhỏ hơn 0.", ErrorType.Validation));

        // Khởi tạo an toàn
        var variant = new Variant(id, productId, sku, name, costPrice, sellPrice, imageUrl, VariantStatus.Active);
        return Result<Variant>.Success(variant);
    }

    internal void Update(Variant variant, VariantUpdateDto updateDto)
    {
        throw new NotImplementedException();
    }

    internal void Delete()
    {
        this.Status = VariantStatus.Inactive;
    }
}