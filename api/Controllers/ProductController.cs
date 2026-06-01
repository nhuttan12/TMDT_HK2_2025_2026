using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Services.Products;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductController(IProductService _service) : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductCreateDto productDto)
        {
            var result = await _service.CreateProduct(productDto);
            return HandleResult(result);
        }
        [HttpPut("/{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] ProductUpdateDto productDto)
        {
            var result = await _service.UpdateProduct(id, productDto);
            return HandleResult(result);
        }
        [HttpPatch("/{id}")]
        public async Task<IActionResult> LockProduct([FromRoute] Guid id)
        {
            var result = await _service.LockProduct(id);
            return HandleResult(result);
        }

        [HttpGet("/{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var product = await _service.GetProductById(id);
            return HandleResult(product);
        }
      
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationRequestDto paginationDto, [FromQuery] FilterProductQueryDto filterDto, CancellationToken cancellationToken = default)
        {
            var products = await _service.GetAllProducts(paginationDto, filterDto, cancellationToken);
            return HandleResult(products);
        }
    }
}
