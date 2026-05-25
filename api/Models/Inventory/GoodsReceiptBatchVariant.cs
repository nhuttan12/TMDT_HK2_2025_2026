using api.Models.Products;

namespace api.Models.Inventory
{
    public class GoodsReceiptBatchVariant
    {
        public Guid Id { get; private set; }
        public Guid GoodsReceiptBatchId { get; private set; }

        public GoodsReceiptBatch GoodsReceiptBatch { get; private set; }

        public Guid VariantId { get; private set; }
        
        public Variant Variant { get; private set; }

        public int Quantity { get; private set; }
        public decimal CostPrice { get; private set; }

        public DateTimeOffset CreatedAt { get; private set; }
    }
}
