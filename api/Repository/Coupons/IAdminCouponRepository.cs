using api.Dtos.Common;
using api.Dtos.Coupons.Request;
using api.Dtos.Coupons.Response;
using api.Utilities;

namespace api.Repository.Coupons
{
    public interface IAdminCouponRepository
    {
        Task<Guid> CreateCouponAsync(Guid userId, CancellationToken cancellationToken, CreateCouponRequest request);
        Task<CouponDetailResponse?> GetCouponDetailAsync(Guid userId, Guid couponId, CancellationToken cancellationToken);
        Task<PagedResult<AdminCoupon>> GetAdminCouponPagingAsync(Guid userId, PaginationRequestDto pagination, CancellationToken cancellationToken);
    }
}
