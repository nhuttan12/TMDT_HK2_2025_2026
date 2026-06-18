namespace api.Dtos.Promotiions.Request
{
    public record ProductPromotionItem(
        Guid ProductId,
        Guid PromotionId,
        int Discount
    );
}
