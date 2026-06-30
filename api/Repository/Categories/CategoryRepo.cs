using api.Database;
using api.Dtos.Products.Respones;
using api.Dtos.Shops.Response;
using api.Models.Category;
using api.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace api.Repository.Categories
{
    public interface ICategoryRepo : IBaseRepository<Category>
    {
        Task<Category?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Category?> GetByName(string name, CancellationToken ct = default);
        Task<CategoryNameResponse> GetListNameCategory(CancellationToken cancellationToken);
        Task<PagedResult<Category>> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken);
    }
    public class CategoryRepo(MyAppDbContext _context) : ICategoryRepo
    {
        public async Task CreateAsync(Category entity, CancellationToken cancellationToken = default)
        {
            await _context.Categories.AddAsync(entity, cancellationToken);
        }

        public void Delete(Category entity)
        {
            _context.Categories.Remove(entity);
        }

        public IQueryable<Category> FindAll(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Category> FindByCondition(Expression<Func<Category, bool>> expression, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public async Task<Category?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Categories.FindAsync(id, cancellationToken);
        }

        public async Task<Category?> GetByName(string name, CancellationToken ct = default)
        {
            return await _context.Categories.FirstOrDefaultAsync(c => c.Name == name, ct);
        }

        public async Task<CategoryNameResponse> GetListNameCategory(CancellationToken cancellationToken)
        {
            var res = await _context.Categories
               .AsNoTracking()
               .Select(s => new CategoryNameDto(s.Id, s.Name))
               .ToListAsync(cancellationToken);
            return new CategoryNameResponse(res);
        }

        public async Task<PagedResult<Category>> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var query = _context.Categories.AsNoTracking();

            // Thực thi song song (tối ưu CPU & I/O) việc đếm tổng và lấy dữ liệu
            var totalCount =await query.CountAsync(cancellationToken);

            var items = await query
                .OrderBy(c => c.Name) // Luôn phải có OrderBy trước khi Skip/Take
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);


            return new PagedResult<Category>
            (
                items,
                totalCount,
                pageNumber,
                pageSize
            );
        }

        public void Update(Category entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _context.Categories.Update(entity);
            }
        }

    }
}
