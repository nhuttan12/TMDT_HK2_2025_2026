namespace api.Models.Jwts
{
    public abstract class JwtToken(string userId, DateTime expirationTime)
    {
        // jti: Định danh duy nhất cho mỗi Token (dùng để thu hồi token nếu cần)
        public string TokenId { get; init; } = Guid.NewGuid().ToString();

        // sub: Định danh người dùng (thường là UserId hoặc Username)
        public string UserId { get; init; } = userId;

        // iat: Thời điểm tạo
        public DateTime CreatedAt { get; init; } = DateTime.UtcNow;

        // exp: Thời điểm hết hạn
        public DateTime ExpirationTime { get; init; } = expirationTime;



    }
}
