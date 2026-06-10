namespace api.Dtos.Banners.Response
{
    public record BannerResponse(
        Guid Id,
        string ImageUrl,
        int Order,
        bool IsPrimary);
}
