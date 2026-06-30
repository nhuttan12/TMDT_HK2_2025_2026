namespace api.Dtos.Inventory.Response
{
    public class RawProductBatchPagingDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid BatchId { get; set; }
        public Guid ProductVariantId { get; set; }
        public string ProductVariantName { get; set; } = null!;
        public decimal CostPrice { get; set; }

        // Thuộc tính phục vụ phân trang, không trả về Client
        public int TotalItems { get; set; }
    }
}
