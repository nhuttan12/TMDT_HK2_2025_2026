using demo1.Models;
using System.ComponentModel.DataAnnotations;

namespace api.Models.Users
{
    public class UserExternalLogin
    {
        public int user_Id { get; set; }
        [Required]
        public required string provider { get; set; } = string.Empty;
        public string provider_key { get; set; } = string.Empty;

        public virtual User User { get; set; } = null!;

    }
}
