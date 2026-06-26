namespace api.Dtos.Inventory.Response
{
    public record GoodsReceiptBatchResponse
    {
        public Guid Id { get; init; }
        public Guid ProductId { get; init; }
        public string ProductName { get; init; } = null!;
        public string BatchNumber { get; init; } = null!;
        public int Quantity { get; init; }
        public decimal TotalPrice { get; init; }
    }
}
