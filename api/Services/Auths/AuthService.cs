using api.Models.Users;
using demo1.Controllers;
using demo1.Data;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace demo1.Services.Auths
{
    public class AuthService(IPasswordHasher<User> _passwordHasher, MyAppDbContext _context, ITokenService _tokenService) : IAuthService
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
        public async Task<TokenResponse> loginAsync(string username, string password)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                throw new DirectoryNotFoundException("User not found");
            if (!verifyPassword(user, password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid password");
            return GetTokenResponse(user);
        }
        public async Task<TokenResponse> HandleGoogleLogin(googleInfoResponse googleInfo)
        {
            // Logic của bạn: Tìm user trong DB hoặc tạo mới
            var user = await _context.Users.Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == googleInfo.email);

            if (user == null)
            {
                user = new User
                {
                    Username = googleInfo.email,
                    Email = googleInfo.email,
                    PasswordHash = "",
                    RoleId = 2,
                    UserDetail = new UserDetail
                    {
                        avatar_url = googleInfo.avatar_url
                    }
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
