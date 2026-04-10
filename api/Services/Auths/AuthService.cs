using demo1.Data;
using demo1.Dtos.Users.Responses;
using demo1.Exceptions;
using demo1.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
            var retk = _tokenService.GenerateToken(user, false);
            // TODO: Save the refresh token to the database
            //_context.RefreshTokens.Add(new RefreshToken { token = retk });
            //await _context.SaveChangesAsync();
            var res = new TokenResponse
            {
                AccessToken = _tokenService.GenerateToken(user, true),
                RefreshToken = retk
            };

            return res;
        }

        public async Task<User> RefreshTokenAsync(string refreshToken)
        {
            var principal = _tokenService.ValidateToken(refreshToken);
            if (principal == null)
                throw new BadRequestException("Invalid refresh token");
            var userName = principal?.Identity?.Name;
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(Users => Users.Username == userName) ?? throw new NotFoundException("user not found");
            return user;
        }
    }
}
