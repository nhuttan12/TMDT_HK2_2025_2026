namespace api.Dtos.Banners.Response
{
    public record AdminBannerPagingDbResult(
        Guid Id,
        string ImageUrl,
        int Order,
        bool IsPrimary,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt,
        int TotalItems
    );
}
