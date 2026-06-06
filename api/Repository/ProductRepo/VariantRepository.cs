using api.Database;
using api.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace api.Repository.ProductRepo
{
    public interface IVariantRepository : IBaseRepository<Variant>
    {
        Task AddAsync(Variant variant, CancellationToken cancellationToken);
        Task<Variant?> GetByIdAsync(Guid id, bool trackChanges, CancellationToken cancellationToken);
        Task<IEnumerable<Variant>> GetByProductIdAsNoTrackingAsync(Guid productId, CancellationToken cancellationToken);
    }
    public class VariantRepository(MyAppDbContext context) : IVariantRepository
    {
        public Task AddAsync(Variant variant, CancellationToken cancellationToken)
        {
            return context.Variants.AddAsync(variant, cancellationToken).AsTask();
        }

        public async Task<Variant?> GetByIdAsync(Guid id, bool trackChanges, CancellationToken cancellationToken)
        {
            // 1. Chuyển thành IQueryable để xây dựng câu truy vấn linh hoạt
            IQueryable<Variant> query = context.Variants;

            // 2. Nếu không cần theo dõi sự thay đổi, lập tức ngắt Tracking để tiết kiệm RAM
            if (!trackChanges)
            {
                query = query.AsNoTracking();
            }

            // 3. Thực thi truy vấn xuống SQL Server
            return await query.FirstOrDefaultAsync(v => v.Id == id, cancellationToken);
        }

        public async Task<IEnumerable<Variant>> GetByProductIdAsNoTrackingAsync(Guid productId, CancellationToken cancellationToken)
        {
            return await context.Variants.AsNoTracking().Where(v => v.ProductId == productId).ToListAsync(cancellationToken);
        }

        public void Update(Variant entity)
        {
            context.Variants.Update(entity);
        }

        public Task CreateAsync(Variant entity, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Delete(Variant entity)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Variant> FindAll(bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

        public IQueryable<Variant> FindByCondition(Expression<Func<Variant, bool>> expression, bool trackChanges = false)
        {
            throw new NotImplementedException();
        }

    }
}
