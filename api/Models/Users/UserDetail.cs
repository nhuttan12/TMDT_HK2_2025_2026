using api.Models;

namespace api.Models.Users
{
    public class UserDetail
    {
        public UserDetail() { }

        public UserDetail(string? avatarUrl)
        {
            this.AvatarUrl = avatarUrl;
        }
        public int UserId { get; set; }
        public DateTime LockTimeStart { get; set; }
        public DateTime LockTimeEnd { get; set; }
        public string? AvatarUrl { get; set; }
        public string? AddressId { get; set; }

        public virtual User User { get; set; } = null!;

        public static UserDetail Create()
        {
            return new UserDetail { };
        }
    }
}
