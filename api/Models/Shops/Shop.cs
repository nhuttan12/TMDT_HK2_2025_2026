using api.model.Products;
using api.Models.Inventory;
using api.Models.Orders;
using api.Models.Shops.Enums;
using api.Utilities;

namespace api.Models.Shops
{
    public class Shop
    {
        public const int MaxNameLength = 255;
        public const int MinNameLength = 2;
        public const int MaxDescriptionLength = 1000;
        public Guid Id { get; private set; }

        public User User { get; private set; } = null!;

        public EShopStatus Status { get; private set; }
        public EShopSystemStatus SystemStatus { get; private set; }

        public int Rating { get; private set; }
        public string Name { get; private set; }
        public string TaxCode { get; private set; }
        public string? Description { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public string ShopLogos { get; private set; } = string.Empty;
        public ICollection<Product> Products { get; private set; } = new HashSet<Product>();
        public ICollection<Invoice> Invoices { get; private set; } = new HashSet<Invoice>();
        public ICollection<Supplier> Suppliers { get; private set; } = new HashSet<Supplier>();

        protected Shop() { }
        public Shop(User user,  string name, string description, string shopLogos)
        {
            Id = user.Id;
            User = user;
            Status = EShopStatus.ACTIVE;
            SystemStatus = EShopSystemStatus.APPROVED;
            Rating = 0;
            Name = name;
            TaxCode = string.Empty;
            Description = description;
            ShopLogos = shopLogos;
        }
        /// <summary>
        /// Factory method to create a new Shop instance with validation.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="name"></param>
        /// <param name="description"></param>
        /// <param name="shopLogos"></param>
        /// <returns></returns>
        public static Result<Shop> Create(User user, string name, string description, string shopLogos)
        {
            // 1. Validate ID
            if (user is null)
            {
                return Result<Shop>.Failure(Error.Create("SHOP_USER_INVALID", "Shop owner (User) is required.", ErrorType.Validation));
            }

            // 3. Validate Name (Bắt buộc nhập, không chứa toàn khoảng trắng)
            if (string.IsNullOrWhiteSpace(name))
            {
                return Result<Shop>.Failure(Error.Create("SHOP_NAME_EMPTY", "Shop name cannot be null or whitespace.", ErrorType.Validation));
            }

            // 4. Validate Name Length
            if (name.Length < MinNameLength)
            {
                return Result<Shop>.Failure(Error.Create("SHOP_NAME_TOO_SHORT", $"Shop name must be at least {MinNameLength} characters.", ErrorType.Validation));
            }

            if (name.Length > MaxNameLength)
            {
                return Result<Shop>.Failure(Error.Create("SHOP_NAME_TOO_LONG", $"Shop name cannot exceed {MaxNameLength} characters.", ErrorType.Validation));
            }

            // 5. Validate Description Length (Tùy chọn nhập, nhưng nếu nhập thì phải giới hạn)
            if (!string.IsNullOrWhiteSpace(description) && description.Length > MaxDescriptionLength)
            {
                return Result<Shop>.Failure(Error.Create("SHOP_DESC_TOO_LONG", $"Shop description cannot exceed {MaxDescriptionLength} characters.", ErrorType.Validation));
            }
            // 6. Validate ShopLogos (Tùy chọn, nhưng nếu nhập thì phải là URL hợp lệ)
            if (!string.IsNullOrWhiteSpace(shopLogos) && !Uri.IsWellFormedUriString(shopLogos, UriKind.Absolute))
            {
                return Result<Shop>.Failure(Error.Create("SHOP_LOGOS_INVALID", "Shop logos must be a valid URL.", ErrorType.Validation));
            }

            // Nếu qua hết các chốt chặn (Fail Fast), khởi tạo object.
            // Tối ưu hóa: trim() khoảng trắng thừa của string để data lưu vào Database sạch sẽ.
            return Result<Shop>.Success(new Shop(user, name.Trim(), description?.Trim(), shopLogos));
        }
    }
}
