namespace api.Dtos.Products.Respones
{
    public sealed record ProductResponseDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required decimal BasePrice { get; init; }
        public required decimal Rating { get; init; }
        public required string Status { get; init; }
        public required IReadOnlyCollection<string> ImageUrls { get; init; }
        public required VariantResponseDto[] Variants { get; init; }
    }

    public sealed record ProductDetailResponseDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required decimal BasePrice { get; init; }
        public required decimal Rating { get; init; }
        public required string Status { get; init; }
        public required ShopDto Shop { get; init; }
        public string Description { get; init; } = string.Empty;
        public required IReadOnlyCollection<string> ImageUrls { get; init; }
        public required VariantResponseDto[] Variants { get; init; }
    }

    public sealed record ShopDto
    {
        public required Guid Id { get; init; }
        public required string Name { get; init; }
        public required string ShopLogos { get; init; }
    }
}