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
        Task<bool> ExistsAsync(Guid productId, CancellationToken cancellationToken);
        Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, FilterProductQueryDto filterDto, CancellationToken cancellationToken);
        Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
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
                .FirstOrDefaultAsync(p => p.Id == id, cancellationToken);
        }
        public async Task<PagedResult<Product>> GetAllAsync(int pageNumber, int pageSize, FilterProductQueryDto? filterDto, CancellationToken cancellationToken)
        {

            // 1. Khởi tạo query với AsNoTracking() cho mục đích Read-Only
            var query = _context.Products.AsNoTracking();

            // 2. Xây dựng truy vấn động (Dynamic Filtering)
            if (filterDto != null)
            {
                if (!string.IsNullOrWhiteSpace(filterDto.Name))
                {
                    // Dùng EF.Functions.Like hoặc Contains tùy thuộc cấu hình SQL Collation
                    query = query.Where(p => p.Name.Contains(filterDto.Name));
                }

                if (filterDto.CategoryId.HasValue)
                {
                    query = query.Where(p => p.CategoryId == filterDto.CategoryId.Value);
                }

                if (filterDto.MinPrice.HasValue)
                    query = query.Where(p => p.BasePrice >= filterDto.MinPrice.Value);

                if (filterDto.MaxPrice.HasValue)
                    query = query.Where(p => p.BasePrice <= filterDto.MaxPrice.Value);

                if (filterDto.Status.HasValue)
                    query = query.Where(p => p.Status == filterDto.Status.Value);
            }

            // 3. Đếm tổng số lượng bản ghi (Cần thiết cho Pagination)
            // Thực thi SQL Count (Chỉ đếm, không kéo dữ liệu)
            var totalCount = await query.CountAsync(cancellationToken);

            // 4. Áp dụng Phân trang (Skip & Take) và lấy dữ liệu
            var items = await query
                .AsNoTracking() // Đảm bảo không theo dõi để tối ưu hiệu suất cho truy vấn chỉ đọc
                .Include(p => p.Variants)
                .OrderByDescending(p => p.CreatedAt) // LUÔN LUÔN phải có OrderBy trước khi Skip/Take
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken); // Thực thi SQL Select

            // 5. Đóng gói vào đối tượng trả về
            return new PagedResult<Product>
            (
                items,
                totalCount,
                pageNumber,
                pageSize
            );
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
    }
}
