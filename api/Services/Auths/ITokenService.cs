using demo1.Models;
using System.Security.Claims;

namespace demo1.Services.Auths
{
    public interface ITokenService
    {
        string GenerateToken(User user, bool isAccessToken);
        ClaimsPrincipal ValidateToken(string token);
        bool deleteToken(string token);
        //Task UpdateRefreshTokenAsync(object id, string newRefreshToken);
    }
}
