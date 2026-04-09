using demo1.Dtos.Users.Responses;
using demo1.Models;

namespace demo1.Services.Auths
{
    public interface IAuthService
    {
        public string hashPassword(User user, string password);
        public bool verifyPassword(User user, string password, string passwordHash);
        public Task<TokenResponse> loginAsync(string username, string password);

        public Task<User> RefreshTokenAsync(string refreshToken);
    }
}
