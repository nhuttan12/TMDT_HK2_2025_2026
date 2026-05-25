using api.Models.Users;
using api.Exceptions;
using api.Models.Roles;
using System.ComponentModel.DataAnnotations;
using Api.Models.Users;
using api.Models.Inventory;

namespace api.Models
{
    public class User
    {
       public static User Create(string email, Role role,string provider,String providerKey)
        {
            UserExternalLogin ux = UserExternalLogin.Create(provider, providerKey);
            UserDetail ud = UserDetail.Create();
            return new User
            {
                Email = email.ToLower().Trim(),
                Role = role,
                UserExternalLogin = ux,
            };
        }
        public int Id { get; set; }

        [Required]
        public required string Email { get; set; }
        public string PasswordHash { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string FullName { get; set; } = string.Empty;

        //public bool isShop { get; set; }
        //public bool isActive { get; set; }

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdateAt { get; set; }

        public DateTime? DeleteAt { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; } = default!;
        public virtual UserDetail? UserDetail { get; set; }
        public virtual UserExternalLogin?  UserExternalLogin{ get;  set; }
        public virtual ICollection<Address> Addresses { get; set; } = new HashSet<Address>();
        public ICollection<GoodsIssue> GoodsIssues { get; set; } = new HashSet<GoodsIssue>();

        public void SetPassword(string hash)
        {
            if (string.IsNullOrEmpty(hash)) throw new InternalServerErrorException("user: mật khẩu bị null");
            this.PasswordHash = hash;
        }

        internal void Update(string fullname, string phoneNumber, string? avatarUrl, List<string>? addresses, int userId)
        {
            if (!string.IsNullOrEmpty(fullname)) FullName = fullname;
            if (!string.IsNullOrEmpty(phoneNumber)) Phone = phoneNumber;
            if (!string.IsNullOrEmpty(avatarUrl)) UserDetail!.AvatarUrl = avatarUrl;
            if (addresses != null && addresses.Any()) Addresses = new HashSet<Address>(addresses.Select(a => Address.Create( userId,a)));
            UpdateAt = DateTime.UtcNow;
        }

        internal void UpdatePassword(string newHash)
        {
            if (string.IsNullOrWhiteSpace(newHash))
                throw new ArgumentException("Password hash cannot be empty.");

            PasswordHash = newHash;
            UpdateAt = DateTime.UtcNow;
        }
    }
}
