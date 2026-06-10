using api.Dtos.Banners.Request;
using api.Utilities;

namespace api.Services.Banners
{
    public interface IBannerService
    {
        Task<Result<int>> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners);
    }
}
