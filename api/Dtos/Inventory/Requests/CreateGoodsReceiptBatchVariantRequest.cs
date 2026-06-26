using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Requests
{
    public class CreateGoodsReceiptBatchVariantRequest
    {
        [JsonPropertyName("productVariantId")]
        [Required]
        public Guid ProductVariantId { get; set; }

        [JsonPropertyName("productVariantName")]
        public string ProductVariantName { get; set; } = string.Empty;

        [JsonPropertyName("costPrice")]
        [Range(0, double.MaxValue, ErrorMessage = "Giá nhập không được âm")]
        public decimal CostPrice { get; set; }

        [JsonPropertyName("productId")]
        public string? ProductId { get; set; }
    }
}
