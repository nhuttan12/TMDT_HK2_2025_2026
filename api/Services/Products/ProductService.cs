using api.Controllers;
using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Excepptions;
using api.Extensions.EmailExtensions;
using api.model.Products;
using api.Repository;
using api.Repository.ProductRepo;
using api.Utilities;
using AutoMapper;

namespace api.Services.Products
{
    public interface IProductService
    {
        Task<Result<Product>> CreateProduct(ProductCreateDto productDto, CancellationToken cancellationToken = default); 
        Task<Result<bool>> UpdateProduct(Guid id, ProductUpdateDto productDto, CancellationToken cancellationToken = default);
        Task<Result<bool>> LockProduct(Guid id, CancellationToken cancellationToken = default);
        Task<Result<PagedResult<ProductResponseDto>>> GetAllProductsAsync(
            PaginationRequestDto paginationDto,
            FilterProductQueryDto? fillterDto, 
            CancellationToken cancellationToken = default);
        Task<Result<ProductDetailResponseDto>> GetProductById(Guid id, ProductQueryDto queryDto, CancellationToken cancellationToken = default);
        Task<Result<PagedResult<ProductResponseDto>>> GetRelatedProducts(
            Guid productId, PaginationRequestDto paginationDto, CancellationToken cancellationToken);
        Task<Result<PagedResult<ProductResponseDto>>> GetProductOfShopAsync(
            Guid shopId, PaginationRequestDto paginationDto, ShopParams? param, CancellationToken cancellationToken);
        Task<Result<PagedResult<ProductResponseDto>>> SearchProductsAsync(
            ProductSearchRequestDto request,
            CancellationToken cancellationToken);
    }
    public class ProductService(
        ILogger<ProductController> logger,
        IProductRepository repo,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IIdGenerator idGenerator) : IProductService
    {
        public async Task<Result<Product>> CreateProduct(ProductCreateDto productDto, CancellationToken cancellationToken = default)
        {
            var productId = idGenerator.NewId();
            var res = Product.Create(
                productId,
                productDto.Name,
                productDto.BasePrice,
                productDto.ImageUrl,
                productDto.CategoryID,
                productDto.ShopID,
                productDto.CostPrice,
                productDto.Sku,
                productDto.DescriptionHTML,
                productDto.Summary
            );
            if (!res.IsSuccess)
            {
                return Result<Product>.Failure(res.Error);
            }
            logger.LogInformation("Creating product with name: {ProductName}", productDto.Name);
            await repo.CreateAsync(res.Value!, cancellationToken);
            await unitOfWork.CommitAsync();
            return res;
        }
        public async Task<Result<ProductDetailResponseDto>> GetProductById(Guid id, ProductQueryDto queryDto, CancellationToken cancellationToken = default)
        {
            if (id == Guid.Empty)
            {
                return Result<ProductDetailResponseDto>.Failure(Error.Create("Input.Invalid", "Invalid product id.", ErrorType.BadRequest));
            }

            if (queryDto is not null)
            {
                // Process the query parameters if needed
            }
            var product = await repo.GetByIdAsync(id);

            if (product == null)
            {
                return Result<ProductDetailResponseDto>.Failure(Error.Create("Product.NotFound", "Product not found.", ErrorType.NotFound));
            }
            var productDto = mapper.Map<ProductDetailResponseDto>(product);
            return Result<ProductDetailResponseDto>.Success(productDto);
        }
       
  
        public async Task<Result<bool>> UpdateProduct(Guid id, ProductUpdateDto productDto, CancellationToken cancellationToken = default)
        {
            var validationResult = productDto.Validate();
            if (validationResult.IsFailure)
            {
                return Result<bool>.Failure(validationResult.Error);
            }
            var existingProduct = await repo.GetByIdAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Update(productDto.Name, productDto.BasePrice, productDto.ImageUrls, productDto.Status);
                repo.Update(existingProduct);
                await unitOfWork.CommitAsync();
                return Result<bool>.Success(true);
            }
            else
            {
                return Result<bool>.Failure(Error.Create("Product.NotFound", "Product not found.", ErrorType.NotFound));
            }
        }
        public async Task<Result<bool>> LockProduct(Guid id, CancellationToken cancellationToken = default)
        {
            var existingProduct = await repo.GetByIdAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Lock(); // Soft delete: Cập nhật trạng thái thay vì xóa vật lý
                repo.Update(existingProduct);
                await unitOfWork.CommitAsync();
                return Result<bool>.Success(true);
            }
            return Result<bool>.Failure(Error.Create("Product.NotFound.", "Product not found.", ErrorType.NotFound));
        }
        public async Task<Result<PagedResult<ProductResponseDto>>> GetRelatedProducts(Guid productId, PaginationRequestDto paginationDto, CancellationToken cancellationToken)
        {
            if (productId == Guid.Empty)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    Error.Create("ProductId.Invalid", "Product ID cannot be empty.", ErrorType.Validation));
            }
            var product = await repo.GetByIdWithShopAsync(productId, cancellationToken);
            if (product == null)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    Error.Create("Product.NotFound", "Product not found.", ErrorType.NotFound));
            }

            var relatedProducts = await repo.GetRelatedProductsAsync(productId, product.Shop.Id, paginationDto.PageNumber, paginationDto.PageSize, cancellationToken);
            if (relatedProducts != null && relatedProducts.Items.Any())
            {
                var relatedProductDtos = relatedProducts.Map(p => mapper.Map<ProductResponseDto>(p));
                return Result<PagedResult<ProductResponseDto>>.Success(relatedProductDtos);
            }
            return Result<PagedResult<ProductResponseDto>>.Failure(
                Error.Create("RelatedProducts.NotFound", "No related products found.", ErrorType.NotFound));
        }
        public async Task<Result<PagedResult<ProductResponseDto>>> GetAllProductsAsync(
             PaginationRequestDto paginationDto,
             FilterProductQueryDto? filterDto,
             CancellationToken cancellationToken = default)
        {
            // 1. Validate Pagination (Fail Fast)
            if (paginationDto == null)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    new Error("Pagination.Null", "Pagination data is required.", ErrorType.BadRequest));
            }

            var paginationResult = paginationDto.ValidData();
            if (paginationResult.IsFailure)
                return Result<PagedResult<ProductResponseDto>>.Failure(paginationResult.Error);

            // 2. Validate Filter (Nếu thực sự có dữ liệu truyền lên)
            if (filterDto != null && !filterDto.IsEmpty())
            {
                var filterResult = filterDto.ValidData();
                if (filterResult.IsFailure)
                    return Result<PagedResult<ProductResponseDto>>.Failure(filterResult.Error);
            }
            else
            {
                filterDto = null; // Đưa về null chuẩn để Repository không chạy qua các block IF vô ích
            }

            // 3. Gọi Data Access Layer (I/O)
            var products = await repo.GetAllAsync(
                paginationDto.PageNumber,
                paginationDto.PageSize,
                filterDto,
                cancellationToken);

            var pagedDtos = products.Map(product => product.ToResponseDto());

            return Result<PagedResult<ProductResponseDto>>.Success(pagedDtos);
        }
        public async Task<Result<PagedResult<ProductResponseDto>>> GetProductOfShopAsync(
         Guid shopId,
         PaginationRequestDto paginationDto,
         ShopParams? param,
         CancellationToken cancellationToken)
        {
            // 1. Defensive Programming: Fail Fast
            if (paginationDto == null)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    new Error("Pagination.Null", "Pagination data is required.", ErrorType.BadRequest));
            }

            var paginationResult = paginationDto.ValidData();
            if (paginationResult.IsFailure)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(paginationResult.Error);
            }

            // Chuẩn hóa tham số SortBy từ DTO, gán mặc định nếu null
            string sortBy = param?.SortBy ?? "productNew";

            // 2. Gọi Data Access Layer (I/O)
            var pagedProducts = await repo.GetProductOfShopAsync(
                shopId,
                paginationDto.PageNumber,
                paginationDto.PageSize,
                sortBy,
                cancellationToken);

            // 3. Mapping sạch sẽ qua Extension Method (O trong SOLID - Open/Closed)
            var pagedDtos = pagedProducts.Map(product => product.ToResponseDto());

            return Result<PagedResult<ProductResponseDto>>.Success(pagedDtos);
        }

        public async Task<Result<PagedResult<ProductResponseDto>>> SearchProductsAsync(
        ProductSearchRequestDto request,
        CancellationToken cancellationToken)
        {
            // 1. Fail Fast: Kiểm tra DTO hợp lệ
            if (request == null)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    new Error("Search.Null", "Search request parameters are required.", ErrorType.BadRequest));
            }

            var validationResult = request.ValidData();
            if (validationResult.IsFailure)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(validationResult.Error);
            }

            // 2. Thực thi I/O tại Repository
            var pagedProducts = await repo.SearchProductsAsync(request, cancellationToken);

            // 3. Mapping sạch sẽ sang DTO thông qua Extension Method đã viết ở phiên làm việc trước
            var pagedDtos = pagedProducts.Map(product => product.ToResponseDto());

            return Result<PagedResult<ProductResponseDto>>.Success(pagedDtos);
        }
    }
}
