using api.Models.Users;
using demo1.Models.Roles;
using System.ComponentModel.DataAnnotations;

namespace demo1.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public required string Email { get; set; }
        public string PasswordHash { get; set; } = string.Empty;

        public string? Phone { get; set; }

        public string FullName { get; set; } = string.Empty;

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdateAt { get; set; }

        public DateTime? DeleteAt { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; } = default!;
        public virtual UserDetail? UserDetail { get; set; }
        public virtual UserExternalLogin? UserExternalLogin { get; set; }
        public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();

    }
}
