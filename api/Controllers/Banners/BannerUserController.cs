using api.Dtos.Banners.Response;
using api.Services.Banners;
using api.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Banners
{
    [Route("api/banner")]
    [ApiController]
    public class BannerUserController(
        IUserBannerService bannerService) : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> GetHomeBanners(
            CancellationToken cancellationToken) 
        {
            var result = await bannerService.GetHomeBanners(cancellationToken);

            return HandleResult(result);
        }

        [HttpGet("shop/{shopId}")]
        public async Task<IActionResult> GetShopBanners(
            [FromRoute] Guid shopId,
            CancellationToken cancellationToken)
        {
            var result = await bannerService.GetShopBanners(shopId, cancellationToken);

            return HandleResult(result);
        }
    }
}
