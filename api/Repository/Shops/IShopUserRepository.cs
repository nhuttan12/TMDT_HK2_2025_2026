using api.Dtos.Shops.Request;

namespace api.Repository.Shops
{
    public interface IShopUserRepository
    {
        Task<Guid> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken);
    }
}
