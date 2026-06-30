using api.Models.Users;

namespace api.Dtos.Users.Responses
{
    public class UserInfoDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public required string Email { get; set; }
        public string? Phone { get; set; }

        public ICollection<UserAddressResponseDto> Addresses { get; set; } = new HashSet<UserAddressResponseDto>();
        public DateOnly? DateOfBirth { get; set; }
        public DateTimeOffset? CreateAt { get; set; }
        public DateTimeOffset? UpdateAt { get; set; }
        public UserDetailDto? UserDetail { get; set; }
        public string? UserExternalLogin { get; set; }
    }
    public class UserInfoAdminDTO
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public required string Email { get; set; }
        public string? Phone { get; set; }

        public ICollection<UserAddressResponseDto> Addresses { get; set; } = new HashSet<UserAddressResponseDto>();
        public DateOnly? DateOfBirth { get; set; }
        public DateTimeOffset? CreateAt { get; set; }
        public DateTimeOffset? UpdateAt { get; set; }
        public UserDetailDto? UserDetail { get; set; }
        public string? UserExternalLogin { get; set; }
    }

    public record UserAddressResponseDto(Guid Id, string AddressUrl, bool IsUsed);
    public class UserDetailDto
    {
        public DateTimeOffset? LockTimeStart { get; set; }
        public DateTimeOffset? LockTimeEnd { get; set; }
        public string? AvatarUrl { get; set; }
        public string? AddressId { get; set; }
    }
}
