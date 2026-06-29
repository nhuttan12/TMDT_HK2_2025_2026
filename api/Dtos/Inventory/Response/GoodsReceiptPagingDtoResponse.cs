using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Response
{
    public class GoodsReceiptPagingDtoResponse
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("code")]
        public string Code { get; set; } = null!;

        [JsonPropertyName("supplierName")]
        public string SupplierName { get; set; } = null!;

        [JsonPropertyName("totalBatches")]
        public int TotalBatches { get; set; }

        [JsonPropertyName("totalQuantity")]
        public int TotalQuantity { get; set; }

        [JsonPropertyName("totalAmount")]
        public decimal TotalAmount { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; } = null!;

        [JsonPropertyName("createdAt")]
        public DateTimeOffset CreatedAt { get; set; }
    }
}
