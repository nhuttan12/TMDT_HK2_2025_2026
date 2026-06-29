namespace api.Dtos.Inventory.Response
{
    public class RawGoodsIssue
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int TotalQuantity { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int TotalItems { get; set; }
    }
}
