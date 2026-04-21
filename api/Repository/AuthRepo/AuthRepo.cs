using api.Exceptions;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.UserRepo
{
    public interface IAuthRepo
    {
        public Task<User?> GetUserByEmailAsync(string email);
        Task<bool> ExistsByEmailAsync(string email);
        Task AddAsync(User user);

        Task<User?> GetByIdWithRoleAsync(int userId);
    }
    public class AuthRepo(MyAppDbContext _context) : IAuthRepo
    {
        public async Task<User?> GetUserByEmailAsync(string email)
            =>  await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Email == email);
        
        public async Task<bool> ExistsByEmailAsync(string email)
            => await _context.Users.AnyAsync(u => u.Email == email);

        public async Task AddAsync(User user)
            => await _context.Users.AddAsync(user);

        public async Task<User?> GetByIdWithRoleAsync(int userId)
            => await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == userId);
    }
}
