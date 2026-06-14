using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Utilities;

namespace api.Services.Coupons
{
    public interface IAdminCouponService
    {
        Task<Result<Guid>> CreateCouponAsync(Guid userId, CancellationToken cancellationToken, CreateCouponRequest request);
        Task<Result<CouponDetailResponse>> GetCouponDetailAsync(Guid userId, Guid couponId, CancellationToken cancellationToken);
        Task<Result<PagedResult<AdminCoupon>>> GetAdminCouponPagingAsync(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken);
    }
}
