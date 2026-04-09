using AutoMapper;
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

        public Task<List<UserInfoDTO>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<UserInfoDTO?> GetByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? throw new NotFoundException("No User witth id: " + id) : _mapper.Map<UserInfoDTO>(user);
        }

        public async Task GetUserByRefreshTokenAsync(string refreshToken)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<bool> IsExistByUserNameAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username); ;
        }

        public async Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto)
        {
            throw new NotImplementedException();
        }
    }
}
