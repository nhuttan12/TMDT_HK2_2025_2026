using demo1.Models;

namespace api.Models.Users
{
    public class UserDetail
    {
        public UserDetail() { }
        public UserDetail(string? avatarUrl)
        {
            this.avatar_url = avatarUrl;
        }
        public int user_id { get; set; }
        public DateTime lock_time_start { get; set; }
        public DateTime lock_time_end { get; set; }
        public string? avatar_url { get; set; }
        public string? address_id { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
