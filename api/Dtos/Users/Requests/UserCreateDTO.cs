using System.ComponentModel.DataAnnotations;

namespace demo1.Dtos.Users.Requests
{
    public class UserCreateDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public required string Email { get; set; }
        public required string Password { get; set; }
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }
        public DateOnly? DateOfBirth { get; set; }

    }
}
