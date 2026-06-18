using api.Dtos.Shops.Request;
using api.Services.Shops;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Shops
{
    [Route("api/shop")]
    [ApiController]
    public class ShopUserController (
        IShopUserService shopUserService
        ) : BaseController
    {
        [HttpPost("/register")]
        public async Task<IActionResult> RegisterShopAsync(
            [FromBody] ShopRegistrationRequest request,
            CancellationToken cancellationToken)
        {
            var result = await shopUserService.RegisterShopAsync(request, cancellationToken);

            return HandleResult(result);
        }
    }
}
