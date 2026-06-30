using api.Dtos.Common;
using api.Dtos.Shops.Request;
using api.Dtos.Shops.Response;
using api.Utilities;

namespace api.Services.Shops
{
    public interface IShopUserService
    {
        Task<Result<ShopNameResponse>> GetListNameShop(CancellationToken cancellationToken);
        Task<Result<PagedResult<ShopCardResponseDto>>> GetListShop(PaginationRequestDto paginationDto, CancellationToken cancellationToken);
        Task<Result<Guid>> RegisterShopAsync(ShopRegistrationRequest request, CancellationToken cancellationToken);
    }
    public record ShopCardResponseDto(Guid id, string name, string? description, string? avatarUrl, int totalProducts);
}
