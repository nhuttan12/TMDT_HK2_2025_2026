using api.Models;
using System.ComponentModel.DataAnnotations;

namespace api.Models.Users
{
    public class UserExternalLogin
    {
        public static UserExternalLogin Create(string Provider, string ProviderKey)
        {
            return new UserExternalLogin { Provider = Provider, ProviderKey = ProviderKey };
        }
        public int Id { get; set; }
        [Required]
        public required string Provider { get; set; } = string.Empty;
        public string ProviderKey { get; set; } = string.Empty;

        public virtual User User { get; set; } = null!;

    }
}
