using api.Controllers;
using api.Dtos.Common;
using api.Dtos.Products.Request;
using api.Dtos.Products.Respones;
using api.Excepptions;
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
        Task<Result<PagedResult<ProductResponseDto>>> GetAllProducts(PaginationRequestDto paginationDto, FilterProductQueryDto fillterDto, CancellationToken cancellationToken = default);
        Task<Result<ProductResponseDto>> GetProductById(Guid id, CancellationToken cancellationToken = default);
    }
    public class ProductService(
        ILogger<ProductController> _logger,
        IProductRepository _repo,
        IUnitOfWork _unitOfWork,
        IMapper _mapper) : IProductService
    {
        public async Task<Result<Product>> CreateProduct(ProductCreateDto productDto, CancellationToken cancellationToken = default)
        {
            if (productDto == null)
            {
                return Result<Product>.Failure(Error.Create("Input.Invalid", "Invalid product dto.", ErrorType.BadRequest));
            }
            var ValidInput = productDto.ValidData();
            if (!ValidInput.IsSuccess)
            {
                return Result<Product>.Failure(ValidInput.Error);
            }
            var res = Product.Create(
                productDto.Name,
                productDto.BasePrice,
                productDto.ImageUrl,
                productDto.CategoryID,
                productDto.ShopID
            );
            if (!res.IsSuccess)
            {
                return Result<Product>.Failure(res.Error);
            }
            _logger.LogInformation("Creating product with name: {ProductName}", productDto.Name);
            await _repo.CreateAsync(res.Value!, cancellationToken);
            await _unitOfWork.CommitAsync();
            return res;
        }
        public async Task<Result<ProductResponseDto>> GetProductById(Guid id, CancellationToken cancellationToken = default)
        {
            if (id == Guid.Empty)
            {
                return Result<ProductResponseDto>.Failure(Error.Create("Input.Invalid", "Invalid product id.", ErrorType.BadRequest));
            }
            var product = await _repo.GetByIdAsync(id);

            if (product == null)
            {
                return Result<ProductResponseDto>.Failure(Error.Create("Product.NotFound", "Product not found.", ErrorType.NotFound));
            }
            var productDto = _mapper.Map<ProductResponseDto>(product);
            return Result<ProductResponseDto>.Success(productDto);
        }
        /**
         * fillter : name, category, price range, rating range, status
         */

        public async Task<Result<PagedResult<ProductResponseDto>>> GetAllProducts(PaginationRequestDto paginationDto, FilterProductQueryDto? fillterDto, CancellationToken cancellationToken = default)
        {
            // 1. Validate Pagination
            if (paginationDto == null)
            {
                return Result<PagedResult<ProductResponseDto>>.Failure(
                    new Error("Pagination.Null", "Pagination data is required.", ErrorType.BadRequest));
            }

            var paginationResult = paginationDto.ValidData();
            if (paginationResult.IsFailure) return Result<PagedResult<ProductResponseDto>>.Failure(paginationResult.Error);

            // 2. Validate Filter (Nếu có truyền lên)
            if (fillterDto != null)
            {
                var filterResult = fillterDto.ValidData();
                if (filterResult.IsFailure) return Result<PagedResult<ProductResponseDto>>.Failure(filterResult.Error);
            }

            // 3. Gọi Data Access Layer (I/O)
            var products = await _repo.GetAllAsync(
                paginationDto.PageNumber,
                paginationDto.PageSize,
                fillterDto!,
                cancellationToken);

            PagedResult<ProductResponseDto> pagedDtos = products.Map(product => new ProductResponseDto
            (
                Id: product.Id,
                Name: product.Name,
                Rating: product.Rating,
                BasePrice: product.BasePrice,
                ImageUrl: product.ImageUrl,
                Status: product.Status.ToString() ,         // Trình biên dịch C# sẽ báo đỏ ngay nếu bạn gõ sai tên biến
                Variants: product.Variants.Select(v => new VariantResponseDto
                (
                 Sku: v.Sku,
                 Name: v.Name,
                 CostPrice: v.CostPrice,
                 SellPrice: v.SellPrice,
                 ImageUrl: v.ImageUrl,
                 Status: v.Status.ToString() // Trình biên dịch C# sẽ báo đỏ ngay nếu bạn gõ sai tên biến

                )).ToArray()    
            )); // Sử dụng Implicit Conversion đã cấu hình trong class PagedResult<ProductResponseDto>

            // Sử dụng Implicit Conversion đã cấu hình trong class Result
            return Result<PagedResult<ProductResponseDto>>.Success(pagedDtos);
        }
        public async Task<Result<bool>> UpdateProduct(Guid id, ProductUpdateDto productDto, CancellationToken cancellationToken = default)
        {
            var validationResult = productDto.Validate();
            if (validationResult.IsFailure)
            {
                return Result<bool>.Failure(validationResult.Error);
            }
            var existingProduct = await _repo.GetByIdAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Update(productDto);
                _repo.Update(existingProduct);
                await _unitOfWork.CommitAsync();
                return Result<bool>.Success(true);
            }else{
                return Result<bool>.Failure(Error.Create("Product.NotFound", "Product not found.", ErrorType.NotFound));
            }
        }

        public async Task<Result<bool>> LockProduct(Guid id, CancellationToken cancellationToken = default)
        {
            var existingProduct = await _repo.GetByIdAsync(id);
            if (existingProduct != null)
            {
                existingProduct.Lock(); // Soft delete: Cập nhật trạng thái thay vì xóa vật lý
                _repo.Update(existingProduct);
                await _unitOfWork.CommitAsync();
                return Result<bool>.Success(true);
            }
            return Result<bool>.Failure(Error.Create("Product.NotFound.", "Product not found.", ErrorType.NotFound));
        }



        

    }
}
