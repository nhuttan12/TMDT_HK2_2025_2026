using api.Dtos.Banners.Request;
using api.Services.Banners;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/admin/banner")]
    [ApiController]
    public class BannerController(
        IBannerService bannerService) : BaseController
    {
        [HttpPut("{Id}")]
        [Authorize(Roles = "Admin, Shop")]
        public async Task<IActionResult> BulkUpdateBannersAsync(
            [FromRoute] Guid Id,
            CancellationToken CancellationToken,
            [FromBody] List<UpdateBannerDto> Banners)
        {
            var result = await bannerService.BulkUpdateBannersAsync(
                Id, 
                CancellationToken, 
                Banners);

            return HandleResult(result);
        }
    }
}
