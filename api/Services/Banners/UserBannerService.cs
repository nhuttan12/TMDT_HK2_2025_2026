using api.Dtos.Banners.Response;
using api.Repository.BannerRepo;
using api.Utilities;

namespace api.Services.Banners
{
    public class UserBannerService(
        IUserBannerRepository bannerRepository) : IUserBannerService
    {
        public async Task<Result<List<BannerResponse>>> GetHomeBanners(CancellationToken cancellationToken)
        {
            var result = await bannerRepository.GetHomeBanners(cancellationToken);

            return result;
        }

        public async Task<Result<List<BannerResponse>>> GetShopBanners(Guid shopId, CancellationToken cancellationToken)
        {
            var result = await bannerRepository.GetShopBanners(shopId, cancellationToken);

            return result;
        }
    }
}
