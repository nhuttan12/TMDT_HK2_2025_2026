using api.Dtos.Shops.Request;
using api.Utilities;

namespace api.Services.Shops
{
    public interface IShopUserService
    {
        Task<Result<Guid>> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken);
    }
}
