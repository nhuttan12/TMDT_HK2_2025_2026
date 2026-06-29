using api.Dtos.Shops.Request;
using api.Models;
using api.Repository.Shops;
using api.Services.Auths;
using api.Utilities;
using Microsoft.AspNetCore.Identity;

namespace api.Services.Shops
{
    public class ShopUserService(
        IShopUserRepository shopUserRepository,
        IAuthService authService,
        IPasswordHasher<User> passwordHasher
        ) : IShopUserService
    {
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
