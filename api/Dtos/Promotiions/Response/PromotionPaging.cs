namespace api.Dtos.Promotiions.Response
{
    public record PromotionPaging(
        int Id,
        string Name,
        int Status,
        DateTimeOffset StartAt,
        DateTimeOffset EndAt,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt
    );
}
