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
    }
    public class ProductService(
        ILogger<ProductController> _logger, 
        MyAppDbContext _context, 
        IProductRepository _productRepository,
        IUnitOfWork _unitOfWork,
        IMapper _mapper) : IProductService
    {

        public Task<Result<Product>> CreateProduct(ProductCreateDto productDto)
        {
            throw new NotImplementedException();
        }
    }
}
