namespace demo1.Dtos.Users.Responses
{
    public class UserInfoDTO
    {
        public required string Username { get; set; }
        public required string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public required string Role { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
