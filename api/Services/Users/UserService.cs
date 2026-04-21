using api.Models.Utilities;
using api.Repository;
using AutoMapper;
using api.Controllers;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Exceptions;
using api.Models;
using api.Models.Roles;
using api.Services.Auths;
using Microsoft.EntityFrameworkCore;
using api.Repository.UserRepo;

namespace api.Services.Users
{
    public class UserService : IUserService
    {
        private readonly MyAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepo;

        public UserService(MyAppDbContext context, IMapper Mapper, IAuthService authService, IUserRepository userRepository)
        {
            _context = context;
            _mapper = Mapper;
            _authService = authService;
            _userRepo = userRepository;
        }

        public async Task<UserInfoDTO> CreateAsync(UserCreateDto userCreateDto)
        {
            var user = _mapper.Map<User>(userCreateDto);
            //  hash password
            user.SetPassword(_authService.hashPassword(user, userCreateDto.Password));
            // add role
            Role? role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (role == null)
            {
                throw new Exception("User role not found.");
            }
            user.Role = role;

            _userRepo.AddNewRepository(user);   
            return _mapper.Map<UserInfoDTO>(user);
        }

        public Task<User?> CreateFromGoogleAsync(string? email, string? name)
        {
            throw new NotImplementedException();
        }

        public async Task<Pagination<UserInfoDTO>> GetAllAsync(UserParameters query)
        {
            // 1. Validation (Có thể đưa vào FluentValidation)
            if (query.PageNumber <= 0 || query.PageSize <= 0)
                throw new BadRequestException("PageNumber and PageSize must be > 0.");

            // 2. Gọi Repo lấy dữ liệu thô (Domain Entities)
            var (users, totalCount) = await _userRepo.GetAllPagedAsync(query.PageNumber, query.PageSize);

            if (!users.Any()) throw new NotFoundException("No users found.");

            // 3. Mapping sang DTOs
            var userDtos = _mapper.Map<IEnumerable<UserInfoDTO>>(users);

            // 4. Trả về kết quả phân trang
            return new Pagination<UserInfoDTO>(userDtos, totalCount, query.PageNumber, query.PageSize);
          
        }


        public async Task<UserInfoDTO?> GetByIdAsync(int id)
        {
            var user = await _userRepo.GetUserByIdAsync(id);
            return user == null ? throw new NotFoundException("No User witth id: " + id) : _mapper.Map<UserInfoDTO>(user);
        }
        //**********************************************************************************
        public Task<User> GetByEmailAsync(string? email)
        {
            // TODO: Implement logic to retrieve user by email from the database
            throw new NotImplementedException();
        }
        public async Task GetUserByRefreshTokenAsync(string refreshToken)
        {
            // TODO: Implement logic to retrieve user by refresh token from the database
            throw new NotImplementedException();
        }

        public async ValueTask<bool> IsExistByEmailAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email); ;
        }

        public async Task<UserInfoDTO> UpdateAsync(int id, UserUpdateDto userUpdateDto)
        {
            // TODO: Implement logic to update user information in the database
            throw new NotImplementedException();
        }

    }

}