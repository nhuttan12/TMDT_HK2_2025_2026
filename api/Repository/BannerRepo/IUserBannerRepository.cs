using api.Dtos.Banners.Request;
using api.Dtos.Banners.Response;
using api.Dtos.Common;
using api.Utilities;

namespace api.Repository.BannerRepo
{
    public interface IUserBannerRepository
    {
        Task<List<BannerResponse>> GetHomeBanners(CancellationToken cancellationToken);
        Task<List<BannerResponse>> GetShopBanners(Guid shopId, CancellationToken cancellationToken);
    }
}
