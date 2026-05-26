using System.ComponentModel.DataAnnotations;

namespace api.Models.Roles
{
    public class Role(string name)
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public required string Name { get; set; } = name;

        public string Description { get; set; } = string.Empty;

        //public virtual ICollection<RolePermission> RolePermissions { get; set; } = new HashSet<RolePermission>();
        public virtual ICollection<User> Users { get; set; } = new HashSet<User>();

        public static Role Create(string name) 
        {
            return new Role(name){ Name = name };  
        }
    }
}
