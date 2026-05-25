using api.Controllers;
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
    public class ProductService : IProductService
    {
        private readonly ILogger<ProductController> _logger;
        private readonly MyAppDbContext _context;
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ProductService(ILogger<ProductController> logger, IProductService productService, IProductRepository productRepository, IUnitOfWork unitOfWork, IMapper mapper, MyAppDbContext context)
        {
            _context = context;
            _logger = logger;
            _productService = productService;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public Task<Result<Product>> CreateProduct(ProductCreateDto productDto)
        {
            throw new NotImplementedException();
        }
    }
}
