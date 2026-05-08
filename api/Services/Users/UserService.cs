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
using api.Utilities;

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

        public async Task<Result<UserInfoDTO>> CreateAsync(UserCreateDto userCreateDto, CancellationToken ct = default)
        {
            var user = _mapper.Map<User>(userCreateDto);
            //  hash password
            user.SetPassword(_authService.HashPassword(user, userCreateDto.Password));
            // add role
            Role? role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (role == null)
            {
                return Result<UserInfoDTO>.Failure(new Error("RoleNotFound","Default role 'User' not found."), ErrorType.NotFound);
            }
            user.Role = role;

            _userRepo.AddNew(user, ct);   
            return Result<UserInfoDTO>.Success(_mapper.Map<UserInfoDTO>(user));
        }

        public Task<Result<User>> CreateFromGoogleAsync(string? email, string? name, CancellationToken ct = default)
        {
            throw new NotImplementedException();
        }

        public async Task<Result<Pagination<UserInfoDTO>>> GetAllAsync(UserParameters query, CancellationToken ct = default)
        {
            // 1. Validation (Có thể đưa vào FluentValidation)
            if (query.PageNumber <= 0 || query.PageSize <= 0)
                return Result<Pagination<UserInfoDTO>>.Failure(new Error("InvalidPagination", "PageNumber and PageSize must be greater than 0."), ErrorType.BadRequest);

            // 2. Gọi Repo lấy dữ liệu thô (Domain Entities)
            var (users, totalCount) = await _userRepo.GetAllPagedAsync(query.PageNumber, query.PageSize, ct);

            if (!users.Any()) 
                return Result<Pagination<UserInfoDTO>>.Failure(new Error("NoUsers", "No users found."), ErrorType.NotFound);

            // 3. Mapping sang DTOs
            var userDtos = _mapper.Map<IEnumerable<UserInfoDTO>>(users);

            // 4. Trả về kết quả phân trang
            return Result<Pagination<UserInfoDTO>>.Success(new Pagination<UserInfoDTO>(userDtos, totalCount, query.PageNumber, query.PageSize));
          
        }


        public async Task<Result<UserInfoDTO?>> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var user = await _userRepo.GetUserByIdAsync(id, ct: ct);
            return user == null ? throw new NotFoundException("No User witth id: " + id) : _mapper.Map<UserInfoDTO>(user);
        }
        //**********************************************************************************
        public Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default)
        {
            // TODO: Implement logic to retrieve user by email from the database
            throw new NotImplementedException();
        }
        public async Task<Result<UserInfoDTO>> GetUserByRefreshTokenAsync(string refreshToken, CancellationToken ct = default)
        {
            // TODO: Implement logic to retrieve user by refresh token from the database
            throw new NotImplementedException();
        }

        public async ValueTask<Result<bool>> IsExistByEmailAsync(string email, CancellationToken ct = default)
        {
            return await _context.Users.AnyAsync(u => u.Email == email, ct);
        }

        public async Task<Result<UserInfoDTO>> UpdateAsync(int id, UserUpdateDto userUpdateDto, CancellationToken ct = default)
        {
            // TODO: Implement logic to update user information in the database
            throw new NotImplementedException();
        }

    }

}