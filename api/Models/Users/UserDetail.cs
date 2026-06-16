using System.Text.Json.Serialization;

namespace api.Models.Users
{
    public class UserDetail
    {
        public UserDetail() { }

        public UserDetail(string? avatarUrl)
        {
            this.AvatarUrl = avatarUrl;
        }
        public Guid UserId { get; set; }
        public DateTimeOffset? LockTimeStart { get; set; }
        public DateTimeOffset? LockTimeEnd { get; set; }
        public string? AvatarUrl { get; set; }
        public string? AddressId { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; } = null!;

        public static UserDetail Create()
        {
            string avatarDefaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            return new UserDetail(avatarDefaultUrl) { AvatarUrl = avatarDefaultUrl };
        }
    }
}
