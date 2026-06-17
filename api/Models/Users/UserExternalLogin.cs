using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace api.Models.Users
{
    public class UserExternalLogin
    {
        public static UserExternalLogin Create(Guid Id,string Provider, string ProviderKey)
        {
            if (Provider.Equals(User.LOCAL_KEY))
                return null;
            return new UserExternalLogin(Id,Provider,ProviderKey) {Provider = Provider};
        }
        public UserExternalLogin() {}
        public UserExternalLogin(Guid Id, string Provider, string ProviderKey) 
        {
            this.Id = Id;
            this.Provider = Provider;
            this.ProviderKey = ProviderKey;
        }

        public Guid Id { get; set; }
        [Required]
        public required string Provider { get; set; } = string.Empty;
        public string ProviderKey { get; set; } = string.Empty;
        [JsonIgnore]
        public virtual User User { get; set; } = null!;

    }
}
