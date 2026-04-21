using System.ComponentModel.DataAnnotations;

namespace api.Models.Roles
{
    public class Permission
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }
        [Required]
        [MaxLength(100)]
        public required string Code { get; set; }

        public string Description { get; set; } =  string.Empty;

        public ICollection<RolePermission> RolePermissions { get; set; } = new HashSet<RolePermission>();
    }
}
