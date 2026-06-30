using System.Text.Json.Serialization;

namespace api.Dtos.Inventory.Response
{
    public class CreateSupplierRequestDto
    {
        [JsonPropertyName("name")]
        public string SupplierName { get; set; } = null!;

        [JsonPropertyName("contactName")]
        public string ContactName { get; set; } = null!;

        [JsonPropertyName("phone")]
        public string PhoneNumber { get; set; } = null!;

        [JsonPropertyName("email")]
        public string? Email { get; set; }

        [JsonPropertyName("address")]
        public string? Address { get; set; }

        [JsonPropertyName("taxCode")]
        public string? TaxCode { get; set; }
    }
}
