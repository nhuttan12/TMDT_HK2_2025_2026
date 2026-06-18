using api.Models.Users;

namespace api.Dtos.Users.Responses
{
    public class UserInfoDTO
    {
        public Guid Id { get; set; }
        public required string Email { get; set; }
        public string? Phone { get; set; }
        public required string Role { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public DateTimeOffset? CreateAt { get; set; }
        public DateTimeOffset? UpdateAt { get; set; }

        public UserDetailDto? UserDetail { get; set; }
        public string? UserExternalLogin { get; set; }

    }
    public class UserDetailDto
    {
        public DateTimeOffset? LockTimeStart { get; set; }
        public DateTimeOffset? LockTimeEnd { get; set; }
        public string? AvatarUrl { get; set; }
        public string? AddressId { get; set; }
    }
}
