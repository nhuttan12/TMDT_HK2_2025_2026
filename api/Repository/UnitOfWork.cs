
namespace api.Repository
{
    public interface IUnitOfWork
    {
        Task CommitAsync();
    }
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyAppDbContext _context;
        public UnitOfWork(MyAppDbContext context)
        {
            _context = context;
        }
        public async Task CommitAsync() 
        {
            await _context.SaveChangesAsync();
        }
    }
}
