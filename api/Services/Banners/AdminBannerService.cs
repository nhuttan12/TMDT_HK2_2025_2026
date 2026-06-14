using api.Dtos.Banners.Request;
using api.Dtos.Banners.Response;
using api.Dtos.Common;
using api.Repository.BannerRepo;
using api.Utilities;

namespace api.Services.Banners
{
    public class AdminBannerService(
        IAdminBannerRepository bannerRepository) : IAdminBannerService
    {
        public async Task<Result<int>> BulkUpdateBannersAsync(Guid UserId, CancellationToken CancellationToken, List<UpdateBannerDto> Banners)
        {
            var result = await bannerRepository.BulkUpdateBannersAsync(UserId, CancellationToken, Banners);

            return result;
        }

        public async Task<Result<PagedResult<AdminBannerPaging>>> GetAdminBannersPagingAsync(Guid userId, CancellationToken cancellationToken, PaginationRequestDto paginationDTO)
        {
            var result = await bannerRepository.GetAdminBannersPagingAsync(userId, cancellationToken, paginationDTO);

            return result;
        }
    }
}
