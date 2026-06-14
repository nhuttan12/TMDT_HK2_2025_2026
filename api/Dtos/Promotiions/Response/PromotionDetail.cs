namespace api.Dtos.Promotiions.Response
{
    public record PromotionDetail(
    int Id,
    int ProductId,
    int ProductVariantId,
    string Name,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    decimal SellPrice,
    decimal DiscountPrice,
    int Status
    );
}
