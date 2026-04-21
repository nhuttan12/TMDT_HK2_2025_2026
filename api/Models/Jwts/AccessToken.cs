using api.Models.Roles;

namespace api.Models.Jwts
{
    public class AccessToken(string userId, DateTime expirationTime, string roleName) : JwtToken(userId, expirationTime)
    {
        // Thông tin quyền hạn
        public string RoleName { get; set; } = roleName;
    }
}
