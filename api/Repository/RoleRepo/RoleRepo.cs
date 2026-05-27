using api.Database;
using api.Models.Roles;
using Microsoft.EntityFrameworkCore;

namespace api.Repository.RoleRepo
{
    public interface IRoleRepo
    {
        Task<Role?> GetByNameAsync(string name);
    }
    public class RoleRepo : IRoleRepo
    {
                private readonly MyAppDbContext _context;

        public RoleRepo(MyAppDbContext context)
        {
            _context = context;
        }

        public async Task<Role?> GetByNameAsync(string name)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);
        }
    }
}
