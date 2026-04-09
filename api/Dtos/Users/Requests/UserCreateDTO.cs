using System.ComponentModel.DataAnnotations;

namespace demo1.Dtos.Users.Requests
{
    public class UserCreateDto
    {
        [Required(ErrorMessage = "Username is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Username must be between 6 and 100 characters.")]
        public required string Username { get; set; }
        public required string Password { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public required string Email { get; set; }
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }
        public DateOnly? DateOfBirth { get; set; }

    }
}
