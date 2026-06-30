namespace api.Dtos.Inventory.Response
{
    public class RawGoodsReceiptPagingDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; } = null!;
        public string SupplierName { get; set; } = null!;
        public int TotalBatches { get; set; }
        public int TotalQuantity { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = null!;
        public DateTimeOffset CreatedAt { get; set; }

        // Thuộc tính này dùng để lấy tổng số record phục vụ phân trang,
        // sau khi map xong có thể không cần trả về cho Client.
        public int TotalItems { get; set; }
    }
}
