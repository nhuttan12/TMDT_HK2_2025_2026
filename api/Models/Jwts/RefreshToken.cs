namespace demo1.Models.Jwts
{
    public class RefreshToken(string userId, DateTime expirationTime) : JwtToken( userId,  expirationTime)
    {

        public bool IsRevoked { get; set; } = false;
    }
}
