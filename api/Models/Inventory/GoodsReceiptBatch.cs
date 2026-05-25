namespace api.Models.Inventory
{
    public class GoodsReceiptBatch
    {
        public Guid Id { get; private set; }
        public Guid GoodsReceiptId { get; private set; }

        public GoodsReceipt GoodsReceipt { get; private set; }

        public string BatchCode { get; private set; }
        public int Quantity { get; private set; }
        public decimal TotalCostPrice { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }

        public ICollection<GoodsReceiptBatchVariant> GoodsReceiptBatchVariants { get; private set; } = new HashSet<GoodsReceiptBatchVariant>();

        public InventoryBatchStock InventoryBatchStock { get; private set; }
    }
}
