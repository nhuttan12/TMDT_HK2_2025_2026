using api.Controllers;
using api.Database;
using api.Dtos.Common;
using api.Dtos.Users.Requests;
using api.Dtos.Users.Responses;
using api.Extensions.MapExtention;
using api.Models;
using api.Models.Roles;
using api.Models.Users;
using api.Repository;
using api.Repository.UserRepo;
using api.Services.Auths;
using api.Services.Mail;
using api.Utilities;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Users
{
    public interface IUserService
    {
        public Task<Result<UserInfoDTO>> CreateAsync(UserCreateDto userCreateDto, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> UpdateAsync(Guid id, UserUpdateDto userUpdateDto, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> GetByIdAsync(Guid id, CancellationToken ct = default);
        public ValueTask<Result<bool>> IsExistByEmailAsync(string email, CancellationToken ct = default);
        public Task<Result<PagedResult<UserInfoDTO>>> GetAllAsync(PaginationRequestDto query, CancellationToken ct = default);
        public Task<Result<UserInfoDTO>> GetUserByRefreshTokenAsync(string refreshToken, CancellationToken ct = default);
        Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default);
        Task<Result<User>> CreateFromGoogleAsync(string? email, string? name, CancellationToken ct = default);
        Task<Result<object>> ChangePasswordAsync(Guid id, ChangePasswordDto request, CancellationToken ct = default);
        Task<Result<Guid>> Lock(Guid userId, CancellationToken cancellationToken);
    }
    public class UserService(
        MyAppDbContext context, 
        ILogger<User> logger,
        IMapper mapper, 
        IAuthService authService, 
        IUserRepository repo, 
        IMailService mailService,
        IIdGenerator idGenerator,
        IUnitOfWork unitOfWork) : IUserService
    {

        public async Task<Result<UserInfoDTO>> CreateAsync(UserCreateDto userCreateDto, CancellationToken ct = default)
        {
            var id = idGenerator.NewId();
            
            Role? role = await context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            if (role == null)
            {
                return Result<UserInfoDTO>.Failure(Error.Create("RoleNotFound", "Default role 'User' not found.", ErrorType.NotFound));
            }
            var result = User.Create(id,userCreateDto.Email, userCreateDto.FullName, role, User.LOCAL_KEY,User.LOCAL_PROVIDER);
            if (!result.IsSuccess)
            {
                return Result<UserInfoDTO>.Failure(result.Error);
            }
            var user = result.Value!;
            //  hash password
            user.SetPassword(authService.HashPassword(user, userCreateDto.Password));

            await repo.CreateAsync(user, ct);
            await unitOfWork.CommitAsync(ct);
            return Result<UserInfoDTO>.Success(mapper.Map<UserInfoDTO>(user));
        }
        public Task<Result<User>> CreateFromGoogleAsync(string? email, string? name, CancellationToken ct = default)
        {
            throw new NotImplementedException();
        }
        public async Task<Result<PagedResult<UserInfoDTO>>> GetAllAsync(PaginationRequestDto query, CancellationToken ct = default)
        {
            // 1. Validation (Có thể đưa vào FluentValidation)
            if (query.PageNumber <= 0 || query.PageSize <= 0)
                return Result<PagedResult<UserInfoDTO>>.Failure(Error.Create("InvalidPagination", "PageNumber and PageSize must be greater than 0.", ErrorType.BadRequest));

            // 2. Gọi Repo lấy dữ liệu thô (Domain Entities)
            var (users, totalCount) = await repo.GetAllPagedAsync(query.PageNumber, query.PageSize, ct);

            if (!users.Any())
                return Result<PagedResult<UserInfoDTO>>.Failure(Error.Create("NoUsers", "No users found.", ErrorType.NotFound));

            // 3. Mapping sang DTOs
            var userDtos = mapper.Map<IEnumerable<UserInfoDTO>>(users);

            IReadOnlyList<UserInfoDTO> userDtosList = userDtos.ToList();


            // 4. Trả về kết quả phân trang
            return Result<PagedResult<UserInfoDTO>>.Success(new PagedResult<UserInfoDTO>(userDtosList, totalCount, query.PageNumber, query.PageSize));

        }
        public async Task<Result<UserInfoDTO>> GetByIdAsync(Guid id, CancellationToken ct = default)
        {
            // 1. Chỉ gọi duy nhất 1 lần xuống DB, lấy lên toàn bộ thông tin gốc của Aggregate root
            var user = await repo.GetUserByIdAsync(id,ct: ct);

            // 2. Fail Fast nếu không tìm thấy dữ liệu
            if (user == null)
            {
                return Result<UserInfoDTO>.Failure(
                    Error.Create("User.NotFound", $"No user found with id: {id}", ErrorType.NotFound));
            }

            // 3. Thực hiện Mapping sạch sẽ, an toàn dữ liệu
            var dto = user.ToResponseDto();

            return Result<UserInfoDTO>.Success(dto);
        }
        public async Task<Result<User>> GetByEmailAsync(string? email, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(email)) return Result<User>.Failure(Error.Create("InvalidEmail", "Email cannot be null or empty.", ErrorType.BadRequest));

            var user = await repo.GetByEmailAsync(email, ct: ct);
            return user == null ? Result<User>.Failure(Error.Create("UserNotFound", "No user found with the provided email.", ErrorType.NotFound)) : Result<User>.Success(user);
        }

        public async Task<Result<UserInfoDTO>> GetUserByRefreshTokenAsync(string refreshToken, CancellationToken ct = default)
        {
            // TODO: Implement logic to retrieve user by refresh token from the database
            throw new NotImplementedException();
        }

        public async ValueTask<Result<bool>> IsExistByEmailAsync(string email, CancellationToken ct = default)
        {
            return await context.Users.AnyAsync(u => u.Email == email, ct);
        }

        public async Task<Result<UserInfoDTO>> UpdateAsync(Guid id, UserUpdateDto userUpdateDto, CancellationToken ct = default)
        {
            var user = await repo.GetUserByIdAsync(id,trackChanges: true, ct: ct);
            if (user == null)
                return Result<UserInfoDTO>.Failure(Error.Create("NoUser", $"No user found with id: {id}", ErrorType.NotFound));
            var updateResult = user.Update(userUpdateDto.Fullname, userUpdateDto.PhoneNumber, userUpdateDto.AvatarUrl, userUpdateDto.Addresses, id);
            if (!updateResult.IsSuccess)
                return Result<UserInfoDTO>.Failure(updateResult.Error);
            //repo.Update(user);
            await unitOfWork.CommitAsync(ct);
            return Result<UserInfoDTO>.Success(user.ToResponseDto());
        }

        public async Task<Result<object>> ChangePasswordAsync(
            Guid id,
            ChangePasswordDto request,
            CancellationToken ct = default)
        {
            // 1. Fail Fast: Kiểm tra đầu vào cơ bản (có thể đã qua Validation ở Controller)
            if (request.OldPassword == request.NewPassword)
                return Result<object>.Failure(Error.Create("User.SamePassword", "Mật khẩu mới không được trùng mật khẩu cũ.", ErrorType.BadRequest));

            // 2. I/O Bound
            var user = await repo.GetUserByIdAsync(id, ct: ct);
            if (user == null)
                return Result<object>.Failure(Error.Create("User.NotFound", $"Người dùng ID {id} không tồn tại.", ErrorType.NotFound));

            // 3. Logic Validation: Kiểm tra mật khẩu cũ thông qua AuthService
            var isOldPasswordValid = authService.VerifyPassword(user, request.OldPassword, user.PasswordHash);
            if (!isOldPasswordValid)
                return Result<object>.Failure(Error.Create("User.InvalidPassword", "Mật khẩu cũ không chính xác.", ErrorType.BadRequest));

            // 4. Update & Hash
            var newPasswordHash = authService.HashPassword(user, request.NewPassword);
            var passwordUpdateResult = user.UpdatePassword(newPasswordHash);
            if (!passwordUpdateResult.IsSuccess)
                return Result<object>.Failure(passwordUpdateResult.Error);

            // 5. Persistence: Sử dụng Unit of Work để đảm bảo Transaction
            repo.Update(user);
            await unitOfWork.CommitAsync(ct);
            SendMailChangePassWord(user.Email, user.FullName);
            return Result<string>.Success("Password changed successfully.");
        }


        private void SendMailChangePassWord(string email, string name)
        {
            var placeholders = new Dictionary<string, string>
        {
            { "Username", name }, // Lấy từ User Entity trong DB
            { "Email", email },
            { "ChangedTime", DateTime.UtcNow.ToString("dd/MM/yyyy HH:mm:ss") + " UTC" },
        };

            var mailRequest = new HtmlMailRequestDto(
                ToEmail: email,
                Subject: "[Cảnh báo bảo mật] Mật khẩu của bạn đã được thay đổi",
                TemplateName: "PasswordChangedTemplate.html",
                TemplatePlaceholders: placeholders
            );

            // 4. Đẩy vào luồng ngầm (Fire-and-Forget) để tối ưu hiệu năng API
            _ = Task.Run(async () =>
            {
                try
                {
                    await mailService.SendHtmlEmailAsync(mailRequest, CancellationToken.None);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Lỗi gửi mail cảnh báo đổi mật khẩu cho: {Email}", email);
                }
            });

        }

        public async Task<Result<Guid>> Lock(Guid userId, CancellationToken cancellationToken)
        {
            var result = await repo.Lock(userId, cancellationToken);

            return Result<Guid>.Success(result);
        }
    }
}