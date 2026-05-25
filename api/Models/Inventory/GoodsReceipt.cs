using api.Models.Inventory.Enums;

namespace api.Models.Inventory
{
    public class GoodsReceipt
    {
        public Guid Id { get; private set; }
        public Guid SupplierId { get; private set; }

        public Supplier Supplier { get; private set; }

        public string Code { get; private set; }
        public string Note { get; private set; }
        public GoodsReceiptType Type { get; private set; }
        public GoodsReceiptStatus Status { get; private set; }
        public DateTimeOffset CreatedAt { get; private set; }

        public ICollection<GoodsReceiptBatch> GoodsReceiptBatch { get; private set; } = new HashSet<GoodsReceiptBatch>();
    }
}
