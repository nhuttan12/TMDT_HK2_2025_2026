using api.Dtos.Products.Request;
using api.Models;
using api.Models.Category;
using api.Models.Enums.Products;
using api.Models.Enums.Shops;
using api.Models.Inventory;
using api.Models.Products;
using api.Models.Promotions;
using api.Models.Shops;
using api.Utilities;

namespace api.model.Products
{
    public enum ProductStatus
    {
        PendingApproval = 0,
        Approved = 1,
        Rejected = 2,
        Banned = 3
    }
    public class Product
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public decimal BasePrice { get; private set; }
        // TỐI ƯU ENCAPSULATION CHO DANH SÁCH ẢNH
        public decimal Rating { get; private set; }
        private readonly List<string> _imageUrls = [];
        public IReadOnlyCollection<string> ImageUrls => _imageUrls;
        public ProductStatus Status { get; private set; } = ProductStatus.Approved;
        public Guid CategoryId { get; private set; }

        public Guid ShopId { get; private set; }
        public Shop Shop { get; private set; }

        public ProductDetail? Detail { get; private set; }
        public EProductSystemStatus ProductSystemStatus { get; private set; }

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

        private Product(Guid id, string name, decimal basePrice, string imageUrl, Guid categoryId, Guid shopId)
        {
            Id = id;
            Name = name;
            BasePrice = basePrice;
            CategoryId = categoryId;
            ShopId = shopId;
            Shop = null!; // Để EF Core tự động nạp khi cần
            _imageUrls.Add(imageUrl); // Thêm URL đầu tiên vào danh sách ảnh
        }

        // Pass thời gian từ Services vào để dễ dàng Mock/Unit Test
        public static Result<Product> Create(Guid id, string name, decimal basePrice, string imageUrl, Guid categoryId, Guid shopId, decimal costPrice, string Sku, string description, string summary)
        {
            // Fail Fast với các mã lỗi chuẩn (Constants)
            if (string.IsNullOrWhiteSpace(name))
                return Result<Product>.Failure(
                    Error.Create("Product.NameRequired", "Tên sản phẩm không được để trống.", ErrorType.Validation));

            if (basePrice < 0)
                return Result<Product>.Failure(
                    Error.Create("Product.InvalidPrice", "Giá sản phẩm không được nhỏ hơn 0.", ErrorType.Validation));
            if (categoryId == Guid.Empty)
                return Result<Product>.Failure(Error.Create("Product.CategoryRequired", "CategoryId không hợp lệ.", ErrorType.Validation));
            if (string.IsNullOrWhiteSpace(imageUrl))
                return Result<Product>.Failure(Error.Create("Product.ImageRequired", "Phải có ít nhất 1 hình ảnh khi tạo sản phẩm.", ErrorType.Validation));
            if (string.IsNullOrWhiteSpace(Sku))
                return Result<Product>.Failure(Error.Create("Product.SkuRequired", "Sku không được để trống.", ErrorType.Validation));
            if (string.IsNullOrWhiteSpace(description))
                return Result<Product>.Failure(Error.Create("Product.DescriptionRequired", "Mô tả sản phẩm không được để trống.", ErrorType.Validation));
            if (string.IsNullOrWhiteSpace(summary))
                return Result<Product>.Failure(Error.Create("Product.SummaryRequired", "Tóm tắt sản phẩm không được để trống.", ErrorType.Validation));

            var product = new Product(id, name, basePrice, imageUrl, categoryId, shopId);
            product.SetDetail(id, summary, description);
            product.AddVariant("default", Sku, basePrice, costPrice, imageUrl);
            return Result<Product>.Success(product);
        }
        // 2. CÁC HÀM QUẢN LÝ ẢNH (Result Pattern)
        public Result<bool> AddImage(string imageUrl)
        {
            if (string.IsNullOrWhiteSpace(imageUrl))
                return Result<bool>.Failure(Error.Create("Image.Empty", "URL không hợp lệ.", ErrorType.Validation));

            if (_imageUrls.Contains(imageUrl))
                return Result<bool>.Failure(Error.Create("Image.Duplicate", "Hình ảnh đã tồn tại.", ErrorType.Validation));

            if (_imageUrls.Count >= 10) // Ví dụ: Giới hạn 10 ảnh
                return Result<bool>.Failure(Error.Create("Image.LimitExceeded", "Tối đa 10 hình ảnh.", ErrorType.Validation));

            _imageUrls.Add(imageUrl);
            return Result<bool>.Success(true);
        }

        public void RemoveImage(string imageUrl)
        {
            _imageUrls.Remove(imageUrl);
        }
        public void SetDetail(Guid idProduct,string summary, string descriptionHtml)
        {
            // Tránh cấp phát mới nếu dữ liệu không đổi (Tối ưu CPU & GC)
            if (Detail?.Summary == summary && Detail?.DescriptionHtml == descriptionHtml)
                return;

            Detail = ProductDetail.InternalCreate( idProduct, summary, descriptionHtml).Value;
        }

        public Result<bool> AddVariant(string name, string sku, decimal sellPrice, decimal costPrice, string imageUrl)
        {
            // 1. Fail Fast validation ở tầng Product
            if (sellPrice < 0)
                return Result<bool>.Failure(Error.Create("Variant.InvalidPrice", "Giá bán biến thể không hợp lệ.", ErrorType.Validation));

            if (costPrice < 0)
                return Result<bool>.Failure(Error.Create("Variant.InvalidCostPrice", "Giá vốn biến thể không hợp lệ.", ErrorType.Validation));

            if (_variants.Any(v => v.Name.Equals(name, StringComparison.OrdinalIgnoreCase)))
                return Result<bool>.Failure(Error.Create("Variant.DuplicateName", $"Biến thể '{name}' đã tồn tại.", ErrorType.Validation));

            Guid variantId = Guid.CreateVersion7(); 
            var variantResult = Variant.InternalCreate(variantId, this.Id, name, sku, sellPrice, costPrice, imageUrl);

            // 3. Nếu Variant từ chối khởi tạo (vd: mã SKU bị rỗng), Product lập tức trả lỗi về cho Controller
            if (variantResult.IsFailure)
                return Result<bool>.Failure(variantResult.Error);

            // 4. Khi IsFailure = false, Value chắc chắn tồn tại (dấu ! báo cho trình biên dịch biết điều này)
            _variants.Add(variantResult.Value!);

            return Result<bool>.Success(true);
        }

       

        internal void Lock()
        {
            Status = ProductStatus.Banned; // Soft delete: Cập nhật trạng thái thay vì xóa vật lý
        }

        internal void Update(string name, decimal basePrice, List<string> imageUrls, ProductStatus status)
        {
            Name = name;
            BasePrice = basePrice;
            Status = status;
            if(imageUrls != null)
            {
                foreach (var url in imageUrls)
                {
                    if (!_imageUrls.Contains(url))
                    {
                        _imageUrls.Add(url);
                    }
                }
            }
        }
    }
}
