using api.Controllers;
using api.Dtos.Users.Responses;
using api.Models;

namespace api.Services.Auths
{
    public interface IAuthService
    {
        public string hashPassword(User user, string password);
        public bool verifyPassword(User user, string password, string passwordHash);
        public Task<TokenResponse> loginAsync(LoginRequest req);

        public Task<TokenResponse> RefreshTokenAsync(string refreshToken);
        Task<TokenResponse> HandleGoogleLogin(GoogleInfoResponse googleInfo);
        public Task<UserInfoDTO> Register(RegisterRequest registerRequest);
    }
}
