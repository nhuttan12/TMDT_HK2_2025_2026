namespace api.Dtos.Inventory.Response
{
    public record RawProductBySupplierId
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? ImageUrls { get; set; }
        public string Status { get; set; } = string.Empty;
        public string SystemStatus { get; set; } = string.Empty;
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
        public int TotalItems { get; set; }
    }
}
