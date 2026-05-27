using api.Models.Enums;

namespace api.Models.Orders
{
    public class Order
    {
        public Guid Id { get; private set; }
        public decimal TotalAmount { get; private set; }
        public OrderStatus Status { get; private set; }

        public Guid? CouponId { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        private readonly List<OrderItem> _items = new();
        public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

        private Order() { }

        public static Order Create(Guid? couponId = null)
        {
            return new Order
            {
                Id = Guid.Empty,
                Status = OrderStatus.Pending, // Trạng thái mặc định an toàn
                CouponId = couponId,
                TotalAmount = 0, // Sẽ được cộng dồn khi thêm Item
            };
        }

        // Logic nghiệp vụ nằm ngay trong Entity (Fail Fast)
        public void AddItem(Guid productId, Guid variantId, int quantity, decimal priceAtPurchase)
        {
            if (quantity <= 0) throw new ArgumentException("Số lượng phải lớn hơn 0");
            if (priceAtPurchase < 0) throw new ArgumentException("Giá không được âm");

            var item = new OrderItem(Id, productId, variantId, quantity, priceAtPurchase);
            _items.Add(item);

            // Tự động tính toán lại tổng tiền để đảm bảo tính toàn vẹn (Không ai được phép set tay TotalAmount)
            TotalAmount += quantity * priceAtPurchase;
        }


    }
   
   
}
