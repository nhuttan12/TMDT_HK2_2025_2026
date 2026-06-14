using api.Dtos.Common;
using api.Dtos.Coupons.Response;
using api.Models.Utilities;
using api.Utilities;
using Microsoft.Data.SqlClient;

namespace api.Repository.Coupons
{
    public class UserCouponRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IUserCouponRepository
    {
        public async Task<List<UserCoupon>> GetPlatformCouponForUserSaving(Guid? userId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
            };

            var coupons = await storedProcedureRepository.QueryAsync<UserCoupon>(
                "usp_GetPlatformCouponForUserSaving",
                cancellationToken,
                parameters);

            return coupons;
        }

        public async Task<List<UserCoupon>> GetShopCouponForUserSaving(Guid? userId, Guid shopId, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@ShopId", shopId),
                new SqlParameter("@UserId", userId),
            };

            var coupons = await storedProcedureRepository.QueryAsync<UserCoupon>(
                "usp_GetShopCouponForUserSaving",
                cancellationToken,
                parameters);

            return coupons;
        }
    }
}
