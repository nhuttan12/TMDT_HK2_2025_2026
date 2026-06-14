using api.Dtos.Banners.Response;
using Microsoft.Data.SqlClient;

namespace api.Repository.BannerRepo
{
    public class UserBannerRepository(
        IStoredProcedureRepository storedProcedureRepository) : IUserBannerRepository
    {
        public async Task<List<BannerResponse>> GetHomeBanners(CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
            };

            // 3. Thực thi SP bằng generic repository của bạn
            var results = await storedProcedureRepository.QueryAsync<BannerResponse>(
                "usp_GetHomeBanners",
                cancellationToken,
                parameters
            );

            return results;
        }

        public async Task<List<BannerResponse>> GetShopBanners(Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId)
            };

            var banners = await storedProcedureRepository.QueryAsync<BannerResponse>(
                "usp_GetShopBanners",
                cancellationToken,
                parameters);

            return banners;
        }
    }
}
