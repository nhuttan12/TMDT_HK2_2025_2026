using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.UserRepo
{
    public interface IUserRepository
    {
        public void AddNew(User user, CancellationToken ct = default);
        public Task<User?> GetUserByIdAsync(int id, bool trackChanges = false, CancellationToken ct = default);
        public Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize, CancellationToken ct = default);
        
        public Task<User?> GetByEmailAsync(string email, bool trackChanges = false, CancellationToken ct = default);

    }
    public class UserRepository(MyAppDbContext _context) : IUserRepository
    {
        public async void AddNew(User user, CancellationToken ct = default)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync(ct);
        }

        public async Task<User?> GetUserByIdAsync(int id, bool trackChanges = false, CancellationToken ct = default)
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

            return await query.FirstOrDefaultAsync(u => u.Id == id, ct);
        }

        public async Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize, CancellationToken ct = default)
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
                .ToListAsync(ct);

            return (items, totalCount);
        }

        public async Task<User?> GetByEmailAsync(string email, bool trackChanges = false, CancellationToken ct = default)
        {
            // 1. Fail Fast: Kiểm tra tham số ngay lập tức
            if (string.IsNullOrWhiteSpace(email)) return null;

            IQueryable<User> query = _context.Users;

            // 2. Tối ưu Query: Chỉ Include khi thực sự cần thiết 
            // (Senior Tip: Trong một số trường hợp nên tách riêng method GetWithDetails)
            query = query
                .Include(u => u.UserDetail)
                .Include(u => u.UserExternalLogin);

            // 3. Tối ưu RAM/CPU: Read-only check
            if (!trackChanges)
            {
                query = query.AsNoTracking();
            }

            // 4. Khắc phục CS8603 & CA2016: Truyền Token và cho phép nullable
            // Sử dụng ToLower() hoặc so sánh không phân biệt hoa thường tùy vào cấu hình Collation của DB
            return await query.FirstOrDefaultAsync(u => u.Email == email, ct);
        }
    }
}
