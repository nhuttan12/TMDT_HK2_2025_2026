namespace api.Models.Orders
{
    public class InvoiceItem
    {
        public Guid Id { get; private set; }
        public Guid InvoiceId { get; private set; }

        public Guid ProductId { get; private set; }
        public Guid VariantId { get; private set; }

        public int Quantity { get; private set; }
        public decimal PriceAtPurchase { get; private set; }

        // EF Core Constructor
        private InvoiceItem() { }

        // Chỉ Invoice mới có quyền tạo ra InvoiceItem (thông qua constructor internal hoặc private)
        internal InvoiceItem(Guid invoiceId, Guid productId, Guid variantId, int quantity, decimal priceAtPurchase)
        {
            Id = Guid.Empty;
            InvoiceId = invoiceId;
            ProductId = productId;
            VariantId = variantId;
            Quantity = quantity;
            PriceAtPurchase = priceAtPurchase;
        }
    }
}
