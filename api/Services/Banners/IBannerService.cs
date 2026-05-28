using api.Dtos.Banners.Request;

namespace api.Services.Banners
{
    public interface IBannerService
    {
        Task<int> BulkUpdateBannersAsync(Guid userId, List<UpdateBannerDto> banners);
    }
}
