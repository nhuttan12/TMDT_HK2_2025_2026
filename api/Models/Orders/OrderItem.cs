namespace api.Models.Orders
{
    public class OrderItem
    {
        public Guid Id { get; private set; }
        public Guid OrderId { get; private set; }

        public Guid ProductId { get; private set; }
        public Guid VariantId { get; private set; }

        public int Quantity { get; private set; }
        public decimal PriceAtPurchase { get; private set; }

        // EF Core Constructor
        private OrderItem() { }

        // Chỉ Order mới có quyền tạo ra OrderItem (thông qua constructor internal hoặc private)
        internal OrderItem(Guid orderId, Guid productId, Guid variantId, int quantity, decimal priceAtPurchase)
        {
            Id = Guid.Empty;
            OrderId = orderId;
            ProductId = productId;
            VariantId = variantId;
            Quantity = quantity;
            PriceAtPurchase = priceAtPurchase;
        }
    }
}
