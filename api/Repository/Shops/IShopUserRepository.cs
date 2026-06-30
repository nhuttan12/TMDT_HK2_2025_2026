using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
using api.Services.Shops;
using api.Utilities;

namespace api.Repository.Shops
{
    public interface IShopUserRepository
    {
        Task<ShopNameResponse> GetListNameShop(CancellationToken cancellationToken);
        Task<PagedResult<ShopCardResponseDto>> GetListShop(int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<Guid> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken);
    }
}
