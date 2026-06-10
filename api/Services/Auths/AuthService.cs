using api.Controllers;
using api.Dtos.Users.Responses;
using api.Exceptions;
using api.Models;
using api.Models.Users;
using api.Repository;
using api.Repository.RoleRepo;
using api.Repository.UserRepo;
using api.Utilities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace api.Services.Auths
{
    public interface IAuthService
    {
        public string HashPassword(User user, string password);
        public bool VerifyPassword(User user, string password, string passwordHash);
        public Task<Result<TokenResponse>> LoginAsync(LoginRequest req, CancellationToken ct = default);

        public Task<Result<TokenResponse>> RefreshTokenAsync(string refreshToken, CancellationToken ct = default);
        Task<Result<TokenResponse>> HandleGoogleLogin(GoogleInfoResponse googleInfo);
        public Task<Result<UserInfoDTO>> RegisterAsync(RegisterRequest registerRequest, CancellationToken ct = default);
    }
    public class AuthService(
       IPasswordHasher<User> passwordHasher,
        IAuthRepo authRepo,
        ITokenService tokenService,
        IMapper mapper,
        IRoleRepo roleRepository,
        IUnitOfWork unitOfWork,
        IIdGenerator idGenerator,
        ILogger<AuthService> logger) : IAuthService
    {
        private readonly IPasswordHasher<User> _passwordHasher = passwordHasher;
        private readonly IAuthRepo _authRepo = authRepo;
        private readonly ITokenService _tokenService = tokenService;
        private readonly IMapper _mapper = mapper;
        private readonly IRoleRepo _roleRepository = roleRepository;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly ILogger<AuthService> _logger = logger;
        public string HashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }

        public bool VerifyPassword(User user, string password, string passwordHash)
        {
            var res = _passwordHasher.VerifyHashedPassword(user, passwordHash, password);
            return res == PasswordVerificationResult.Success;
        }

        public async Task<Result<TokenResponse>> LoginAsync(LoginRequest req, CancellationToken ct = default)
        {
            // 1. Fail Fast - Kiểm tra đầu vào cực kỳ khắt khe
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            {
                return Result<TokenResponse>.Failure(Error.Create("AUTH_001", "Email và mật khẩu không được để trống", ErrorType.Validation));
            }

            // 2. Truy vấn dữ liệu với CancellationToken
            var user = await _authRepo.GetUserByEmailAsync(req.Email, ct);

            // 3. Bảo mật: Không tiết lộ cụ thể sai Email hay sai Password để tránh dò quét (Brute-force)
            if (user == null || !VerifyPassword(user, req.Password, user.PasswordHash))
            {
                _logger.LogWarning("Đăng nhập thất bại: {Email}", req.Email);
                return Result<TokenResponse>.Failure(Error.Create("AUTH_002", "Email hoặc mật khẩu không chính xác", ErrorType.Unauthorized));
            }

            // 4. Sinh Token
            return GenerateTokenResponse(user);
        }

        public async Task<Result<UserInfoDTO>> RegisterAsync(RegisterRequest request, CancellationToken ct = default)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
                return Result<UserInfoDTO>.Failure(Error.Create("AUTH_001", "Email và mật khẩu không được để trống", ErrorType.Validation));
            // 1. Validation Logic
            if (await _authRepo.ExistsByEmailAsync(request.Email, ct))
            {
                return Result<UserInfoDTO>.Failure(Error.Create("AUTH_002", "Tài khoản đã tồn tại", ErrorType.Conflict));
            }

            // 2. Business Rule: Mỗi User mới phải có Role mặc định
            var role = await _roleRepository.GetByNameAsync("User");
            if (role == null)
            {
                return Result<UserInfoDTO>.Failure(Error.Create("AUTH_003", "Cấu hình hệ thống lỗi: Không tìm thấy Role 'User'", ErrorType.Failure));
            }
            var id = idGenerator.NewId();
            // 3. Domain Logic: Khởi tạo Entity thông qua Factory Method (Rich Domain Model)
            var newUser = User.Create(id, request.Email, role, "Local", string.Empty);

            // 4. Security: Hashing (Sử dụng thư viện chuẩn thay vì hàm tự viết không rõ nguồn gốc)
            var passwordHash = _passwordHasher.HashPassword(newUser, request.Password);
            newUser.SetPassword(passwordHash);

            // 5. Persistence
            await _authRepo.AddAsync(newUser);
            await _unitOfWork.CommitAsync();

            return Result<UserInfoDTO>.Success(_mapper.Map<UserInfoDTO>(newUser));
        }

        public async Task<Result<TokenResponse>> HandleGoogleLogin(GoogleInfoResponse googleInfo)
        {
            // 1. Tìm user hiện có
            var user = await _authRepo.GetUserByEmailAsync(googleInfo.Email);

            if (user == null)
            {
                // 2. Lấy role mặc định (Tránh hard-code ID = 2)
                var defaultRole = await _roleRepository.GetByNameAsync("User")
                    ?? throw new InternalServerErrorException("Default role not found");

                // 3. Sử dụng Factory Method để tạo User object hoàn chỉnh
                // Việc khởi tạo UserDetail và ExternalLogin nên nằm trong logic của Entity User
                var id = idGenerator.NewId();
                user = new User
                {
                    Id = id,    
                    Email = googleInfo.Email,
                    PasswordHash = "",
                    RoleId = 2,
                    UserExternalLogin = UserExternalLogin.Create("Google", googleInfo.Sub),
                    UserDetail = new UserDetail
                    {
                        AvatarUrl = googleInfo.Avatar_url
                    },
                };

                await _authRepo.AddAsync(user);
                await _unitOfWork.CommitAsync();
            }

            // 4. Tạo JWT Token (Tách logic sinh token ra service riêng)
            return GenerateTokenResponse(user);
        }

        public Result<TokenResponse> GenerateTokenResponse(User user)
        {
            var retk = _tokenService.GenerateToken(user, false);
            var actk = _tokenService.GenerateToken(user, true);
            if (retk == null || actk == null)
                return Result<TokenResponse>.Failure(new Error("AUTH_003", "Failed to generate tokens"));
            // TODO: Save the refresh token to the database
            //_context.RefreshTokens.Add(new RefreshToken { token = retk });
            //await _context.SaveChangesAsync();
            var res = new TokenResponse
            {
                AccessToken = actk,
                RefreshToken = retk
            };
            return Result<TokenResponse>.Success(res);
        }


        public async Task<Result<TokenResponse>> RefreshTokenAsync(string refreshToken, CancellationToken ct = default)
        {
            var principal = _tokenService.ValidateToken(refreshToken, ct);
            var sub = principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var subId = Guid.Parse(sub ?? Guid.Empty.ToString());
            if (sub == null)
            {
                return Result<TokenResponse>.Failure(Error.Create("AUTH_001", "Invalid refresh token", ErrorType.Unauthorized));
            }

            var user = await _authRepo.GetByIdWithRoleAsync(subId, ct);

            if (user == null)
            {
                return Result<TokenResponse>.Failure(Error.Create("AUTH_002", "User not found", ErrorType.BadRequest));
            }

            // TODO: 3. Kiểm tra các logic bổ sung (Ví dụ: User có bị khóa không?)
            //if (user.IsLocked)
            //{
            //    throw new ForbiddenException("Tài khoản đã bị khóa.");
            //}

            // 4. Sinh bộ Token mới (Access Token & Refresh Token mới)
            return GenerateTokenResponse(user);
        }

    }
}
