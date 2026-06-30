using api.Dtos.Common;
using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
using api.Models;
using api.Repository.Shops;
using api.Services.Auths;
using api.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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

      

        public async Task<Result<PagedResult<ShopCardResponseDto>>> GetListShop( PaginationRequestDto paginationDto, CancellationToken cancellationToken)
        {
            var res = await shopUserRepository.GetListShop(paginationDto.PageNumber, paginationDto.PageSize, cancellationToken);
            return Result<PagedResult<ShopCardResponseDto>>.Success(res);
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
