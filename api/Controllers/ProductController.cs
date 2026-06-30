using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Services.Products;
using Microsoft.AspNetCore.Authorization;
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
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] ProductUpdateDto productDto)
        {
            var result = await _service.UpdateProduct(id, productDto);
            return HandleResult(result);
        }
        [Authorize(Roles ="Admin")]
        [HttpPatch("{id}/lock")]
        public async Task<IActionResult> LockProduct([FromRoute] Guid id)
        {
            var result = await _service.LockProduct(id);
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id, [FromQuery] ProductQueryDto queryDto)
        {
            var product = await _service.GetProductById(id, queryDto);
            return HandleResult(product);
        }
      
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationRequestDto paginationDto, [FromQuery] FilterProductQueryDto filterDto, CancellationToken cancellationToken = default)
        {
            var products = await _service.GetAllProducts(paginationDto, filterDto, cancellationToken);
            return HandleResult(products);
        }
        //[HttpGet("/category/{categoryId}")]
        //public async Task<IActionResult> GetAllByCategory([FromRoute] Guid categoryId, [FromQuery] PaginationRequestDto paginationDto, [FromQuery] FilterProductQueryDto filterDto, CancellationToken cancellationToken = default)
        //{
        //    var products = await _service.GetProductsByCategory(categoryId, paginationDto, filterDto, cancellationToken);
        //    return HandleResult(products);
        //}
        [HttpGet("{productId}/related")]
        public async Task<IActionResult> GetRelated([FromRoute] Guid productId, [FromQuery] PaginationRequestDto paginationDto, CancellationToken cancellationToken = default)
        {
            var products = await _service.GetRelatedProducts(productId, paginationDto, cancellationToken);
            return HandleResult(products);
        }
       
        [HttpGet("{shopId}/shop")]
        public async Task<IActionResult> GetProductOfShop(
            [FromRoute] Guid shopId, 
            [FromQuery] PaginationRequestDto paginationDto,
            [FromQuery] ShopParams? param,
            CancellationToken cancellationToken)
        {
            var products = await _service.GetProductOfShopAsync(shopId, paginationDto, param, cancellationToken);
            return HandleResult(products);
        }
    
    }
    public record ProductQueryDto(string? detail);

    public record ShopParams(string? SortBy = null);

    // Định nghĩa các hằng số SortBy để tránh Magic String
    public static class ProductSortOptions
    {
        public const string ProductNew = "productNew";
        public const string PriceAsc = "priceAsc";
        public const string PriceDesc = "priceDesc";
    }

}
