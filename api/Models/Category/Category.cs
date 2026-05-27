using api.model.Products;
using api.Utilities;

namespace api.Models.Category
{
    public class Category
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public string Sku { get; private set; } = string.Empty;
        public string ImageUrl { get; private set; } = string.Empty;

        //private readonly HashSet<Product> _products = [];
        //public IReadOnlyCollection<Product> Products => _products;

        // Đồng bộ kiểu dữ liệu với Product, tốt cho hệ thống phân tán và lưu trữ SQL Server
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset? UpdatedAt { get; private set; } // Bổ sung để tracking cập nhật

        // Dành riêng cho EF Core khi query data (Materialization)
        protected Category() { }

        // Private constructor: Ép buộc mọi khởi tạo phải đi qua Factory Method
        private Category(string name, string sku, string imageUrl)
        {
            Id = Guid.NewGuid();
            Name = name;
            Sku = sku;
            ImageUrl = imageUrl;
        }

        // Pass tham số thời gian từ Services (DI IDateTimeProvider) để dễ dàng Mocking/Unit Test
        public static Result<Category> Create(string name, string sku, string imageUrl)
        {
            // Áp dụng Fail Fast để tối ưu CPU/Memory, tránh cấp phát Object nếu data không hợp lệ
            if (string.IsNullOrWhiteSpace(name))
                return Result<Category>.Failure(
                    new Error("Category.NameRequired", "Tên danh mục không được để trống."),
                    ErrorType.Validation);

            if (string.IsNullOrWhiteSpace(sku))
                return Result<Category>.Failure(
                    new Error("Category.SkuRequired", "Mã SKU không được để trống."),
                    ErrorType.Validation);


            return Result<Category>.Success(new Category(name, sku, imageUrl));
        }

        // Ví dụ về method thay đổi trạng thái (tránh dùng setter public)
        public Result<bool> UpdateDetails(string name, string sku, string imageUrl, DateTimeOffset updatedAt)
        {
            if (string.IsNullOrWhiteSpace(name))
                return Result<bool>.Failure(
                    new Error("Category.NameRequired", "Tên danh mục không được để trống."),
                    ErrorType.Validation);

            if (string.IsNullOrWhiteSpace(sku))
                return Result<bool>.Failure(
                    new Error("Category.SkuRequired", "Mã SKU không được để trống."),
                    ErrorType.Validation);

            // Tối ưu CPU: Tránh Update Database nếu data không đổi
            if (Name.Equals(name, StringComparison.Ordinal) && Sku.Equals(sku, StringComparison.Ordinal) && ImageUrl.Equals(imageUrl, StringComparison.Ordinal))
                return Result<bool>.Success(true);

            Name = name;
            Sku = sku;
            ImageUrl = imageUrl;

            return Result<bool>.Success(true);
        }
    }
}
