using api.Dtos.Banners.Request;
using api.Utilities;

namespace api.Repository.BannerRepo
{
    public interface IBannerRepository
    {
        Task<Result<int>> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners);
        //Task<Result<>>
    }
}
