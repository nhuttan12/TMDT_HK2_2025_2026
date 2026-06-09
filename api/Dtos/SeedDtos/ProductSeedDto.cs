using System.Globalization;

namespace api.Dtos.SeedDtos
{
    public class VariantSeedJsonDto
    {
        public string Name { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
    }

    public class ProductSeedJsonDto
    {
        public string Id { get; set; } = string.Empty; // Id từ hệ thống cũ (có thể bỏ qua)
        public string Category { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string brand { get; set; }
        public string Sku { get; set; } = string.Empty;
        public List<string> Images { get; set; } = [];
        public string DescriptionHTML { get; set; } = string.Empty;
        public string Summary { get; set; } = string.Empty;
        public List<VariantSeedJsonDto> Variants { get; set; } = [];
    }
}
