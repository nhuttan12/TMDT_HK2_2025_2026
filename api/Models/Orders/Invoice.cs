using api.Models.Coupons;
using api.Models.Enums;
using api.Models.Shops;

namespace api.Models.Orders
{
    public class Invoice
    {
        public Guid Id { get; private set; }
        public decimal TotalAmount { get; private set; }
        public InvoiceStatus Status { get; private set; }

        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public Guid? ShopId { get; private set; }
        public Shop? Shop { get; private set; }

        public Guid? CouponId { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        private readonly List<InvoiceItem> _items = new();
        public IReadOnlyCollection<InvoiceItem> Items => _items.AsReadOnly();
        public ICollection<InvoiceAppliedCoupon> AppliedCoupons { get; private set; } = new HashSet<InvoiceAppliedCoupon>();

        private Invoice() { }

        public static Invoice Create(Guid? couponId = null)
        {
            return new Invoice
            {
                Id = Guid.Empty,
                Status = InvoiceStatus.Pending, // Trạng thái mặc định an toàn
                CouponId = couponId,
                TotalAmount = 0, // Sẽ được cộng dồn khi thêm Item
            };
        }

        // Logic nghiệp vụ nằm ngay trong Entity (Fail Fast)
        public void AddItem(Guid productId, Guid variantId, int quantity, decimal priceAtPurchase)
        {
            if (quantity <= 0) throw new ArgumentException("Số lượng phải lớn hơn 0");
            if (priceAtPurchase < 0) throw new ArgumentException("Giá không được âm");

            var item = new InvoiceItem(Id, productId, variantId, quantity, priceAtPurchase);
            _items.Add(item);

            // Tự động tính toán lại tổng tiền để đảm bảo tính toàn vẹn (Không ai được phép set tay TotalAmount)
            TotalAmount += quantity * priceAtPurchase;
        }


    }


}
