using api.Database;
using api.Dtos.Users.Responses;
using api.Models;
using Api.Models.Users;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace api.Repository.UserRepo
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task AddNew(User user, CancellationToken ct = default);
        public Task<User?> GetUserByIdAsync(Guid id, bool trackChanges = false, CancellationToken ct = default);
        public Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize, CancellationToken ct = default);

        public Task<User?> GetByEmailAsync(string email, bool trackChanges = false, CancellationToken ct = default);
        Task UpdateAsync(User user, CancellationToken ct);
        public Task<ICollection<Address>?> GetAddressById(Guid id, CancellationToken ct);
        Task<Guid> Lock(Guid userId, CancellationToken cancellationToken);
    }
    public class UserRepository(MyAppDbContext _context) : IUserRepository
    {
        public async Task AddNew(User user, CancellationToken ct = default)
        {
            await _context.Users.AddAsync(user, ct);
        }
        public async Task<User?> GetUserByIdAsync(Guid id, bool trackChanges = false, CancellationToken ct = default)
        {
            var query = FindAll(trackChanges); // Tái sử dụng FindAll để nhất quán logic

            return await query
                .Include(u => u.Addresses)
                 .Include(u => u.UserDetail)
                 .Include(u => u.UserExternalLogin)
                 .FirstOrDefaultAsync(u => u.Id == id, ct);
        }
        public async Task<(IEnumerable<User> Items, int TotalCount)> GetAllPagedAsync(int pageNumber, int pageSize, CancellationToken ct = default)
        {
            var query = _context.Users
                .Include(u => u.Role)
                .Include(u => u.UserDetail)
                .Include(u => u.UserExternalLogin)
                .AsNoTracking();

            var totalCount = await query.CountAsync(ct); // Đếm tổng số bản ghi

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

        public Task UpdateAsync(User user, CancellationToken ct)
        {

            throw new NotImplementedException();
        }

        public IQueryable<User> FindAll(bool trackChanges = false)
        {
            return !trackChanges ? _context.Users.AsNoTracking() : _context.Users;
        }

        public IQueryable<User> FindByCondition(Expression<Func<User, bool>> expression, bool trackChanges = false)
        {
            return !trackChanges ? _context.Users.Where(expression).AsNoTracking() : _context.Users.Where(expression);
        }

        public async Task CreateAsync(User entity, CancellationToken cancellationToken = default)
        {
            await _context.Users.AddAsync(entity, cancellationToken);
        }

        public void Update(User entity)
        {
            _context.Users.Update(entity);
        }

        public void Delete(User entity)
        {
            _context.Users.Remove(entity);
        }

        public async Task<ICollection<Address>?> GetAddressById(Guid id, CancellationToken ct)
        {
            return await _context.Address
                 .Where(u => u.UserId == id)
                 .ToListAsync(ct);
        }

        public async Task<Guid> Lock(Guid userId, CancellationToken cancellationToken)
        {
            var currentTime = DateTimeOffset.UtcNow;

            var lockUntil = currentTime.AddMonths(6);

            await _context.UserDetails
                .Where(ud => ud.UserId == userId)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(ud => ud.LockTimeStart, currentTime)
                    .SetProperty(ud => ud.LockTimeEnd, lockUntil),
                    cancellationToken);

            return userId;
        }
    }
}
