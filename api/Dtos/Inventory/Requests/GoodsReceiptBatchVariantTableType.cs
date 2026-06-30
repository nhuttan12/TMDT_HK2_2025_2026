namespace api.Dtos.Inventory.Requests
{
    public class GoodsReceiptBatchVariantTableType
    {
        public string batch_code { get; set; }        // Cột 1
        public Guid variant_id { get; set; }          // Cột 2
        public decimal cost_price { get; set; }       // Cột 3
    }
}
