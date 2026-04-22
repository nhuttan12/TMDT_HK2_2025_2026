using api.Models.Users;
using api.Repository;
using AutoMapper;
using api.Controllers;
using api.Dtos.Users.Responses;
using api.Exceptions;
using api.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using api.Repository.UserRepo;
using api.Repository.RoleRepo;

namespace api.Services.Auths
{
    public class AuthService(
        IPasswordHasher<User> _passwordHasher, 
        IAuthRepo _authRepo, 
        ITokenService _tokenService, 
        IMapper _mapper,
        IRoleRepo _roleRepository,
        IUnitOfWork _unitOfWork) : IAuthService
    {
        public string hashPassword(User user, string password)
        {
            return _passwordHasher.HashPassword(user, password);
        }
        public bool verifyPassword(User user, string password, string passwordHash)
        {
            var res = _passwordHasher.VerifyHashedPassword(user, passwordHash, password);
            return res == PasswordVerificationResult.Success;
        }
        public async Task<TokenResponse> loginAsync(LoginRequest req)
        {
            // kiểm tra đầu vào 
            if (req.Email == null || req.Password == null)
            {
                throw new BadRequestException("Email và password không phù hợp");
            }
            // lấy user 
            var user = await _authRepo.GetUserByEmailAsync(req.Email);
            // kiểm tra user có tồn tại và có đúng mật khẩu hay ko 
            if (user == null || !verifyPassword(user, req.Password, user.PasswordHash))
                throw new UnauthorizedException("Email và password không chính xác");
            return GenerateTokenResponse(user);
        }
        public async Task<UserInfoDTO> Register(RegisterRequest request)
        {
            // 1. Validation Logic
            if (await _authRepo.ExistsByEmailAsync(request.Email))
            {
                throw new BadRequestException("Tài khoản đã tồn tại");
            }

            // 2. Business Rule: Mỗi User mới phải có Role mặc định
            var role = await _roleRepository.GetByNameAsync("User")
                ?? throw new InternalServerErrorException("Cấu hình hệ thống lỗi: Không tìm thấy Role 'User'");

            // 3. Domain Logic: Khởi tạo Entity thông qua Factory Method (Rich Domain Model)
            var newUser = User.Create(request.Email, role, "Local", string.Empty);

            // 4. Security: Hashing (Sử dụng thư viện chuẩn thay vì hàm tự viết không rõ nguồn gốc)
            var passwordHash = _passwordHasher.HashPassword(newUser, request.Password);
            newUser.SetPassword(passwordHash);

            // 5. Persistence
            await _authRepo.AddAsync(newUser);
            await _unitOfWork.CommitAsync(); 

            return _mapper.Map<UserInfoDTO>(newUser);
        }
     
        public async Task<TokenResponse> HandleGoogleLogin(GoogleInfoResponse googleInfo)
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
                user = new User
                {
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

        public TokenResponse GenerateTokenResponse(User user)
        {
            var retk = _tokenService.GenerateToken(user, false);
            var actk = _tokenService.GenerateToken(user, true);
            if (retk == null || actk == null)
                throw new UnauthorizedException("Failed to generate tokens");
            // TODO: Save the refresh token to the database
            //_context.RefreshTokens.Add(new RefreshToken { token = retk });
            //await _context.SaveChangesAsync();
            var res = new TokenResponse
            {
                AccessToken = actk,
                RefreshToken = retk
            };
            return res;
        }
       

        public async Task<TokenResponse> RefreshTokenAsync(string refreshToken)
        {
            var principal = _tokenService.ValidateToken(refreshToken);

            var sub = principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? throw new BadRequestException("Invalid refresh token");

            var user = await _authRepo.GetByIdWithRoleAsync(int.Parse(sub));

            if (user == null)
            {
                throw new NotFoundException($"Không tìm thấy người dùng với ID: {sub}");
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
