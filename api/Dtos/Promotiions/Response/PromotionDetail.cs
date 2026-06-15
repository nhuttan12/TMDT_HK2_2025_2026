namespace api.Dtos.Promotiions.Response
{
    public record PromotionDetail(
        Guid Id,
        Guid ProductId,
        Guid ProductVariantId,
        string Name,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt,
        decimal SellPrice,
        decimal DiscountPrice,
        int Status);
}
