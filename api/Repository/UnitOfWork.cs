
namespace api.Repository
{
    public interface IUnitOfWork
    {
        Task CommitAsync(CancellationToken ct = default);
    }
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyAppDbContext _context;
        public UnitOfWork(MyAppDbContext context)
        {
            _context = context;
        }
        public async Task CommitAsync(CancellationToken ct = default) 
        {
            await _context.SaveChangesAsync(ct);
        }
    }
}
