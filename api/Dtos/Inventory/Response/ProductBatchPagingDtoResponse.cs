using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Response
{
    public class ProductBatchPagingDtoResponse
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("productId")]
        public Guid ProductId { get; set; }

        [JsonPropertyName("batchId")]
        public Guid BatchId { get; set; }

        [JsonPropertyName("productVariantId")]
        public Guid ProductVariantId { get; set; }

        [JsonPropertyName("productVariantName")]
        public string ProductVariantName { get; set; } = null!;

        [JsonPropertyName("costPrice")]
        public decimal CostPrice { get; set; }
    }
}
