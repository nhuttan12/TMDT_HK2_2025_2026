using api.model.Products;
using api.Models.Inventory.Enums;
using api.Models.Products;

namespace api.Models.Inventory
{
    public class InventoryBatchStock
    {
        public Guid Id { get; private set; }
        public Guid VariantId { get; private set; }

        public Variant Variant { get; private set; }

        public Guid ProductId { get; private set; }
        
        public Product Product { get; private set; }

        public Guid BatchId { get; private set; }

        public GoodsReceiptBatch Batch { get; private set; }

        public int RemainingQuantity { get; private set; }
        public InventoryBatchStockStatus Status { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }
        public DateTimeOffset UpdatedAt { get; private set; }
    }
}
