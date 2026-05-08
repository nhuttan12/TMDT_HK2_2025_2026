using api.Controllers;
using api.Dtos.Users.Responses;
using api.Models;
using api.Utilities;

namespace api.Services.Auths
{
    public interface IAuthService
    {
        public string HashPassword(User user, string password);
        public bool VerifyPassword(User user, string password, string passwordHash);
        public Task<Result<TokenResponse>> LoginAsync(LoginRequest req, CancellationToken ct = default);
         
        public Task<Result<TokenResponse>> RefreshTokenAsync(string refreshToken, CancellationToken ct = default);
        Task<Result<TokenResponse>> HandleGoogleLogin(GoogleInfoResponse googleInfo);
        public Task<Result<UserInfoDTO> > RegisterAsync(RegisterRequest registerRequest, CancellationToken ct = default);
    }
}
