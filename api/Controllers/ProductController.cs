using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Services.Products;
using api.Utilities;
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
            var products = await _service.GetAllProductsAsync(paginationDto, filterDto, cancellationToken);
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

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] ProductSearchRequestDto request, CancellationToken cancellationToken)
        {
            var result = await _service.SearchProductsAsync(request, cancellationToken);

            return HandleResult(result);
        }
        [HttpGet("admin/list")]
        public async Task<IActionResult> GetProductListInfoAdmin( [FromQuery] PaginationRequestDto paginationDto, CancellationToken cancellationToken)
        {
            var result = await _service.GetProductListInfoAdmin(paginationDto, cancellationToken);

            return HandleResult(result);
        }
        [HttpGet("admin/detail")]
        public async Task<IActionResult> GetProductDetailInfoAdmin([FromQuery] Guid productId, CancellationToken cancellationToken)
        {
            var result = await _service.GetProductDetailInfoAdmin(productId, cancellationToken);

            return HandleResult(result);
        }
        [HttpGet("admin/list/approval")]
        public async Task<IActionResult> GetProductAprrovalListInfoAdmin([FromQuery] PaginationRequestDto paginationDto, CancellationToken cancellationToken)
        {
            var result = await _service.GetProductAprrovalListInfoAdmin(paginationDto, cancellationToken);

            return HandleResult(result);
        }
        [HttpPatch("admin/approval")]
        public async Task<IActionResult> ApproveProduct([FromBody] Guid productId, CancellationToken cancellationToken)
        {
            var result = await _service.ApproveProduct(productId, cancellationToken);

            return HandleResult(result);
        }
        [HttpGet("admin/list/me")]
        public async Task<IActionResult> GetProductListInfoAdminMe([FromQuery] PaginationRequestDto paginationDto, CancellationToken cancellationToken)
        {
            var shopId = AuthenticatedUserId;
            if (shopId == null)
            {
                return HandleResult(Result<bool>.Failure(Error.Create("Unauthorized", "You are not authorized.", ErrorType.BadRequest)));
            }
            var result = await _service.GetProductListInfoAdminMe(shopId.Value, paginationDto, cancellationToken);

            return HandleResult(result);
        }
    }


    public sealed record ProductAdminResponseDto
    {
        public required Guid id { get; init; }
        public required string name { get; init; }
        public required string image { get; init; }
        public required string status { get; init; }
        public required string createdAt { get; init; }
        public required string updatedAt { get; init; }
    }

    public sealed record ProductDetailAdminResponseDto
    {
        public required Guid id { get; init; }
        public required string name { get; init; }
        public required string supplierName { get; init; }
        public required string description { get; init; }
        public required decimal importPrice { get; init; }
        public required decimal discount { get; init; }
        public required string status { get; init; }
        public required string category { get; init; }
        public required IReadOnlyCollection<string> imageUrls { get; init; }
        public required string createdAt { get; init; }
        public required string updatedAt { get; init; }
        public required IReadOnlyCollection<VariantAdminResponseDto> variants { get; init; }
    }

    public sealed record VariantAdminResponseDto
    {
        public required Guid id { get; init; }
        public required Guid productId { get; init; }
        public required string name { get; init; }
        public required string sku { get; init; }
        public required int quantity { get; init; }
        public required decimal costPrice { get; init; }
        public required decimal salePrice { get; init; }
        public required string image { get; init; }
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
