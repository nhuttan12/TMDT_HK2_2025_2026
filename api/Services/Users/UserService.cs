using api.Controllers;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Exceptions;
using api.Models;
using api.Models.Roles;
using api.Models.Utilities;
using api.Repository;
using api.Repository.UserRepo;
using api.Services.Auths;
using api.Utilities;
using AutoMapper;
using Azure.Core;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Users
{
    public interface IUserService
    {
        public Task<Result<UserInfoDTO>> CreateAsync(UserCreateDto userCreateDto, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> UpdateAsync(int id, UserUpdateDto userUpdateDto, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> GetByIdAsync(int id, CancellationToken ct = default);
        public ValueTask<Result<bool>> IsExistByEmailAsync(string email, CancellationToken ct = default);
        public Task<Result<Pagination<UserInfoDTO>>> GetAllAsync(UserParameters query, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> GetUserByRefreshTokenAsync(string refreshToken, CancellationToken ct = default);
        Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default);
        Task<Result<User>> CreateFromGoogleAsync(string? email, string? name, CancellationToken ct = default);
        Task<Result<object>> ChangePasswordAsync(int id, ChangePasswordDto request, CancellationToken ct = default);
    }
    public class UserService : IUserService
    {
        private readonly MyAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IAuthService _authService;
        private readonly IUserRepository _userRepo;
        private readonly UnitOfWork _unitOfWork;


        public UserService(MyAppDbContext context, IMapper Mapper, IAuthService authService, IUserRepository userRepository, UnitOfWork unitOfWork)
        {
            _context = context;
            _mapper = Mapper;
            _authService = authService;
            _userRepo = userRepository;
            _unitOfWork = unitOfWork;   
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

            await _userRepo.CreateAsync(user, ct);   
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
        public async Task<Result<UserInfoDTO>> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var user = await _userRepo.GetUserByIdAsync(id, ct: ct);
            if(user == null)
            {
                return Result<UserInfoDTO>.Failure(new Error("NoUser", $"No user found with id: {id}"), ErrorType.NotFound);
            }
            var dto = _mapper.Map<UserInfoDTO>(user);
            return Result<UserInfoDTO>.Success(dto);

        }
        public async Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(email)) return Result<User>.Failure(new Error("InvalidEmail", "Email cannot be null or empty."), ErrorType.BadRequest);

            var user = await _userRepo.GetByEmailAsync(email, ct: ct);
            return user == null ? Result<User>.Failure(new Error("UserNotFound", "No user found with the provided email."), ErrorType.NotFound) : Result<User>.Success(user);
        }
        //**********************************************************************************

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
            var user = await _userRepo.GetUserByIdAsync(id, ct: ct);
            if (user == null)
                return Result<UserInfoDTO>.Failure(new Error("NoUser", $"No user found with id: {id}"), ErrorType.NotFound);
            user.Update(userUpdateDto.Fullname, userUpdateDto.PhoneNumber, userUpdateDto.AvatarUrl, userUpdateDto.Addresses, id);
            _userRepo.Update(user);
            await _unitOfWork.CommitAsync(ct);
            return Result<UserInfoDTO>.Success(_mapper.Map<UserInfoDTO>(user));
        }

        public async Task<Result<object>> ChangePasswordAsync(
            int id,
            ChangePasswordDto request,
            CancellationToken ct = default)
        {
            // 1. Fail Fast: Kiểm tra đầu vào cơ bản (có thể đã qua Validation ở Controller)
            if (request.OldPassword == request.NewPassword)
                return Result<object>.Failure(new Error("User.SamePassword", "Mật khẩu mới không được trùng mật khẩu cũ."), ErrorType.BadRequest);

            // 2. I/O Bound
            var user = await _userRepo.GetUserByIdAsync(id, ct: ct);
            if (user == null)
                return Result<object>.Failure(new Error("User.NotFound", $"Người dùng ID {id} không tồn tại."), ErrorType.NotFound);

            // 3. Logic Validation: Kiểm tra mật khẩu cũ thông qua AuthService
            var isOldPasswordValid = _authService.VerifyPassword(user, request.OldPassword, user.PasswordHash);
            if (!isOldPasswordValid)
                return Result<object>.Failure(new Error("User.InvalidPassword", "Mật khẩu cũ không chính xác."), ErrorType.BadRequest);

            // 4. Update & Hash
            var newPasswordHash = _authService.HashPassword(user, request.NewPassword);
            user.UpdatePassword(newPasswordHash);

            // 5. Persistence: Sử dụng Unit of Work để đảm bảo Transaction
            _userRepo.Update(user);
            await _unitOfWork.CommitAsync(ct);

            return Result<string>.Success("Password changed successfully.");
        }
    }
}