using api.Models.Users;
using AutoMapper;
using demo1.Controllers;
using demo1.Data;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Models;
using demo1.Services.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace demo1.Services.Auths
{
    public class AuthService(IPasswordHasher<User> _passwordHasher, MyAppDbContext _context, ITokenService _tokenService, IMapper _mapper) : IAuthService
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
            var user = await _context.Users
                .Include(u => u.Role)
                .SingleOrDefaultAsync(u => u.Email == req.Email);
            // kiểm tra user có tồn tại và có đúng mật khẩu hay ko 
            if (user == null || !verifyPassword(user, req.Password, user.PasswordHash))
                throw new UnauthorizedException("Email và password không chính xác");
            return GetTokenResponse(user);
        }
        public async Task<UserInfoDTO> Register(RegisterRequest registerRequest)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerRequest.Email))
            {
                throw new BadRequestException("tài khoản đã tồn tại");
            }
            var r = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User")
                ?? throw new InternalServerErrorException("Không tìm thấy role");

            User newUser = User.Create(registerRequest.Email, r, "Local",string.Empty);

            string passwordhash = hashPassword(newUser, registerRequest.Password);
            newUser.SetPassword(passwordhash);
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return _mapper.Map<UserInfoDTO>(newUser);
        }
        public async Task<TokenResponse> HandleGoogleLogin(GoogleInfoResponse googleInfo)
        {
            // Logic của bạn: Tìm user trong DB hoặc tạo mới
            var user = await _context.Users.Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == googleInfo.Email);

            if (user == null)
            {
                user = new User
                {
                    Email = googleInfo.Email,
                    PasswordHash = "",
                    RoleId = 2,
                    UserExternalLogin = UserExternalLogin.Create("Google",googleInfo.Sub),
                    UserDetail = new UserDetail
                    {
                        AvatarUrl = googleInfo.Avatar_url
                    },
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            return GetTokenResponse(user);
        }
        public TokenResponse GetTokenResponse(User user)
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

            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(Users => Users.Id == int.Parse(sub)) ?? throw new NotFoundException("user not found");

            if (user == null)
                throw new DirectoryNotFoundException("User not found");
            return GetTokenResponse(user);
        }


       
    }
}
