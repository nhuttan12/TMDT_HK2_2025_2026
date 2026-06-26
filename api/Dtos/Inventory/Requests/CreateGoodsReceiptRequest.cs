using api.Models.Enums.Inventory;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Requests
{
    public class CreateGoodsReceiptRequest
    {
        [JsonPropertyName("code")]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        [JsonPropertyName("supplierID")]
        [Required]
        public Guid SupplierId { get; set; }

        [JsonPropertyName("supplierName")]
        public string SupplierName { get; set; } = string.Empty;

        [JsonPropertyName("importDate")]
        public DateTimeOffset ImportDate { get; set; }

        [JsonPropertyName("note")]
        public string Note { get; set; } = string.Empty;

        [JsonPropertyName("batches")]
        [Required]
        public List<CreateGoodsReceiptBatchRequest> Batches { get; set; } = new();
    }
}
