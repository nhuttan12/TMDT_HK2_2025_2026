namespace api.Dtos.Inventory.Response
{
    public class RawProductInStockDto
    {
        public Guid Id { get; set; }
        public Guid ProductId { get; set; }
        public Guid VariantId { get; set; }
        public string? ImageUrl { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public string ReplenishmentLevel { get; set; } = string.Empty;
        public int Stock { get; set; }
        public int Sales7d { get; set; }
        public int Sales30d { get; set; }
        public int TotalItems { get; set; }
    }
}
