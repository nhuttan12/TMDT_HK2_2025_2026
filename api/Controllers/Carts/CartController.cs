using api.Dtos.Carts.Request;
using api.Dtos.Common;
using api.Models.Products;
using api.Services.Carts;
using api.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;

namespace api.Controllers.Carts
{
    [ApiController]
    [Route("api/carts")]
    [Authorize]
    public class CartController(ICartService service) : BaseController
    {
        
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationRequestDto pageRquest,[FromQuery] CartParams requets, CancellationToken cancellationToken)
        {
            var listCart = await service.GetAll(pageRquest, requets, cancellationToken);
            return HandleResult(listCart);
        }
        [HttpGet("me")]
        public async Task<IActionResult> GetMe(CancellationToken cancellation = default)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.GetMe(userId!, cancellation);
            return HandleResult(res);
        }

        [HttpPost("items/{VariantId}")]
        public async Task<IActionResult> AddItem([FromRoute] Guid VariantId,[FromBody] int quantity, CancellationToken cancellationToken)
        {
            var checkId = await service.CheckVariantId(VariantId);
            if (!checkId.IsSuccess)
            {
                return HandleResult(checkId);
            }
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.AddItem(userId.Value, VariantId, quantity, cancellationToken);
            return HandleResult(res);
        }
        [HttpPost("items/update/{VariantId}")]
        public async Task<IActionResult> UpdateItem([FromRoute] Guid VariantId, [FromBody] UpdateQuantityRequest quantity, CancellationToken cancellationToken)
        {
            var checkId = await service.CheckVariantId(VariantId);
            if (!checkId.IsSuccess)
            {
                return HandleResult(checkId);
            }
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.UpdateItem(userId.Value, VariantId, quantity, cancellationToken);
            return HandleResult(res);
        }
        [HttpPut("items/remove/{VariantId}")]
        public async Task<IActionResult> RemoveItem([FromRoute] Guid VariantId, CancellationToken cancellationToken)
        {
            var checkId = await service.CheckVariantId(VariantId);
            if (!checkId.IsSuccess)
            {
                return HandleResult(checkId);
            }
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.RemoveItem(userId.Value, VariantId, cancellationToken);
            return HandleResult(res);
        }
        [HttpPost("clean")]
        public async Task<IActionResult> CleanCart( CancellationToken cancellationToken)
        {
            var userId = AuthenticatedUserId;
            if (userId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Unauthorized()));
            }
            var res = await service.CleanCart(userId.Value, cancellationToken);
            return HandleResult(res);
        }


    }

    public record UpdateQuantityRequest(int Quantity);
}
