using api.Dtos.Products.Request;
using api.Models.Products;
using api.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class VariantController(IVariantService _service, ILogger<VariantController> _logger) : BaseController
    {
        [HttpGet("variants/{id:guid}")]
        public async Task<IActionResult> GetVariantById([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Getting variant with id {id}", id);
            var variant = await _service.GetVariantByIdAsync(id, cancellationToken);
            return HandleResult(variant);
        }
        [HttpGet("{productId:guid}/variants")]
        public async Task<IActionResult> GetVariantByProductId([FromRoute] Guid productId, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Getting variants for product with id {productId}", productId);
            var variants = await _service.GetVariantsByProductIdAsync(productId, cancellationToken);
            return HandleResult(variants);
        }
        [HttpPost("{productId:guid}/variants")]
        public async Task<IActionResult> CreateVariant([FromRoute] Guid productId, [FromBody] VariantCreateDto variantCreateDto, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Creating variant for product with id {productId}", productId);
            var result = await _service.CreateVariantAsync(productId, variantCreateDto, cancellationToken);
            return HandleResult(result);
        }
        [HttpPut("variants/{id:guid}")]
        public async Task<IActionResult> UpdateVariant([FromRoute] Guid id, [FromBody] VariantUpdateDto variantUpdateDto, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Updating variant with id {id}", id);
            var result = await _service.UpdateVariantAsync(id, variantUpdateDto, cancellationToken);
            return HandleResult(result);
        }
        [HttpDelete("variants/{id:guid}")]
        public async Task<IActionResult> DeleteVariant([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Deleting variant with id {id}", id);
            var result = await _service.DeleteVariantAsync(id, cancellationToken);
            return HandleResult(result);
        }

    }
}
