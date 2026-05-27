using api.Database;
using api.Models.Category;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Linq.Expressions;

namespace api.Repository.Categories
{
    public interface ICategoryRepo : IBaseRepository<Category>
    {
        Task<Category?> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        Task<Category?> GetByName(string name, CancellationToken ct = default);
        Task<(IReadOnlyCollection<Category> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken);
    }
    public class CategoryRepo(MyAppDbContext _context) : ICategoryRepo
    {
        public async Task CreateAsync(Category entity, CancellationToken ct = default)
        {
           await _context.Categories.AddAsync(entity, ct);
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

        public async Task<(IReadOnlyCollection<Category> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, CancellationToken cancellationToken)
        {
            var query = _context.Categories.AsNoTracking();

            // Thực thi song song (tối ưu CPU & I/O) việc đếm tổng và lấy dữ liệu
            var totalCountTask = query.CountAsync(cancellationToken);

            var itemsTask = query
                .OrderBy(c => c.Name) // Luôn phải có OrderBy trước khi Skip/Take
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            await Task.WhenAll(totalCountTask, itemsTask);

            return (itemsTask.Result, totalCountTask.Result);
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
