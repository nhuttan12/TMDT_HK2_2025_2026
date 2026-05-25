using api.Exceptions;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.UserRepo
{
    public interface IAuthRepo
    {
        public Task<User?> GetUserByEmailAsync(string email, CancellationToken ct = default);
        Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default);
        Task AddAsync(User user, CancellationToken ct = default);

        Task<User?> GetByIdWithRoleAsync(Guid userId, CancellationToken ct = default);
    }
    public class AuthRepo(MyAppDbContext _context) : IAuthRepo
    {
        public async Task<User?> GetUserByEmailAsync(string email, CancellationToken ct = default)
            =>  await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Email == email, ct);
        
        public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default)
            => await _context.Users.AnyAsync(u => u.Email == email, ct);

        public async Task AddAsync(User user, CancellationToken ct = default)
            => await _context.Users.AddAsync(user, ct); 
        public async Task<User?> GetByIdWithRoleAsync(Guid userId, CancellationToken ct = default)
            => await _context.Users 
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == userId);
    }
}
