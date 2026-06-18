namespace api.Dtos.Banners.Response
{
    public record AdminBannerPaging(
        Guid Id,
        string ImageUrl,
        int Order,
        bool IsPrimary,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt);
}
