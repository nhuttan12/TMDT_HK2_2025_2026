using api.Controllers;
using api.Database;
using api.Dtos.Products.Request;
using api.model.Products;
using api.Repository;
using api.Repository.ProductRepo;
using api.Utilities;
using AutoMapper;

namespace api.Services.Products
{
    public interface IProductService
    {
        Task<Result<Product>> CreateProduct(ProductCreateDto productDto);
        Task<Result<bool>> DeleteProduct(int id);
        Task<Result<PagedResult<Product>>> GetAllProducts();
        Task<Result<Product>> GetProductById(int id);
        Task<Result<IEnumerable<Product>>> GetProductsByCategory(string category);
        Task<Result<bool>> UpdateProduct(int id, ProductUpdateDto productDto);
    }
    public class ProductService(
        ILogger<ProductController> _logger,
        MyAppDbContext _context,
        IProductRepository _productRepository,
        IUnitOfWork _unitOfWork,
        IMapper _mapper) : IProductService
    {
        public async Task<Result<Product>> CreateProduct(ProductCreateDto productDto)
        {
            if (productDto == null) {
                return Result<Product>.Failure(Error.Create("Input.Invalid", "Invalid product data.", ErrorType.Validation));
            }

            throw new NotImplementedException();
        }

        public async Task<Result<bool>> DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<PagedResult<Product>>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public async Task<Result<Product>> GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<IEnumerable<Product>>> GetProductsByCategory(string category)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<bool>> UpdateProduct(int id, ProductUpdateDto productDto)
        {
            throw new NotImplementedException();
        }
    }
}
