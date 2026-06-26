using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Requests
{
    public class CreateGoodsReceiptBatchRequest
    {
        [JsonPropertyName("productId")]
        [Required]
        public Guid ProductId { get; set; }

        [JsonPropertyName("productName")]
        public string ProductName { get; set; } = string.Empty;

        [JsonPropertyName("batchCode")]
        [Required]
        [MaxLength(50)]
        public string BatchCode { get; set; } = string.Empty;

        [JsonPropertyName("quantity")]
        [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn 0")]
        public int Quantity { get; set; }

        [JsonPropertyName("totalPrice")]
        [Range(0, double.MaxValue, ErrorMessage = "Tổng giá trị không hợp lệ")]
        public decimal TotalCostPrice { get; set; }

        [JsonPropertyName("items")]
        [Required]
        public List<CreateGoodsReceiptBatchVariantRequest> Items { get; set; } = new();
    }
}
