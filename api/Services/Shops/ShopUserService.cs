using api.Dtos.Shops.Request;
using api.Repository.Shops;
using api.Utilities;

namespace api.Services.Shops
{
    public class ShopUserService(
        IShopUserRepository shopUserRepository
        ) : IShopUserService
    {
        public async Task<Result<Guid>> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken)
        {
            var result = await shopUserRepository.RegisterShopAsync(request, cancellationToken);

            return Result<Guid>.Success(result);
        }
    }
}
