using demo1.Models.Roles;
using System.ComponentModel.DataAnnotations;

namespace demo1.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public required string Username { get; set; } = string.Empty;
        [Required]
        public required string PasswordHash { get; set; } = string.Empty;

        [Required]
        public required string Email { get; set; }

        public string? Phone { get; set; }

        public string FullName { get; set; } = string.Empty;

        public DateTime CreateAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdateAt { get; set; }

        public DateTime? DeleteAt { get; set; }

        public int RoleId { get; set; }
        public virtual Role Role { get; set; } = default!;

    }
}
