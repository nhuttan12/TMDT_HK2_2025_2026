using api.Dtos.Banners.Response;
using api.Utilities;

namespace api.Services.Banners
{
    public interface IUserBannerService
    {
        Task<Result<List<BannerResponse>>> GetHomeBanners(CancellationToken cancellationToken);
        Task<Result<List<BannerResponse>>> GetShopBanners(Guid shopId, CancellationToken cancellationToken);
    }
}
