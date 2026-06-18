using api.Dtos.Banners.Request;
using api.Dtos.Banners.Response;
using api.Dtos.Common;
using api.Utilities;

namespace api.Services.Banners
{
    public interface IAdminBannerService
    {
        Task<Result<int>> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners);
        Task<Result<PagedResult<AdminBannerPaging>>> GetAdminBannersPagingAsync(Guid UserId, CancellationToken cancellationToken, PaginationRequestDto paginationDTO);
    }
}
