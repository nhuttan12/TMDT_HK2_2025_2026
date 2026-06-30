using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;

namespace api.Repository.Shops
{
    public interface IShopUserRepository
    {
        Task<ShopNameResponse> GetListNameShop(CancellationToken cancellationToken);
        Task<Guid> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken);
    }
}
