using api.Dtos.Banners.Request;
using api.Dtos.Common;
using api.Services.Banners;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Banners
{
    [Route("api/admin/banner")]
    [ApiController]
    public class BannerAdminController(
        IAdminBannerService bannerService) : BaseController
    {
        [HttpPut]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> BulkUpdateBannersAsync(
            CancellationToken CancellationToken,
            [FromBody] List<UpdateBannerDto> Banners)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await bannerService.BulkUpdateBannersAsync(
                userId.Value, 
                CancellationToken, 
                Banners);

            return HandleResult(result);
        }

        [HttpGet]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> GetAdminBannersPagingAsync(
            CancellationToken CancellationToken,
            [FromQuery] PaginationRequestDto PaginationDTO)
        {
            var userId = AuthenticatedUserId;

            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }

            var result = await bannerService.GetAdminBannersPagingAsync(
                userId.Value,
                CancellationToken,
                PaginationDTO);

            return HandleResult(result);
        }
    }
}
