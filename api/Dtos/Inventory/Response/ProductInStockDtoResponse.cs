using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Response
{
    public class ProductInStockDtoResponse
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("productId")]
        public Guid ProductId { get; set; }

        [JsonPropertyName("variantId")]
        public Guid VariantId { get; set; }

        [JsonPropertyName("image")]
        public string? ImageUrl { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("variantSku")]
        public string Sku { get; set; } = string.Empty;

        [JsonPropertyName("replenishment")]
        public string ReplenishmentLevel { get; set; } = string.Empty;

        [JsonPropertyName("stock")]
        public int Stock { get; set; }

        [JsonPropertyName("sales7d")]
        public int Sales7d { get; set; }

        [JsonPropertyName("sales30d")]
        public int Sales30d { get; set; } 
    }
}
