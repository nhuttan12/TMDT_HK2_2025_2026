using api.Dtos.Common;
using api.Dtos.Shops.Response;
using api.Utilities;

namespace api.Services.Shops
{
    public interface IShopAdminService
    {
        Task<Result<bool>> ApproveShop(Guid shopId, CancellationToken cancellationToken);
        Task<Result<PagedResult<ShopAdmin>>> GetShopApprovalList(PaginationRequestDto request, CancellationToken cancellationToken);
        Task<Result<ShopDetailInfo>> GetShopDetailInfo(Guid shopId, CancellationToken cancellationToken);
        Task<Result<PagedResult<ShopAdmin>>> GetShopList(PaginationRequestDto request, CancellationToken cancellationToken);
        Task<Result<ShopProfile>> GetShopProfile(Guid shopId, CancellationToken cancellationToken);
    }
}
