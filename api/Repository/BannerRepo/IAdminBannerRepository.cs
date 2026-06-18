using api.Dtos.Banners.Request;
using api.Dtos.Banners.Response;
using api.Dtos.Common;
using api.Utilities;

namespace api.Repository.BannerRepo
{
    public interface IAdminBannerRepository
    {
        Task<int> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners);
        Task<PagedResult<AdminBannerPaging>> GetAdminBannersPagingAsync(Guid userId, CancellationToken cancellationToken, PaginationRequestDto paginationDTO);
    }
}
