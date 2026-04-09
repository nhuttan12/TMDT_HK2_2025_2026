namespace demo1.Models.Roles
{
    public class RolePermission
    {
        public int RoleId { get; set; }
        public virtual required Role Role { get; set; }

        public int PermissionId { get; set; }
        public virtual required Permission Permission { get; set; }
    }
}
