using api.Models.Utilities;
using AutoMapper;
using demo1.Controllers;
using demo1.Data;
using demo1.Dtos.Users.Requests;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Models;
using demo1.Models.Roles;
using demo1.Services.Auths;
using Microsoft.EntityFrameworkCore;

namespace demo1.Services.Users
{
    public class UserService : IUserService
    {
        private readonly MyAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;

        public UserService(MyAppDbContext context, IMapper Mapper, IAuthService authService)
        {
            _context = context;
            _mapper = Mapper;
            _authService = authService;
        }

        public async Task<UserInfoDTO> CreateAsync(UserCreateDto userCreateDto)
        {
            var user = _mapper.Map<User>(userCreateDto);
            //  hash password
            user.PasswordHash = _authService.hashPassword(user, userCreateDto.Password);
            // add role
            Role? role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (role == null)
            {
                throw new Exception("User role not found.");
            }
            user.Role = role;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return _mapper.Map<UserInfoDTO>(user);
        }

        public Task<User?> CreateFromGoogleAsync(string? email, string? name)
        {
            throw new NotImplementedException();
        }

        public async Task<Pagination<UserInfoDTO>> GetAllAsync(UserParameters query)
        {
            if (query.PageNumber <= 0 || query.PageSize <= 0)
            {
                throw new BadRequestException("PageNumber and PageSize must be greater than 0.");
            }
            // trả về 1 truy vấn trì hoãn để có thể áp dụng các câu lệnh query khác như skip và take.
            // trước khi thực hiện truy vấn cơ sở dữ liệu bằng câu lệnh TolistAsync(),...
            var usersQuery = _context.Users.AsNoTracking().AsQueryable();
            var totalUsers = await _context.Users.CountAsync();

            var skip = (query.PageNumber - 1) * query.PageSize;

            if (skip > 0)
            {
                usersQuery = usersQuery.Skip(skip);
            }
            var users = await usersQuery.Take(query.PageSize).ToListAsync();
            if (users == null || users.Count == 0)
            {
                throw new NotFoundException("No users found.");
            }
            Pagination<UserInfoDTO> res = new(_mapper.Map<IEnumerable<UserInfoDTO>>(users), users.Count, query.PageNumber, query.PageSize)
            {
                Items = _mapper.Map<IEnumerable<UserInfoDTO>>(users),
                TotalItems = totalUsers,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
            };
            return res;
        }

        public Task<User> GetByEmailAsync(string? email)
        {
            // TODO: Implement logic to retrieve user by email from the database
            throw new NotImplementedException();
        }

        public async Task<UserInfoDTO?> GetByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? throw new NotFoundException("No User witth id: " + id) : _mapper.Map<UserInfoDTO>(user);
        }

        public async Task GetUserByRefreshTokenAsync(string refreshToken)
        {
            // TODO: Implement logic to retrieve user by refresh token from the database
            throw new NotImplementedException();
        }

        public async ValueTask<bool> IsExistByUserNameAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username); ;
        }

        public async Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto)
        {
            // TODO: Implement logic to update user information in the database
            throw new NotImplementedException();
        }
    }

}
