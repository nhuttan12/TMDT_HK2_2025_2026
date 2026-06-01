using api.Dtos.Banners.Request;
using api.Utilities;

namespace api.Services.Banners
{
    public interface IBannerService
    {
        Result<Task<int>> BulkUpdateBannersAsync(Guid userId, List<UpdateBannerDto> banners);
    }
}
