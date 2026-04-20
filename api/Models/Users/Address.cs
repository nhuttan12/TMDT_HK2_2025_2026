using api.Models;

namespace api.Models.Users
{
    public class Address
    {
        public int Id { get; set; }
        public int User_id { get; set; } 
        public string Address_url { get; set; } = string.Empty;
        public DateTime Create_at { get; set; } = DateTime.UtcNow;
        public bool Is_used { get; set; } = false;

        public virtual User User { get; set; } = null!;
    }
}
