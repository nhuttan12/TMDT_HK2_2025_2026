using demo1.Models.Roles;

namespace demo1.Models.Jwts
{
    public class AccessToken(string userId, DateTime expirationTime, string roleName) : JwtToken(userId, expirationTime)
    {
        // Thông tin quyền hạn
        public string RoleName { get; set; } = roleName;
    }
}
