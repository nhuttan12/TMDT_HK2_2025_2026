using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.UserRepo
{
    public interface IUserRepository
    {
        public void AddNewRepository(User user);
        public Task<User?> GetUserByIdAsync(int id, bool trackChanges = false);
        public Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize);

    }
    public class UserRopository(MyAppDbContext _context) : IUserRepository
    {
        public async void AddNewRepository(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id, bool trackChanges = false)
        {
            var query = _context.Users
             .Include(u => u.UserDetail)
             .Include(u => u.UserExternalLogin)
             .AsQueryable();

            // Nếu chỉ đọc dữ liệu, tắt Tracking để tối ưu RAM và CPU
            if (!trackChanges)
            {
                query = query.AsNoTracking();
            }

            return await query.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize)
        {
            var query = _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserDetail)
                .Include(u => u.UserExternalLogin)
                .AsNoTracking();

            var totalCount = await query.CountAsync(); // Đếm tổng số bản ghi

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (items, totalCount);
        }
    }
}
