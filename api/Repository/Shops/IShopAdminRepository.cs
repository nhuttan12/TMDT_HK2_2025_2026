using api.Dtos.Common;
using api.Dtos.Shops.Response;
using api.Utilities;

namespace api.Repository.Shops
{
    public interface IShopAdminRepository
    {
        Task<bool> ApproveShop(Guid shopId, CancellationToken cancellationToken);
        Task<PagedResult<ShopAdmin>> GetShopApprovalList(PaginationRequestDto request, CancellationToken cancellationToken);
        Task<ShopDetailInfo?> GetShopDetailInfo(Guid shopId, CancellationToken cancellationToken);
        Task<PagedResult<ShopAdmin>> GetShopList(PaginationRequestDto request, CancellationToken cancellationToken);
        Task<ShopProfile?> GetShopProfile(Guid shopId, CancellationToken cancellationToken);
    }
}
