using api.Database;
using api.Dtos.Products.Request;
using api.model.Products;
using api.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace api.Repository.ProductRepo
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Task<Guid> ApproveProduct(Guid productId, CancellationToken cancellationToken);
        Task<bool> ExistsAsync(Guid productId, CancellationToken cancellationToken);
        Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, FilterProductQueryDto filterDto, CancellationToken cancellationToken);
        Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Product?> GetByIdWithShopAsync(Guid productId, CancellationToken cancellationToken = default);
        Task<Result<PagedResult<Product>>> GetProductAprrovalListInfoAdmin(int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<Result<Product>> GetProductDetailInfoAdmin(Guid productId, CancellationToken cancellationToken);
        Task<Result<PagedResult<Product>>> GetProductListInfoAdmin(int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<Result<PagedResult<Product>>> GetProductListInfoAdminMe(Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<PagedResult<Product>> GetProductOfShopAsync(Guid shopId, int pageNumber, int pageSize, string sortBy, CancellationToken cancellationToken);
        Task<PagedResult<Product>> GetRelatedProductsAsync(Guid productId, Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken);
        Task<PagedResult<Product>> SearchProductsAsync(
        ProductSearchRequestDto request,
        CancellationToken cancellationToken);
    }
    public class ProductRepository : IProductRepository
    {
        private readonly MyAppDbContext _context;

        public ProductRepository(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task CreateAsync(Product entity, CancellationToken cancellationToken = default)
        {
            await _context.Products.AddAsync(entity, cancellationToken);
        }
        public async Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            // Khởi tạo Queryable
            IQueryable<Product> query = _context.Products;
            return await query
                .AsNoTracking() // Tối ưu cho truy vấn chỉ đọc
                .Include(p => p.Variants)
                .Include(p => p.Shop)
                .Include(p => p.Detail)
                .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        }
        public async Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, FilterProductQueryDto? filterDto, CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query với AsNoTracking() một lần duy nhất cho mục đích Read-Only
            var query = _context.Products.AsNoTracking();

            // 2. Xây dựng truy vấn động (Dynamic Filtering)
            if (filterDto != null)
            {
                if (!string.IsNullOrWhiteSpace(filterDto.Name))
                {
                    var nameSearch = filterDto.Name.Trim();
                    query = query.Where(p => p.Name.Contains(nameSearch));
                }

                if (!string.IsNullOrWhiteSpace(filterDto.Category))
                {
                    var categorySearch = filterDto.Category.Trim();
                    query = query.Where(p => p.Category.Name.Contains(categorySearch));
                }

                if (filterDto.MinPrice.HasValue)
                    query = query.Where(p => p.BasePrice >= filterDto.MinPrice.Value);

                if (filterDto.MaxPrice.HasValue)
                    query = query.Where(p => p.BasePrice <= filterDto.MaxPrice.Value);

                if (filterDto.MinRating.HasValue)
                    query = query.Where(p => p.Rating >= filterDto.MinRating.Value);

                if (filterDto.MaxRating.HasValue)
                    query = query.Where(p => p.Rating <= filterDto.MaxRating.Value);

                if (filterDto.Status.HasValue)
                    query = query.Where(p => p.Status == filterDto.Status.Value);

                if (!string.IsNullOrWhiteSpace(filterDto.ShopName))
                {
                    // FIX LỖI: Trỏ đúng vào filterDto.ShopName thay vì filterDto.Name
                    var shopSearch = filterDto.ShopName.Trim();
                    query = query.Where(p => p.Shop.Name.Contains(shopSearch));
                }
            }

            // 3. Đếm tổng số lượng bản ghi sau khi lọc (Chỉ đếm, không kéo dữ liệu)
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Áp dụng Phân trang (Skip & Take) và Eager Loading dữ liệu liên quan
            var items = await query
                .Include(p => p.Variants)
                .Include(p => p.Category)
                .Include(p => p.Shop)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }
        public void Delete(Product entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Product> FindAll(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Product> FindByCondition(Expression<Func<Product, bool>> expression, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }


        public void Update(Product entity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> ExistsAsync(Guid productId, CancellationToken cancellationToken)
        {
            return _context.Products.AnyAsync(p => p.Id == productId, cancellationToken);
        }



        public async Task<PagedResult<Product>> GetRelatedProductsAsync(Guid productId, Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var query = _context.Products
                .AsNoTracking()
                .Where(p => p.Id != productId && p.Status == ProductStatus.Approved && p.ShopId == shopId);



            var totalCount = await query.CountAsync(cancellationToken);

            if (totalCount == 0)
            {
                return new PagedResult<Product>(new List<Product>(), 0, pageNumber, pageSize);
            }

            // 5. Phân trang và DTO Projection (Tối ưu Memory/CPU)
            var items = await query
                .OrderByDescending(p => p.CreatedAt) // BẮT BUỘC: Sắp xếp trước khi phân trang
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<Product?> GetByIdWithShopAsync(Guid productId, CancellationToken cancellationToken = default)
        {
            // Khởi tạo Queryable
            IQueryable<Product> query = _context.Products;
            return await query
                .AsNoTracking() // Tối ưu cho truy vấn chỉ đọc
                .Include(p => p.Shop)
                .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);
        }

        public async Task<PagedResult<Product>> GetProductOfShopAsync(
          Guid shopId,
          int pageNumber,
          int pageSize,
          string? sortBy,
          CancellationToken cancellationToken)
        {
            // 1. Luôn LỌC THEO SHIOPID ĐẦU TIÊN để thu hẹp phạm vi quét index
            var query = _context.Products
                .AsNoTracking()
                .Where(p => p.ShopId == shopId);

            // 2. Tính tổng số lượng bản ghi sau khi đã lọc theo ShopId
            var totalCount = await query.CountAsync(cancellationToken);

            // 3. Xử lý Dynamic Sorting dựa trên yêu cầu mới
            query = sortBy?.ToLower() switch
            {
                "productnew" => query.OrderByDescending(p => p.CreatedAt),
                "priceasc" => query.OrderBy(p => p.BasePrice),
                "pricedesc" => query.OrderByDescending(p => p.BasePrice),
                _ => query.OrderByDescending(p => p.CreatedAt) // Mặc định sắp xếp theo ngày tạo mới nhất
            };

            // 4. Áp dụng phân trang và Eager Loading các Variant
            var items = await query
                .Include(p => p.Variants)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<PagedResult<Product>> SearchProductsAsync(
        ProductSearchRequestDto request,
        CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query read-only và Eager Loading các bảng liên quan cần tìm kiếm
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .Include(p => p.Shop)
                .Include(p => p.Variants)
                .AsQueryable();

            // 2. Áp dụng bộ lọc tìm kiếm đa tiêu chí nếu có SearchTerm
            if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            {
                var searchTerm = request.SearchTerm.Trim().ToLower();

                query = query.Where(p =>
                    p.Name.ToLower().Contains(searchTerm) ||                     // Tên sản phẩm giống
                    (p.Category != null && p.Category.Name.ToLower().Contains(searchTerm)) || // Tên Category giống
                    (p.Shop != null && p.Shop.Name.ToLower().Contains(searchTerm)) ||         // Tên Shop giống
                    p.Variants.Any(v => v.Sku.ToLower().Contains(searchTerm))    // Bất kỳ Variant nào có SKU giống
                );
            }

            // 3. Tính tổng số lượng bản ghi thỏa mãn điều kiện tìm kiếm
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Phân trang và lấy dữ liệu (Luôn OrderBy trước khi Skip/Take)
            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, request.PageNumber, request.PageSize);
        }

        public async Task<Result<PagedResult<Product>>> GetProductListInfoAdmin(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query read-only và Eager Loading các bảng liên quan cần tìm kiếm
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .Include(p => p.Shop)
                .Include(p => p.Variants)
                .AsQueryable();

            // 3. Tính tổng số lượng bản ghi thỏa mãn điều kiện tìm kiếm
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Phân trang và lấy dữ liệu (Luôn OrderBy trước khi Skip/Take)
            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<Result<Product>> GetProductDetailInfoAdmin(Guid productId, CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query read-only và Eager Loading các bảng liên quan cần tìm kiếm
            var product = await _context.Products
                .AsNoTracking()
                .Include(p => p.Shop)
                .Include(p => p.Category)
                .Include(p => p.Detail)
                .Include(p => p.Variants)
                // 2. Lấy trực tiếp sản phẩm theo Id (bỏ OrderBy và ToList)
                .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);

            // 3. Fail Fast: Nếu không tìm thấy sản phẩm, trả về lỗi ngay lập tức
            if (product == null)
            {
                // (Bạn có thể điều chỉnh mã lỗi theo cấu trúc class Error của hệ thống)
                return Result<Product>.Failure(
                    Error.Create("Product.NotFound", $"Không tìm thấy sản phẩm với ID: {productId}", ErrorType.NotFound));
            }

            // 4. Trả về sản phẩm thành công
            return Result<Product>.Success(product);
        }

        public async Task<Result<PagedResult<Product>>> GetProductAprrovalListInfoAdmin(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query read-only và Eager Loading các bảng liên quan cần tìm kiếm
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .Include(p => p.Shop)
                .Include(p => p.Variants)
                .Where(p => p.Status == ProductStatus.PendingApproval)
                .AsQueryable();

            // 3. Tính tổng số lượng bản ghi thỏa mãn điều kiện tìm kiếm
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Phân trang và lấy dữ liệu (Luôn OrderBy trước khi Skip/Take)
            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }

        public async Task<Guid> ApproveProduct(Guid productId, CancellationToken cancellationToken)
        {
            var rowsAffected = await _context.Products
                .Where(p => p.Id == productId)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.Status, ProductStatus.Approved), cancellationToken);

            // Xử lý trường hợp không tìm thấy sản phẩm
            if (rowsAffected == 0)
            {
                // Tùy vào thiết kế, bạn có thể quăng lỗi hoặc trả về Guid.Empty
                throw new KeyNotFoundException($"Không tìm thấy sản phẩm với ID: {productId}");
            }

            // Trả về ID của sản phẩm đã được duyệt
            return productId;
        }

        public async Task<Result<PagedResult<Product>>> GetProductListInfoAdminMe(Guid shopId, int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            // 1. Khởi tạo query read-only và Eager Loading các bảng liên quan cần tìm kiếm
            var query = _context.Products
                .AsNoTracking()
                .Include(p => p.Category)
                .Include(p => p.Shop)
                .Include(p => p.Variants)
                .Where(p => p.ShopId == shopId)
                .AsQueryable();

            // 3. Tính tổng số lượng bản ghi thỏa mãn điều kiện tìm kiếm
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Phân trang và lấy dữ liệu (Luôn OrderBy trước khi Skip/Take)
            var items = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            return new PagedResult<Product>(items, totalCount, pageNumber, pageSize);
        }
    }
}
