using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
using api.Models;
using api.Repository.Shops;
using api.Services.Auths;
using api.Utilities;
using Microsoft.AspNetCore.Identity;

namespace api.Services.Shops
{
    public class ShopUserService(
        IShopUserRepository shopUserRepository,
        IAuthService authService) : IShopUserService
    {
        public async Task<Result<ShopNameResponse>> GetListNameShop(CancellationToken cancellationToken)
        {
            var list = await shopUserRepository.GetListNameShop(cancellationToken);
            return Result<ShopNameResponse>.Success(list);
        }

        public async Task<Result<Guid>> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken)
        {
            var dummyUser = new User { Email = request.Email };

            var hashedPassword = authService.HashPassword(dummyUser, request.Password);

            var secureRequest = request with { Password = hashedPassword };

            var result = await shopUserRepository.RegisterShopAsync(secureRequest, cancellationToken);

            return Result<Guid>.Success(result);
        }
    }
}
