using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Models;
using api.Models.Coupons;
using api.Repository.Coupons;
using api.Utilities;

namespace api.Services.Coupons
{
    public class AdminCouponService(
        IAdminCouponRepository couponRepository
        ) : IAdminCouponService
    {
        public async Task<Result<Guid>> CreateCouponAsync(Guid userId, CancellationToken cancellationToken, CreateCouponRequest request)
        {
            var result = await couponRepository.CreateCouponAsync(userId, cancellationToken, request);

            return result;
        }

        public async Task<Result<CouponDetailResponse>> GetCouponDetailAsync(Guid userId, Guid couponId, CancellationToken cancellationToken)
        {
            var coupon = await couponRepository.GetCouponDetailAsync(couponId, userId, cancellationToken);

            if (coupon == null)
            {
                return Result<CouponDetailResponse>.Failure(Error.Create("NotFound", "Không tìm thấy coupon hoặc bạn không có quyền truy cập."));
            }

            return Result<CouponDetailResponse>.Success(coupon);
        }

        public async Task<Result<PagedResult<AdminCoupon>>> GetAdminCouponPagingAsync(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken)
        {
            var coupon = await couponRepository.GetAdminCouponPagingAsync(
                userId, 
                pagination, 
                cancellationToken);

            return Result<PagedResult<AdminCoupon>>.Success(coupon);
        }
    }
}
