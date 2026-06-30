namespace api.Dtos.Inventory.Requests
{
    public class GoodsReceiptBatchTableType
    {
        public Guid product_id { get; set; }          // Cột 1
        public string batch_code { get; set; }        // Cột 2
        public int quantity { get; set; }             // Cột 3
        public decimal total_cost_price { get; set; } // Cột 4
    }
}
