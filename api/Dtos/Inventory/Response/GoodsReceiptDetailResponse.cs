namespace api.Dtos.Inventory.Response
{
    public record GoodsReceiptDetailResponse
    {
        public Guid Id { get; init; }
        public string Code { get; init; } = null!;
        public Guid SupplierID { get; init; }
        public string SupplierName { get; init; } = null!;
        public DateTimeOffset ImportDate { get; init; }
        public string ImportStatus { get; init; } = null!;
        public string? Note { get; init; }

        // Danh sách Lô hàng
        public List<GoodsReceiptBatchResponse> Batches { get; set; } = new();
    }
}
