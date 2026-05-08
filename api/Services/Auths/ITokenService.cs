using api.Models;
using System.Security.Claims;

namespace api.Services.Auths
{
    public interface ITokenService
    {
        string GenerateToken(User user, bool isAccessToken);
        ClaimsPrincipal ValidateToken(string token, CancellationToken ct = default);
        bool DeleteToken(string token, CancellationToken ct = default);
        //Task UpdateRefreshTokenAsync(object id, string newRefreshToken);
    }
}
