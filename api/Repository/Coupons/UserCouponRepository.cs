using api.Dtos.Common;
using api.Dtos.Coupons.Response;
using api.Models.Utilities;
using api.Utilities;
using Microsoft.Data.SqlClient;
using System.Data;

namespace api.Repository.Coupons
{
    public class UserCouponRepository(
        IStoredProcedureRepository storedProcedureRepository
        ) : IUserCouponRepository
    {
        public async Task<Guid> ClaimCoupon(Guid userId, Guid couponId, CancellationToken cancellationToken)
        {
            var outputIdParameter = new SqlParameter("@NewId", SqlDbType.UniqueIdentifier)
            {
                Direction = ParameterDirection.Output
            };

            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@CouponId", couponId),
                outputIdParameter
            };

            await storedProcedureRepository.ExecuteAsync(
                "usp_CreateUserSavedCoupon",
                cancellationToken,
                parameters);

            return (Guid)outputIdParameter.Value;
        }

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

        public async Task<PagedResult<UserCoupon>> GetUserSavedCouponListPaging(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var parameters = new object[]
            {
                new SqlParameter("@UserId", userId),
                new SqlParameter("@PageNumber", pagination.PageNumber),
                new SqlParameter("@PageSize", pagination.PageSize)
            };

            // Hứng dữ liệu vào record thô
            var rawResults = await storedProcedureRepository.QueryAsync<RawUserCouponPaging>(
                "usp_GetUserSavedCouponListPaging",
                cancellationToken,
                parameters);

            // Tách lấy tổng số dòng
            int totalCount = rawResults.FirstOrDefault()?.TotalItems ?? 0;

            // Map sang DTO sạch sẽ cho Frontend
            var items = rawResults.Select(r => new UserCoupon(
                r.Id, 
                r.Code, 
                r.Name, 
                r.Scope, 
                r.Category, 
                r.Status,
                r.ShopId, 
                r.Type, 
                r.DiscountValue, 
                r.MaxDiscountAmount,
                r.MinInvoiceValue, 
                r.StartAt, 
                r.EndAt,
                r.IsSaved
            )).ToList();

            // Đóng gói vào PagedResult
            return new PagedResult<UserCoupon>(
                items,
                totalCount,
                pagination.PageNumber,
                pagination.PageSize
            );
        }
    }
}
