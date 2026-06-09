namespace api.Dtos.Products.Respones
{
    public record ProductResponseDto
    (
        Guid Id,
        string Name,
        decimal BasePrice,
        decimal Rating,
        string Status,
        IReadOnlyCollection<string> ImageUrls,
        VariantResponseDto[] Variants
    );
}
