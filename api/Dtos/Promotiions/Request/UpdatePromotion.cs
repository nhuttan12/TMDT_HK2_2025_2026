namespace api.Dtos.Promotiions.Request
{
    public record UpdatePromotion(
        Guid PromotionId,
        string Name,
        bool Status,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt,
        IEnumerable<ProductPromotionItem> Products
    );
}
