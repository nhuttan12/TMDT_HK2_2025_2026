namespace api.Dtos.Promotiions.Response
{
    public record ShopPromotion(
        Guid Id,
        string Name,
        bool Status,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );
}
